<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CatalogService
{
    public function ready(): bool
    {
        return config('pos.enabled') && Schema::hasTable('pos_settings');
    }

    public function publish(int $sellerId, string $entity, string $id, string $operation, array $payload): int
    {
        $settings = DB::table('pos_settings')->where('seller_id', $sellerId)->lockForUpdate()->first();
        if (!$settings) {
            return 0;
        }
        $sequence = (int) $settings->change_sequence + 1;
        DB::table('pos_settings')->where('seller_id', $sellerId)->update(['change_sequence' => $sequence]);
        DB::table('pos_change_log')->insert([
            'seller_id' => $sellerId, 'sequence' => $sequence, 'entity' => $entity,
            'entity_id' => $id, 'operation' => $operation, 'payload' => Payload::json($payload),
            'created_at' => now('UTC'),
        ]);
        return $sequence;
    }

    public function stock(int $stockId): void
    {
        if (!$this->ready()) { return; }
        DB::transaction(function () use ($stockId) {
            $stock = DB::table('product_stocks')->where('id', $stockId)->first();
            $product = $stock ? DB::table('products')->where('id', $stock->product_id)->first() : null;
            $sellerId = $product ? ($product->added_by === 'admin'
                ? (int) DB::table('users')->where('user_type', 'admin')->orderBy('id')->value('id')
                : (int) $product->user_id) : null;
            $settings = $sellerId ? DB::table('pos_settings')->where('seller_id', $sellerId)->lockForUpdate()->first() : null;
            $eligible = $settings && $product->pos && $product->published && $product->approved && !$product->digital && !$product->auction_product && !$product->wholesale_product;
            $oldEntries = DB::table('pos_catalog_entries')->where('stock_id', $stockId)->get();
            foreach ($oldEntries as $old) {
                if (!$eligible || (int) $old->seller_id !== $sellerId) {
                    $this->publish((int) $old->seller_id, 'catalog', (string) $stockId, 'delete', ['stock_id' => $stockId]);
                    DB::table('pos_catalog_entries')->where('id', $old->id)->delete();
                }
            }
            if (!$eligible) { return; }
            $payload = app(PricingService::class)->snapshot($stock, $product, $settings) + ['available_quantity' => (int) $stock->qty];
            $digest = Payload::hash($payload);
            $old = DB::table('pos_catalog_entries')->where('seller_id', $sellerId)->where('stock_id', $stockId)->first();
            if ($old && hash_equals($old->digest, $digest)) { return; }
            $sequence = $this->publish($sellerId, 'catalog', (string) $stockId, 'upsert', $payload);
            DB::table('pos_catalog_entries')->updateOrInsert(['seller_id' => $sellerId, 'stock_id' => $stockId], [
                'sequence' => $sequence, 'digest' => $digest, 'payload' => Payload::json($payload),
            ]);
        }, 5);
    }

    public function product(int $productId): void
    {
        DB::table('product_stocks')->where('product_id', $productId)->orderBy('id')->pluck('id')
            ->each(fn ($id) => $this->stock((int) $id));
    }

    public function snapshot(PosContext $context, ?string $snapshotId, int $after, int $limit): array
    {
        $context->require('pos:catalog:read');
        if (!$snapshotId) {
            $snapshotId = app(TransactionService::class)->run($context, function () use ($context) {
                $existing = DB::table('pos_catalog_snapshots')->where('seller_id', $context->sellerId)
                    ->where('device_id', $context->device?->id)->where('actor_id', $context->actor->id)
                    ->where('expires_at', '>', now('UTC'))->orderByDesc('created_at')->first();
                if ($existing) { return $existing->id; }
                $id = (string) Str::uuid();
                $head = (int) DB::table('pos_settings')->where('seller_id', $context->sellerId)->value('change_sequence');
                DB::table('pos_catalog_snapshots')->insert([
                    'id' => $id, 'seller_id' => $context->sellerId, 'device_id' => $context->device?->id,
                    'actor_id' => $context->actor->id, 'high_water_mark' => $head,
                    'expires_at' => now('UTC')->addHours(config('pos.snapshot_hours')), 'created_at' => now('UTC'),
                ]);
                DB::table('pos_catalog_snapshot_items')->insertUsing(['snapshot_id', 'stock_id', 'payload'],
                    DB::table('pos_catalog_entries')->where('seller_id', $context->sellerId)
                        ->selectRaw('? as snapshot_id, stock_id, payload', [$id]));
                return $id;
            });
        }
        $snapshot = DB::table('pos_catalog_snapshots')->where('id', $snapshotId)
            ->where('seller_id', $context->sellerId)->where('actor_id', $context->actor->id)
            ->where('device_id', $context->device?->id)->first();
        if (!$snapshot || now('UTC')->greaterThan($snapshot->expires_at)) {
            throw new PosException('SNAPSHOT_EXPIRED', 'Start a new catalog snapshot.', 410);
        }
        $items = DB::table('pos_catalog_snapshot_items')->where('snapshot_id', $snapshotId)
            ->where('stock_id', '>', $after)->orderBy('stock_id')->limit($limit + 1)->get();
        $more = $items->count() > $limit; $items = $items->take($limit);
        return ['snapshot_id' => $snapshotId, 'high_water_mark' => (int) $snapshot->high_water_mark,
            'next_after' => $items->last()?->stock_id ?? $after, 'has_more' => $more,
            'data' => $items->map(fn ($item) => json_decode($item->payload, true, 512, JSON_THROW_ON_ERROR))->all()];
    }

    public function changes(PosContext $context, int $cursor, int $limit, bool $catalogOnly = true): array
    {
        $context->require($catalogOnly ? 'pos:catalog:read' : 'pos:sync');
        $head = (int) DB::table('pos_settings')->where('seller_id', $context->sellerId)->value('change_sequence');
        if ($cursor > $head) {
            throw new PosException('INVALID_CURSOR', 'The cursor is ahead of this merchant feed.', 409);
        }
        $query = DB::table('pos_change_log')->where('seller_id', $context->sellerId)
            ->where('sequence', '>', $cursor)->where('sequence', '<=', $head);
        if ($catalogOnly) { $query->where('entity', 'catalog'); }
        // Cashiers with register restrictions receive no other register's financial data.
        if (!$catalogOnly) {
            $context->require('pos:catalog:read');
        }
        if (!$catalogOnly && !in_array('pos:sale:read', $context->abilities, true)) {
            $query->where('entity', 'catalog');
        } elseif (!$catalogOnly && ($context->device || $context->registerIds)) {
            $registerIds = $context->device ? [(int) $context->device->register_id] : $context->registerIds;
            $query->where(fn ($q) => $q->where('entity', 'catalog')->orWhereIn('payload->register_id', $registerIds));
        }
        $rows = $query->orderBy('sequence')->limit($limit + 1)->get();
        $more = $rows->count() > $limit; $rows = $rows->take($limit);
        return ['cursor' => $more ? (int) $rows->last()->sequence : $head, 'has_more' => $more,
            'data' => $rows->map(fn ($r) => ['sequence' => (int) $r->sequence, 'entity' => $r->entity,
                'id' => $r->entity_id, 'operation' => $r->operation,
                'payload' => json_decode($r->payload, true, 512, JSON_THROW_ON_ERROR)])->all()];
    }
}
