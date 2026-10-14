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
            if ($sellerId && ($owner = \App\Models\User::find($sellerId))) { app(StoreProvisioningService::class)->ensure($owner); }
            $settings = $sellerId ? DB::table('pos_settings')->where('seller_id', $sellerId)->lockForUpdate()->first() : null;
            $eligible = $settings && !$product->pos_excluded && $product->published && $product->approved && !$product->digital && !$product->auction_product;
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

    private function decoratePage(PosContext $context, array $items): array
    {
        $ids = array_values(array_unique(array_filter(array_column($items, 'image_id'))));
        $images = $ids && Schema::hasColumn('uploads', 'file_name')
            ? DB::table('uploads')->whereIn('id', $ids)->get()->keyBy('id') : collect();
        $signer = app(OfflinePolicySigner::class); $offline = app(OfflineCatalogService::class);
        return array_map(function (array $item) use ($context, $images, $signer, $offline) {
            $item['image_url'] = null;
            $image = $images[$item['image_id'] ?? null] ?? null;
            $url = $image ? (($image->external_link ?? null) ?: my_asset($image->file_name)) : null;
            if ($url && preg_match('~^https?://~i', $url)) { $item['image_url'] = $url; }
            return $offline->authorize($context, $item, $signer);
        }, $items);
    }

    public function product(int $productId): void
    {
        DB::table('product_stocks')->where('product_id', $productId)->orderBy('id')->pluck('id')
            ->each(fn ($id) => $this->stock((int) $id));
    }

    private function pruneUnavailable(PosContext $context): void
    {
        $ids = DB::table('pos_catalog_entries as e')->leftJoin('product_stocks as s','s.id','=','e.stock_id')
            ->leftJoin('products as p','p.id','=','s.product_id')->where('e.seller_id',$context->sellerId)
            ->where(function ($q) use ($context) {
                $q->whereNull('s.id')->orWhereNull('p.id')->orWhere('p.published',false)->orWhere('p.approved',false)
                    ->orWhere('p.pos_excluded',true)->orWhere('p.digital',true)->orWhere('p.auction_product',true);
                if ($context->ownerType === 'admin') { $q->orWhere('p.added_by','!=','admin'); }
                else { $q->orWhere('p.added_by','!=','seller')->orWhere('p.user_id','!=',$context->sellerId); }
            })->orderBy('e.stock_id')->pluck('e.stock_id');
        foreach ($ids as $id) { $this->stock((int)$id); }
    }

    private function rebuildStore(PosContext $context): void
    {
        $live = DB::table('product_stocks as s')->join('products as p','p.id','=','s.product_id');
        if ($context->ownerType === 'admin') { $live->where('p.added_by','admin'); }
        else { $live->where('p.added_by','seller')->where('p.user_id',$context->sellerId); }
        $ids = $live->pluck('s.id')->merge(DB::table('pos_catalog_entries')->where('seller_id',$context->sellerId)->pluck('stock_id'))->unique()->sort();
        foreach ($ids as $id) { $this->stock((int)$id); }
    }

    public function snapshot(PosContext $context, ?string $snapshotId, int $after, int $limit, bool $fresh = false): array
    {
        $context->require('pos:catalog:read');
        if (!$snapshotId) {
            $snapshotId = app(TransactionService::class)->run($context, function () use ($context, $fresh) {
                if ($fresh) { $this->rebuildStore($context); }
                $existing = DB::table('pos_catalog_snapshots')->where('seller_id', $context->sellerId)
                    ->where('device_id', $context->device?->id)->where('actor_id', $context->actor->id)
                    ->where('expires_at', '>', now('UTC'))->orderByDesc('created_at')->first();
                if ($existing && !$fresh) { return $existing->id; }
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
            'data' => $this->decoratePage($context, $items->map(fn ($item) => json_decode($item->payload, true, 512, JSON_THROW_ON_ERROR))->all())];
    }

    public function changes(PosContext $context, int $cursor, int $limit, bool $catalogOnly = true): array
    {
        $context->require($catalogOnly ? 'pos:catalog:read' : 'pos:sync');
        $this->pruneUnavailable($context);
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
        $data = $rows->map(fn ($r) => ['sequence' => (int) $r->sequence, 'entity' => $r->entity,
            'id' => $r->entity_id, 'operation' => $r->operation,
            'payload' => json_decode($r->payload, true, 512, JSON_THROW_ON_ERROR)])->all();
        $catalog = [];
        foreach ($data as $i => $row) {
            if ($row['entity'] === 'catalog' && $row['operation'] === 'upsert') { $catalog[$i] = $row['payload']; }
        }
        foreach ($this->decoratePage($context, $catalog) as $i => $payload) { $data[$i]['payload'] = $payload; }
        return ['cursor' => $more ? (int) $rows->last()->sequence : $head, 'has_more' => $more, 'data' => $data];
    }
}
