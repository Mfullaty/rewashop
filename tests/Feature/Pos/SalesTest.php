<?php

namespace Tests\Feature\Pos;

use App\Models\Order;
use App\Models\ProductStock;
use App\Pos\Services\SalePostingService;
use App\Pos\Services\RefundService;
use App\Pos\Services\ShiftService;
use App\Pos\Services\TenderService;
use App\Pos\Support\Money;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SalesTest extends PosTestCase
{
    public function test_wholesale_physical_items_use_explicit_normal_stock_price_in_pos(): void
    {
        DB::table('products')->where('id', 101)->update(['wholesale_product' => true]);
        $sale = app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $this->saleData());
        $this->assertSame(20000, $sale['total_minor']);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 18]);
    }

    public function test_report_recognises_return_date_and_tax_without_rewriting_the_original_receipt(): void
    {
        DB::table('product_taxes')->insert(['product_id' => 101, 'tax' => '7.50', 'tax_type' => 'percent']);
        $data = $this->saleData(); $data['tenders'] = [['method' => 'cash', 'currency' => 'NGN', 'amount_minor' => 21500]];
        $sale = app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data);
        $line = DB::table('pos_sale_lines')->first();
        app(RefundService::class)->create($this->context(), (string) Str::uuid(), $sale['sale_id'], [
            'client_refund_id' => (string) Str::uuid(), 'shift_id' => $data['shift_id'], 'method' => 'cash', 'reason' => 'Return item',
            'lines' => [['sale_line_id' => $line->id, 'quantity' => 1, 'restock' => false]]]);
        DB::table('pos_sales')->where('id', $sale['sale_id'])->update(['occurred_at' => now('UTC')->subDays(2)]);
        $this->actingAs(\App\Models\User::findOrFail(1))->getJson('/pos/backend/reports/summary?from='.urlencode(now('UTC')->subDay()->toIso8601String()))
            ->assertOk()->assertJsonPath('totals.gross_minor', 0)->assertJsonPath('totals.returns_minor', 10750)
            ->assertJsonPath('totals.net_minor', -10750)->assertJsonPath('totals.return_tax_minor', 750);
        $receipt = json_decode(DB::table('pos_receipts')->value('payload'), true);
        $this->assertSame(21500, $receipt['total_minor']); $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 18]);
    }

    public function test_walk_in_sale_posts_once_and_counts_units(): void
    {
        $data = $this->saleData(); $key = (string) Str::uuid(); $service = app(SalePostingService::class);
        $sale = $service->post($this->context(), $key, $data);
        for ($i = 0; $i < 10; $i++) { $this->assertSame($sale['order_id'], $service->post($this->context(), $key, $data)['order_id']); }
        $this->assertDatabaseCount('orders', 1); $this->assertDatabaseCount('pos_sales', 1);
        $this->assertDatabaseCount('pos_tenders', 1); $this->assertDatabaseCount('pos_stock_movements', 1);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 18]);
        $this->assertDatabaseHas('products', ['id' => 101, 'num_of_sale' => 2]);
        $order = DB::table('orders')->first(); $this->assertNull($order->user_id);
        $this->assertSame('in_store', $order->shipping_type); $this->assertSame('pos', $order->order_from);
        $this->assertNull(json_decode($order->shipping_address, true)['address']);
    }

    public function test_same_client_sale_with_new_transport_key_still_creates_one_order(): void
    {
        $data = $this->saleData(); $s = app(SalePostingService::class);
        $a = $s->post($this->context(), (string) Str::uuid(), $data);
        $b = $s->post($this->context(), (string) Str::uuid(), $data);
        $this->assertSame($a['order_id'], $b['order_id']); $this->assertDatabaseCount('orders', 1);
        $this->assertTrue($b['duplicate']);
    }

    public function test_replay_with_modified_payload_is_a_conflict(): void
    {
        $data = $this->saleData(); $key = (string) Str::uuid(); $s = app(SalePostingService::class);
        $s->post($this->context(), $key, $data); $data['lines'][0]['quantity'] = 3;
        $this->error('IDEMPOTENCY_CONFLICT', fn () => $s->post($this->context(), $key, $data));
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 18]);
    }

    public function test_late_line_failure_rolls_back_prior_deduction(): void
    {
        $this->stock(12, 102, 1, 'admin', 0, '100.00', 'EMPTY'); $data = $this->saleData();
        $data['lines'][] = ['stock_id' => 12, 'quantity' => 1];
        $this->error('INSUFFICIENT_STOCK', fn () => app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data));
        $this->assertDatabaseCount('orders', 0); $this->assertDatabaseCount('pos_stock_movements', 0);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 20]);
    }

    public function test_cross_seller_stock_and_admin_stock_are_rejected(): void
    {
        $data = $this->saleData(2); $data['lines'][0]['stock_id'] = 33;
        $this->error('STOCK_NOT_FOUND', fn () => app(SalePostingService::class)->post($this->context(2), (string) Str::uuid(), $data));
        $data['lines'][0]['stock_id'] = 11;
        $this->error('STOCK_NOT_FOUND', fn () => app(SalePostingService::class)->post($this->context(2), (string) Str::uuid(), $data));
        $data = $this->saleData(); $data['lines'][0]['stock_id'] = 22;
        $this->error('STOCK_NOT_FOUND', fn () => app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data));
        $this->assertDatabaseCount('orders', 0);
    }

    public function test_seller_posts_own_products_with_correct_legacy_owner(): void
    {
        app(SalePostingService::class)->post($this->context(2), (string) Str::uuid(), $this->saleData(2));
        $this->assertDatabaseHas('orders', ['seller_id' => 2, 'order_from' => 'pos']);
        $this->assertDatabaseHas('order_details', ['seller_id' => 2, 'product_id' => 202]);
    }

    public function test_external_tender_stays_unpaid_until_audited_manual_verification(): void
    {
        $data = $this->saleData(); $data['tenders'] = [['method' => 'bank_transfer', 'amount_minor' => 20000, 'currency' => 'NGN', 'reference' => 'untrusted-reference']];
        $sale = app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data);
        $this->assertSame('pending', $sale['payment_status']); $this->assertDatabaseHas('orders', ['payment_status' => 'unpaid']);
        $tender = DB::table('pos_tenders')->first();
        app(TenderService::class)->verify($this->context(), (string) Str::uuid(), $tender->id,
            ['reference' => 'BANK-SETTLED-123', 'evidence' => 'Matched the bank statement credit.']);
        $this->assertDatabaseHas('pos_tenders', ['status' => 'manual_verified', 'verified_by' => 1]);
        $this->assertDatabaseHas('orders', ['payment_status' => 'paid']);
    }

    public function test_split_cash_tender_and_shift_cash_reconcile(): void
    {
        $data = $this->saleData(); $data['tenders'] = [
            ['method' => 'cash', 'currency' => 'NGN', 'amount_minor' => 5000, 'received_minor' => 10000, 'change_minor' => 5000],
            ['method' => 'external_terminal', 'currency' => 'NGN', 'amount_minor' => 15000, 'reference' => 'terminal-123'],
        ];
        app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data);
        $this->assertSame(55000, app(ShiftService::class)->expected($data['shift_id']));
        $closed = app(ShiftService::class)->close($this->context(), (string) Str::uuid(), $data['shift_id'], ['counted_minor' => 54900, 'reason' => 'Cash count discrepancy']);
        $this->assertSame(-100, $closed['variance_minor']);
    }

    public function test_bad_cash_change_and_discount_cannot_commit(): void
    {
        $data = $this->saleData(); $data['tenders'][0]['change_minor'] = 1;
        $this->error('INVALID_CHANGE', fn () => app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data));
        $data['lines'][0]['discount_minor'] = 30000;
        $this->error('DISCOUNT_LIMIT', fn () => app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data));
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 20]);
    }

    public function test_price_and_tax_are_server_authoritative(): void
    {
        DB::table('product_taxes')->insert(['product_id' => 101, 'tax' => '7.50', 'tax_type' => 'percent']);
        $data = $this->saleData(); $data['lines'][0]['unit_price_minor'] = 1;
        $this->error('PRICE_MISMATCH', fn () => app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data));
        unset($data['lines'][0]['unit_price_minor']); $data['tenders'][0] = ['method' => 'cash', 'currency' => 'NGN', 'amount_minor' => 21500];
        $sale = app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data);
        $this->assertSame(21500, $sale['total_minor']); $this->assertDatabaseHas('pos_sale_lines', ['tax_minor' => 1500]);
    }

    public function test_inclusive_tax_preserves_the_displayed_total(): void
    {
        DB::table('pos_settings')->where('seller_id', 1)->update(['settings' => '{"tax_inclusive":true}']);
        DB::table('product_taxes')->insert(['product_id' => 101, 'tax' => '7.50', 'tax_type' => 'percent']);
        $sale = app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $this->saleData());
        $this->assertSame(20000, $sale['total_minor']); $this->assertDatabaseHas('pos_sale_lines', ['tax_minor' => 1395]);
    }

    public function test_partial_returns_never_exceed_quantity_or_double_restock(): void
    {
        $data = $this->saleData(); $sale = app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data);
        $line = DB::table('pos_sale_lines')->first(); $key = (string) Str::uuid();
        $input = ['client_refund_id' => (string) Str::uuid(), 'shift_id' => $data['shift_id'], 'method' => 'cash', 'reason' => 'Unwanted item',
            'lines' => [['sale_line_id' => $line->id, 'quantity' => 1, 'restock' => true]]];
        $service = app(RefundService::class); $r = $service->create($this->context(), $key, $sale['sale_id'], $input);
        $this->assertSame(10000, $r['amount_minor']); $service->create($this->context(), $key, $sale['sale_id'], $input);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 19]);
        $input['client_refund_id'] = (string) Str::uuid(); $input['lines'][0]['quantity'] = 2;
        $this->error('RETURN_QUANTITY_EXCEEDED', fn () => $service->create($this->context(), (string) Str::uuid(), $sale['sale_id'], $input));
        $this->assertDatabaseCount('pos_refunds', 1);
        $this->assertSame(60000, app(ShiftService::class)->expected($data['shift_id']));
    }

    public function test_unsettled_void_compensates_stock_but_paid_void_is_blocked(): void
    {
        $data = $this->saleData(); $data['tenders'] = [['method' => 'bank_transfer', 'currency' => 'NGN', 'amount_minor' => 20000, 'reference' => 'pending-bank']];
        $sale = app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data);
        app(RefundService::class)->void($this->context(), (string) Str::uuid(), $sale['sale_id'], ['reason' => 'Transfer did not arrive']);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 20]);
        $data = $this->saleData(1, $data['shift_id']); $sale = app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $data);
        $this->error('VOID_NOT_ALLOWED', fn () => app(RefundService::class)->void($this->context(), (string) Str::uuid(), $sale['sale_id'], ['reason' => 'Cancel sale']));
    }

    public function test_legacy_order_and_stock_history_are_protected_even_when_disabled(): void
    {
        $sale = app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $this->saleData());
        config(['pos.enabled' => false]); $order = Order::findOrFail($sale['order_id']);
        $this->error('POS_ORDER_MANAGED', fn () => $order->delete());
        $order->payment_status = 'unpaid'; $this->error('POS_ORDER_MANAGED', fn () => $order->save());
        $this->error('STOCK_HISTORY_PROTECTED', fn () => ProductStock::findOrFail(11)->delete());
    }

    public function test_migration_rollback_refuses_to_delete_financial_data(): void
    {
        app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $this->saleData());
        $this->expectException(\RuntimeException::class);
        (require database_path('migrations/2026_10_12_000000_create_shared_pos_backend.php'))->down();
    }

    public function test_minor_unit_conversion_and_rounding(): void
    {
        $this->assertSame(1001, Money::minor('10.005')); $this->assertSame(-1001, Money::minor('-10.005'));
        $this->assertSame('10.01', Money::decimal(1001)); $this->assertSame(75, Money::percent(1000, 750));
        $this->error('AMOUNT_LIMIT', fn () => Money::multiply(1000000000000, 2));
    }
}
