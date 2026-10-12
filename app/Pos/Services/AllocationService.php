<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Support\Payload;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AllocationService
{
    public function enabled(PosContext $context): void
    {
        $context->require('pos:inventory:write');
        if (!config('pos.offline_enabled') || !$context->device || !$context->device->offline_allowed) {
            throw new PosException('OFFLINE_DISABLED', 'Offline inventory is not enabled for this device.', 403);
        }
    }

    public function request(PosContext $context, string $key, array $data): array
    {
        $this->enabled($context);
        return app(TransactionService::class)->once($context, $key, 'allocation.request', $data, function () use ($context, $data) {
            // TransactionService holds the merchant/device mutex. Check before
            // reserving any units so concurrent preparations cannot split one
            // stock item across allocations that the v1 sale line cannot combine.
            if (DB::table('pos_stock_allocations')->where('seller_id', $context->sellerId)
                ->where('device_id', $context->device->id)->where('status', 'open')
                ->whereIn('stock_id', array_column($data['lines'], 'stock_id'))->exists()) {
                throw new PosException('ALLOCATION_ALREADY_OPEN', 'Stock is already prepared for this product. Reconcile its open allocation before preparing another.', 409);
            }
            $stocks = app(InventoryService::class)->lockStocks($context, array_column($data['lines'], 'stock_id'));
            $device = DB::table('pos_devices')->where('id', $context->device->id)->first();
            $remaining = (int) DB::table('pos_stock_allocations')->where('device_id', $device->id)->where('status', 'open')
                ->selectRaw('COALESCE(SUM(reserved - consumed - released), 0) as remaining')->value('remaining');
            if ($remaining + array_sum(array_column($data['lines'], 'quantity')) > $device->max_reserved_units) {
                throw new PosException('ALLOCATION_LIMIT', 'The device reservation limit would be exceeded.', 409);
            }
            $settings = DB::table('pos_settings')->where('seller_id', $context->sellerId)->first();
            $result = [];
            foreach ($data['lines'] as $line) {
                $stock = $stocks[$line['stock_id']];
                $product = DB::table('products')->where('id', $stock->product_id)->first();
                $snapshot = app(PricingService::class)->snapshot($stock, $product, $settings);
                $snapshot['max_discount_bps'] = $context->maxDiscountBps;
                $id = (string) Str::uuid();
                $expires = now('UTC')->addHours(config('pos.offline_policy_hours'));
                // A scheduled promotion boundary shortens the offline policy window.
                $boundary = $snapshot['next_price_boundary'];
                if ($boundary !== null && $boundary < $expires->timestamp) {
                    if ($boundary < now('UTC')->timestamp) {
                        throw new PosException('PRICE_WINDOW_CHANGED', 'The promotion boundary changed during allocation. Retry for a fresh price policy.', 409);
                    }
                    $expires = CarbonImmutable::createFromTimestampUTC($boundary);
                }
                $signed = app(OfflinePolicySigner::class)->sign([
                    'schema_version' => 1, 'allocation_id' => $id, 'seller_id' => $context->sellerId,
                    'device_id' => $device->id, 'register_id' => (int) $device->register_id,
                    'stock_id' => (int) $stock->id, 'reserved' => (int) $line['quantity'],
                    'price_snapshot' => $snapshot, 'expires_at' => $expires->toIso8601String(),
                    'max_offline_sale_minor' => (int) $device->max_offline_sale_minor,
                    'max_offline_budget_minor' => (int) $device->max_offline_budget_minor,
                ]);
                DB::table('pos_stock_allocations')->insert([
                    'id' => $id, 'seller_id' => $context->sellerId, 'device_id' => $device->id,
                    'stock_id' => $stock->id, 'reserved' => $line['quantity'], 'consumed' => 0, 'released' => 0,
                    'status' => 'open', 'price_snapshot' => Payload::json($snapshot), 'signed_policy' => Payload::json($signed), 'policy_expires_at' => $expires,
                    'created_at' => now('UTC'), 'updated_at' => now('UTC'),
                ]);
                app(InventoryService::class)->online($context, (int) $stock->id, -$line['quantity'], 'allocation', $id);
                app(InventoryService::class)->movement($context, (int) $stock->id, $line['quantity'], 0, $line['quantity'], 'allocation', 'reserved', $id);
                $result[] = ['allocation_id' => $id, 'stock_id' => (int) $stock->id, 'reserved' => $line['quantity'],
                    'policy_expires_at' => $expires->toIso8601String(), 'price_snapshot' => $snapshot, 'signed_policy' => $signed];
            }
            app(AuditService::class)->record($context, 'allocation.request', $device->id, ['allocations' => $result]);
            return ['allocations' => $result];
        });
    }

    public function consume(PosContext $context, array $line, string $saleId, string $occurredAt): array
    {
        $allocation = DB::table('pos_stock_allocations')->where('id', $line['allocation_id'])
            ->where('seller_id', $context->sellerId)->where('device_id', $context->device?->id)->lockForUpdate()->first();
        if (!$allocation || $allocation->status !== 'open' || (int) $allocation->stock_id !== (int) $line['stock_id']) {
            throw new PosException('ALLOCATION_UNAVAILABLE', 'The stock allocation is unavailable.', 409);
        }
        $signed = json_decode($allocation->signed_policy, true, 512, JSON_THROW_ON_ERROR);
        if (!isset($line['policy_signature']) || !hash_equals($signed['signature'], $line['policy_signature']) ||
            !app(OfflinePolicySigner::class)->verify($signed)) {
            throw new PosException('INVALID_POLICY_SIGNATURE', 'The offline price policy signature does not match the issued allocation.', 409);
        }
        $occurred = CarbonImmutable::parse($occurredAt)->utc();
        if ($occurred->lessThan(CarbonImmutable::parse($allocation->created_at, 'UTC')) ||
            $occurred->greaterThan(CarbonImmutable::parse($allocation->policy_expires_at, 'UTC')) ||
            $occurred->greaterThan(now('UTC')->addMinutes(5))) {
            throw new PosException('OFFLINE_POLICY_EXPIRED', 'The offline sale is outside its authorized price policy window.', 409);
        }
        $remaining = (int) $allocation->reserved - (int) $allocation->consumed - (int) $allocation->released;
        if ($line['quantity'] > $remaining) {
            throw new PosException('INSUFFICIENT_ALLOCATION', 'The device reservation cannot cover this sale.', 409);
        }
        DB::table('pos_stock_allocations')->where('id', $allocation->id)->update([
            'consumed' => (int) $allocation->consumed + $line['quantity'], 'updated_at' => now('UTC'),
        ]);
        app(InventoryService::class)->movement($context, (int) $line['stock_id'], -$line['quantity'], $remaining,
            $remaining - $line['quantity'], 'sale', 'reserved', $saleId.':'.$allocation->id);
        return json_decode($allocation->price_snapshot, true, 512, JSON_THROW_ON_ERROR);
    }

    public function reconcile(PosContext $context, string $key, array $data): array
    {
        $this->enabled($context);
        return app(TransactionService::class)->once($context, $key, 'allocation.reconcile', $data, function () use ($context, $data) {
            $device = DB::table('pos_devices')->where('id', $context->device->id)->first();
            if ((int) $data['checkpoint_sequence'] !== (int) $device->last_sequence || $data['pending_events'] !== 0) {
                throw new PosException('RECONCILIATION_INCOMPLETE', 'All local events must be acknowledged through the checkpoint.', 409);
            }
            $allocations = DB::table('pos_stock_allocations')->where('seller_id', $context->sellerId)
                ->where('device_id', $device->id)->whereIn('id', array_column($data['allocations'], 'allocation_id'))
                ->orderBy('stock_id')->lockForUpdate()->get()->keyBy('id');
            if ($allocations->count() !== count($data['allocations'])) {
                throw new PosException('ALLOCATION_UNAVAILABLE', 'A reconciliation allocation is unavailable.', 404);
            }
            $result = [];
            foreach ($data['allocations'] as $input) {
                $a = $allocations[$input['allocation_id']];
                if ($a->status !== 'open' || (int) $input['consumed_quantity'] !== (int) $a->consumed) {
                    throw new PosException('RECONCILIATION_CONFLICT', 'Local consumed quantities do not match accepted server sales.', 409);
                }
                $unused = (int) $a->reserved - (int) $a->consumed - (int) $a->released;
                if ($unused) {
                    app(InventoryService::class)->online($context, (int) $a->stock_id, $unused, 'release', $a->id);
                    app(InventoryService::class)->movement($context, (int) $a->stock_id, -$unused, $unused, 0, 'release', 'reserved', $a->id);
                }
                DB::table('pos_stock_allocations')->where('id', $a->id)->update([
                    'released' => (int) $a->released + $unused, 'status' => 'closed',
                    'reconciled_sequence' => $device->last_sequence, 'updated_at' => now('UTC'),
                ]);
                $result[] = ['allocation_id' => $a->id, 'released' => $unused];
            }
            // Reset the exposure budget only after every allocation has been reconciled.
            if (!DB::table('pos_stock_allocations')->where('device_id', $device->id)->where('status', 'open')->exists()) {
                DB::table('pos_devices')->where('id', $device->id)->update(['offline_spent_minor' => 0]);
            }
            app(AuditService::class)->record($context, 'allocation.reconcile', $device->id, $data);
            return ['allocations' => $result, 'checkpoint_sequence' => (int) $device->last_sequence];
        });
    }
}
