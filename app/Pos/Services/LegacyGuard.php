<?php

namespace App\Pos\Services;

use App\Pos\Exceptions\PosException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class LegacyGuard
{
    public function ready(): bool { return Schema::hasTable('pos_sales'); }

    public function managedOrder(int $id): bool
    {
        return $this->ready() && DB::table('pos_sales')->where('order_id', $id)->exists();
    }

    public function order($order, bool $deleting = false): void
    {
        if (!$order->exists || !$this->managedOrder((int) $order->id)) { return; }
        $allowed = ['viewed', 'delivery_viewed', 'payment_status_viewed', 'updated_at'];
        if ($deleting || array_diff(array_keys($order->getDirty()), $allowed)) {
            throw new PosException('POS_ORDER_MANAGED', 'Use the POS return, void or tender service to change this retail order.', 409);
        }
    }

    public function detail($detail, bool $deleting = false): void
    {
        if ($detail->exists && $this->managedOrder((int) $detail->order_id) && ($deleting || $detail->isDirty())) {
            throw new PosException('POS_ORDER_MANAGED', 'POS order details are protected by the retail ledger.', 409);
        }
    }

    public function referencedStock(int $id): bool
    {
        return $this->ready() && (DB::table('pos_sale_lines')->where('stock_id', $id)->exists()
            || DB::table('pos_stock_allocations')->where('stock_id', $id)->exists());
    }

    public function assertStockDeletable(int $id): void
    {
        if ($this->referencedStock($id)) {
            throw new PosException('STOCK_HISTORY_PROTECTED', 'A POS stock variant with sale or allocation history cannot be deleted. Delist it instead.', 409);
        }
    }

    public function assertProductDeletable(int $id): void
    {
        if (!$this->ready()) { return; }
        if (DB::table('pos_sale_lines')->where('product_id', $id)->exists() ||
            DB::table('pos_stock_allocations')->whereIn('stock_id', DB::table('product_stocks')->where('product_id', $id)->select('id'))->exists()) {
            throw new PosException('PRODUCT_HISTORY_PROTECTED', 'A product with POS history must be delisted rather than deleted.', 409);
        }
    }

    public function deleteProduct(int $id, callable $work)
    {
        if (!$this->ready()) { return $work(); }
        return DB::transaction(function () use ($id, $work) {
            $product = DB::table('products')->where('id', $id)->first();
            if (!$product) { return $work(); }
            $sellerId = $product->added_by === 'admin'
                ? (int) DB::table('users')->where('user_type', 'admin')->orderBy('id')->value('id') : (int) $product->user_id;
            DB::table('pos_settings')->where('seller_id', $sellerId)->lockForUpdate()->first();
            DB::table('products')->where('id', $id)->lockForUpdate()->first();
            $stocks = DB::table('product_stocks')->where('product_id', $id)->orderBy('id')->lockForUpdate()->pluck('id');
            $this->assertProductDeletable($id);
            $result = $work();
            foreach ($stocks as $stockId) { app(CatalogService::class)->stock((int) $stockId); }
            return $result;
        }, 5);
    }

    public function product($product): void
    {
        if (!$product->exists || !$this->ready()) { return; }
        if ($product->isDirty(['added_by', 'user_id', 'digital', 'auction_product'])) {
            $this->assertProductDeletable((int) $product->id);
        }
    }

    public function saveStock($stock, array $options, callable $save)
    {
        if (!$stock->exists || !$this->ready()) { return $save($options); }
        $attributes = $stock->getAttributes(); $original = $stock->getRawOriginal();
        return DB::transaction(function () use ($stock, $options, $save, $attributes, $original) {
            $stock->setRawAttributes($original, true); $stock->setRawAttributes($attributes, false);
            $product = DB::table('products')->where('id', $stock->product_id)->first();
            $sellerId = $product->added_by === 'admin'
                ? (int) DB::table('users')->where('user_type', 'admin')->orderBy('id')->value('id') : (int) $product->user_id;
            DB::table('pos_settings')->where('seller_id', $sellerId)->lockForUpdate()->first();
            $current = DB::table('product_stocks')->where('id', $stock->id)->lockForUpdate()->first();
            if (!$current) { throw new PosException('STOCK_NOT_FOUND', 'The stock variant no longer exists.', 409); }
            if ($stock->isDirty(['product_id', 'variant'])) { $this->assertStockDeletable((int) $stock->id); }
            if ($stock->isDirty('qty')) {
                if ((int) $stock->getOriginal('qty') !== (int) $current->qty) {
                    throw new PosException('STOCK_CHANGED', 'Inventory changed during this edit. Reload and retry.', 409);
                }
                if ((int) $stock->qty < 0) { throw new PosException('INSUFFICIENT_STOCK', 'Inventory cannot become negative.', 409); }
                if (DB::table('pos_stock_allocations')->where('stock_id', $stock->id)->where('status', 'open')->exists()) {
                    throw new PosException('RESERVED_STOCK_EDIT', 'Use the POS online-bucket adjustment service while a device allocation is open.', 409);
                }
            }
            $quantityChanged = $stock->isDirty('qty');
            $before = (int) $current->qty;
            $saved = $save($options);
            if ($quantityChanged && $saved) {
                $product = DB::table('products')->where('id', $stock->product_id)->first();
                $sellerId = $product->added_by === 'admin'
                    ? (int) DB::table('users')->where('user_type', 'admin')->orderBy('id')->value('id') : (int) $product->user_id;
                if (DB::table('pos_settings')->where('seller_id', $sellerId)->exists()) {
                    DB::table('pos_stock_movements')->insert([
                        'event_key' => hash('sha256', (string) \Illuminate\Support\Str::uuid()),
                        'seller_id' => $sellerId, 'stock_id' => $stock->id, 'quantity' => (int) $stock->qty - $before,
                        'balance_before' => $before, 'balance_after' => (int) $stock->qty,
                        'type' => 'legacy_edit', 'bucket' => 'online', 'reference' => 'legacy-stock-save',
                        'actor_id' => auth()->id(), 'created_at' => now('UTC'),
                    ]);
                }
            }
            return $saved;
        }, 5);
    }
}
