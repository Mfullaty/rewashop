<?php
namespace App\Pos\Services;
use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;

class OfflineCatalogService
{
    public function authorize(PosContext $context, array $item): array
    {
        if (!$context->device || !config('pos.offline_enabled') || !$context->device->offline_allowed ||
            !app(OfflinePolicySigner::class)->publicKey()) { return $item; }
        $price = $item; unset($price['available_quantity'], $price['image_url'], $price['offline_policy']);
        $price['max_discount_bps'] = $context->maxDiscountBps;
        $item['offline_policy'] = app(OfflinePolicySigner::class)->sign([
            'schema_version' => 1, 'mode' => 'catalog', 'seller_id' => $context->sellerId,
            'device_id' => $context->device->id, 'register_id' => (int) $context->device->register_id,
            'stock_id' => (int) $item['stock_id'], 'price_snapshot' => $price,
            'issued_at' => now('UTC')->toIso8601String(),
            'expires_at' => now('UTC')->addDays(config('pos.token_days'))->toIso8601String(),
        ]);
        return $item;
    }

    public function snapshot(PosContext $context, array $line, string $occurredAt): array
    {
        $signed = $line['catalog_policy'] ?? []; $policy = $signed['policy'] ?? [];
        $signer = app(OfflinePolicySigner::class); $pin = $signer->publicKey();
        if (!$pin || ($signed['key_id'] ?? '') !== $pin['key_id'] || ($signed['public_key'] ?? '') !== $pin['public_key'] || !$signer->verify($signed)) {
            throw new PosException('INVALID_POLICY_SIGNATURE', 'This product price could not be verified. Sync the product list again.', 409);
        }
        if (($policy['schema_version'] ?? null) !== 1 || ($policy['mode'] ?? '') !== 'catalog' ||
            ($policy['seller_id'] ?? null) !== $context->sellerId || ($policy['device_id'] ?? null) !== $context->device?->id ||
            ($policy['register_id'] ?? null) !== (int) $context->device?->register_id ||
            ($policy['stock_id'] ?? null) !== (int) $line['stock_id'] || ($policy['price_snapshot']['currency'] ?? '') !== $context->currency) {
            throw new PosException('POLICY_SCOPE_MISMATCH', 'This downloaded product belongs to another shop or computer.', 403);
        }
        $at = CarbonImmutable::parse($occurredAt)->utc();
        if ($at->lessThan(CarbonImmutable::parse($policy['issued_at'])) || $at->greaterThan(CarbonImmutable::parse($policy['expires_at']))) {
            throw new PosException('OFFLINE_POLICY_EXPIRED', 'The sale time does not match the downloaded product list.', 409);
        }
        return $policy['price_snapshot'];
    }

    public function deduct(PosContext $context, object $stock, int $quantity, string $sale): int
    {
        $before = (int) $stock->qty; $deducted = min($before, $quantity); $after = $before - $deducted;
        DB::table('product_stocks')->where('id', $stock->id)->update(['qty' => $after, 'updated_at' => now('UTC')]);
        app(InventoryService::class)->movement($context, (int) $stock->id, -$deducted, $before, $after, 'sale', 'online', $sale);
        app(CatalogService::class)->stock((int) $stock->id);
        // A disconnected till cannot know what another till sold. Preserve the
        // paid transaction and its shortage instead of deleting it or silently
        // making stock negative. The owner's report carries the count difference.
        return $quantity - $deducted;
    }
}
