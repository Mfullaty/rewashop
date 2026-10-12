<?php

namespace App\Pos\Services;

use App\Models\Cart;
use App\Models\User;
use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use Illuminate\Support\Facades\DB;

class LegacyCheckoutService
{
    public function checkout(int $userId, callable $work)
    {
        if (!app(LegacyGuard::class)->ready()) { return $work(); }
        return DB::transaction(function () use ($userId, $work) {
            $cart = Cart::where('user_id', $userId)->active()->orderBy('product_id')->lockForUpdate()->get();
            $products = DB::table('products')->whereIn('id', $cart->pluck('product_id'))->orderBy('id')->get()->keyBy('id');
            $sellerIds = $products->map(fn ($p) => $p->added_by === 'admin'
                ? (int) DB::table('users')->where('user_type', 'admin')->orderBy('id')->value('id') : (int) $p->user_id)->unique()->sort()->values();
            // Take merchant mutexes first, matching the shared sale/allocation lock order.
            foreach ($sellerIds as $sellerId) {
                DB::table('pos_settings')->where('seller_id', $sellerId)->lockForUpdate()->first();
            }
            $stockIds = []; $quantities = [];
            foreach ($cart as $item) {
                $product = $products[$item->product_id] ?? null;
                if (!$product) { throw new PosException('STOCK_NOT_FOUND', 'A cart product is unavailable.', 409); }
                if ($product->digital) { continue; }
                $id = DB::table('product_stocks')->where('product_id', $product->id)->where('variant', $item->variation ?? '')->value('id');
                if (!$id || (int) $item->quantity < 1) { throw new PosException('INVALID_CART_STOCK', 'The cart contains an invalid variant or quantity.', 409); }
                $stockIds[] = $id; $quantities[$id] = ($quantities[$id] ?? 0) + (int) $item->quantity;
            }
            $stocks = DB::table('product_stocks')->whereIn('id', $stockIds)->orderBy('id')->lockForUpdate()->get();
            foreach ($stocks as $stock) {
                if ($quantities[$stock->id] > $stock->qty) { throw new PosException('INSUFFICIENT_STOCK', 'A cart variant has insufficient unreserved stock.', 409); }
            }
            return $work();
        }, 5);
    }

    public function deduct($stock, int $quantity, int $orderId, User $actor): void
    {
        if (!app(LegacyGuard::class)->ready()) {
            $stock->qty -= $quantity; $stock->save(); return;
        }
        $product = DB::table('products')->where('id', $stock->product_id)->first();
        $sellerId = $product->added_by === 'admin'
            ? (int) DB::table('users')->where('user_type', 'admin')->orderBy('id')->value('id') : (int) $product->user_id;
        $settings = DB::table('pos_settings')->where('seller_id', $sellerId)->first();
        if (!$settings) {
            // Stores that have not opted into POS still share the checkout transaction.
            $stock->qty -= $quantity; $stock->save(); return;
        }
        $context = new PosContext($actor, $sellerId, $settings->owner_type, $settings->currency, [], [], 0);
        app(InventoryService::class)->online($context, (int) $stock->id, -$quantity, 'online_order', $orderId.':'.(string) \Illuminate\Support\Str::uuid());
    }

    public function restock($detail, bool $cancellation = false): void
    {
        if ($detail->delivery_status === 'delivered' || ($detail->delivery_status === 'cancelled' && !$cancellation)) { return; }
        DB::transaction(function () use ($detail) {
            $product = DB::table('products')->where('id', $detail->product_id)->first();
            if (!$product || $product->digital) { return; }
            $sellerId = $product->added_by === 'admin'
                ? (int) DB::table('users')->where('user_type', 'admin')->orderBy('id')->value('id') : (int) $product->user_id;
            $settings = DB::table('pos_settings')->where('seller_id', $sellerId)->lockForUpdate()->first();
            if (DB::table('pos_legacy_restock_events')->where('order_detail_id', $detail->id)->exists()) { return; }
            $stock = DB::table('product_stocks')->where('product_id', $detail->product_id)->where('variant', $detail->variation ?? '')->lockForUpdate()->first();
            if (!$stock) { return; }
            if ($settings) {
                $actor = auth()->user() ?? User::findOrFail($sellerId);
                $context = new PosContext($actor, $sellerId, $settings->owner_type, $settings->currency, [], [], 0);
                app(InventoryService::class)->online($context, (int) $stock->id, (int) $detail->quantity, 'restock', 'detail:'.$detail->id);
            } else {
                DB::table('product_stocks')->where('id', $stock->id)->increment('qty', (int) $detail->quantity);
            }
            DB::table('products')->where('id', $product->id)->update([
                'num_of_sale' => DB::raw('CASE WHEN num_of_sale >= '.(int) $detail->quantity.' THEN num_of_sale - '.(int) $detail->quantity.' ELSE 0 END'),
            ]);
            DB::table('pos_legacy_restock_events')->insert(['order_detail_id' => $detail->id,
                'seller_id' => $sellerId, 'stock_id' => $stock->id, 'quantity' => $detail->quantity, 'created_at' => now('UTC')]);
        }, 5);
    }
}
