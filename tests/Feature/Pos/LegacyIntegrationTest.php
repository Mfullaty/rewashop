<?php

namespace Tests\Feature\Pos;

use App\Models\Product;
use App\Models\ProductStock;
use App\Models\User;
use App\Pos\Services\AllocationService;
use App\Pos\Services\LegacyCheckoutService;
use App\Pos\Services\SalePostingService;
use App\Services\ProductStockService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LegacyIntegrationTest extends PosTestCase
{
    public function test_product_edit_preserves_sold_variant_identity(): void
    {
        app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $this->saleData());
        $product = Product::findOrFail(101);
        app(ProductStockService::class)->store(['product_id' => 101, 'current_stock' => 18, 'unit_price' => '125.00', 'sku' => 'UPDATED-SKU'], $product);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'product_id' => 101, 'price' => '125.00', 'qty' => 18]);
        $this->assertDatabaseCount('product_stocks', 3);
    }

    public function test_legacy_website_checkout_can_consume_only_unreserved_stock(): void
    {
        $d = $this->device(); app(AllocationService::class)->request($this->context(1, $d), (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 19]]]);
        DB::table('carts')->insert(['user_id' => 1, 'product_id' => 101, 'variation' => '', 'quantity' => 2]);
        $this->error('INSUFFICIENT_STOCK', fn () => app(LegacyCheckoutService::class)->checkout(1, fn () => null));
        DB::table('carts')->update(['quantity' => 1]);
        app(LegacyCheckoutService::class)->checkout(1, fn () => app(LegacyCheckoutService::class)->deduct(ProductStock::findOrFail(11), 1, 999, User::findOrFail(1)));
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 0]);
        $this->assertDatabaseHas('pos_stock_movements', ['type' => 'online_order', 'quantity' => -1]);
    }

    public function test_legacy_checkout_late_failure_rolls_back_its_stock_ledger(): void
    {
        DB::table('carts')->insert(['user_id' => 1, 'product_id' => 101, 'variation' => '', 'quantity' => 1]);
        try {
            app(LegacyCheckoutService::class)->checkout(1, function () {
                app(LegacyCheckoutService::class)->deduct(ProductStock::findOrFail(11), 1, 999, User::findOrFail(1));
                throw new \RuntimeException('Simulated later order write failure');
            });
        } catch (\RuntimeException $e) { $this->assertSame('Simulated later order write failure', $e->getMessage()); }
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 20]); $this->assertDatabaseCount('pos_stock_movements', 0);
    }

    public function test_cancelled_legacy_order_restocks_once_with_open_device_reserves(): void
    {
        $d = $this->device(); app(AllocationService::class)->request($this->context(1, $d), (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]]);
        $detail = (object) ['id' => 99, 'product_id' => 101, 'variation' => '', 'quantity' => 2, 'delivery_status' => 'cancelled'];
        app(LegacyCheckoutService::class)->restock($detail, true); app(LegacyCheckoutService::class)->restock($detail, true);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 12]);
        $this->assertDatabaseCount('pos_legacy_restock_events', 1);
    }

    public function test_old_browser_pos_checkout_is_blocked_after_cutover(): void
    {
        $this->actingAs(User::findOrFail(1))->postJson('/admin/pos-order', ['payment_type' => 'cash'])
            ->assertStatus(409)->assertJsonPath('error.code', 'LEGACY_POS_CHECKOUT_DISABLED');
    }
}
