<?php

namespace Tests\Feature\Pos;

use App\Pos\Services\AllocationService;
use App\Pos\Services\SalePostingService;
use App\Pos\Services\ShiftService;
use App\Pos\Services\SyncService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OfflineSyncTest extends PosTestCase
{
    public function test_allocation_at_the_exact_promotion_end_cannot_extend_discounted_prices(): void
    {
        $this->travelTo(\Carbon\Carbon::parse('2026-10-12T12:00:00Z'));
        DB::table('products')->where('id', 101)->update(['discount' => '50.00', 'discount_type' => 'amount',
            'discount_start_date' => now('UTC')->subHour()->timestamp, 'discount_end_date' => now('UTC')->timestamp]);
        $d = $this->device();
        $a = app(AllocationService::class)->request($this->context(1, $d), (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 2]]])['allocations'][0];
        $this->assertSame(now('UTC')->timestamp, \Carbon\CarbonImmutable::parse($a['policy_expires_at'])->timestamp);
        $this->assertSame(5000, $a['price_snapshot']['unit_price_minor']);
    }

    public function test_offline_policy_is_signed_and_tampering_is_rejected(): void
    {
        $d = $this->device(); $c = $this->context(1, $d); $shift = $this->shift(1, $d);
        $a = app(AllocationService::class)->request($c, (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]])['allocations'][0];
        $signer = app(\App\Pos\Services\OfflinePolicySigner::class); $this->assertTrue($signer->verify($a['signed_policy']));
        $tampered = $a['signed_policy']; $tampered['policy']['reserved'] = 999;
        $this->assertFalse($signer->verify($tampered));
        $data = $this->offlineData($d, $shift, $a['allocation_id']); $data['lines'][0]['policy_signature'] = str_repeat('A', 88);
        $this->error('INVALID_POLICY_SIGNATURE', fn () => app(SalePostingService::class)->post($c, (string) Str::uuid(), $data, true));
        $this->assertDatabaseHas('pos_stock_allocations', ['id' => $a['allocation_id'], 'consumed' => 0]);
    }

    private function offlineData($device, int $shift, string $allocation): array
    {
        $policy = json_decode(DB::table('pos_stock_allocations')->where('id', $allocation)->value('signed_policy'), true);
        return ['client_sale_id' => (string) Str::uuid(), 'register_id' => 1, 'shift_id' => $shift,
            'currency' => 'NGN', 'occurred_at' => now('UTC')->toIso8601String(),
            'lines' => [['stock_id' => 11, 'quantity' => 3, 'unit_price_minor' => 10000, 'tax_minor' => 0,
                'allocation_id' => $allocation, 'policy_signature' => $policy['signature']]],
            'tenders' => [['method' => 'cash', 'currency' => 'NGN', 'amount_minor' => 30000]]];
    }

    public function test_offline_reserve_online_sale_sync_and_release_reduce_physical_stock_once(): void
    {
        $device = $this->device(); $c = $this->context(1, $device); $shift = $this->shift(1, $device);
        $a = app(AllocationService::class)->request($c, (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]])['allocations'][0];
        $data = $this->offlineData($device, $shift, $a['allocation_id']);
        $key = (string) Str::uuid(); app(SalePostingService::class)->post($c, $key, $data, true);
        app(SalePostingService::class)->post($c, $key, $data, true);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 10]);
        $this->assertDatabaseHas('pos_stock_allocations', ['id' => $a['allocation_id'], 'consumed' => 3]);
        DB::table('pos_registers')->insert(['id' => 10, 'seller_id' => 1, 'location_id' => 1, 'code' => 'WEB', 'name' => 'Web register']);
        $webShift = app(ShiftService::class)->open($this->context(), (string) Str::uuid(),
            ['register_id' => 10, 'client_shift_id' => (string) Str::uuid(), 'opening_minor' => 0])['shift_id'];
        $web = $this->saleData(1, $webShift); $web['register_id'] = 10;
        app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $web);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 8]);
        app(AllocationService::class)->reconcile($c, (string) Str::uuid(), ['checkpoint_sequence' => 0, 'pending_events' => 0,
            'allocations' => [['allocation_id' => $a['allocation_id'], 'consumed_quantity' => 3]]]);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 15]);
        $this->assertDatabaseHas('pos_stock_allocations', ['id' => $a['allocation_id'], 'released' => 7, 'status' => 'closed']);
        $this->assertDatabaseCount('orders', 2);
    }

    public function test_expired_allocations_are_not_automatically_released(): void
    {
        $device = $this->device(); $c = $this->context(1, $device); $shift = $this->shift(1, $device);
        $a = app(AllocationService::class)->request($c, (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]])['allocations'][0];
        DB::table('pos_stock_allocations')->where('id', $a['allocation_id'])->update(['policy_expires_at' => now()->subDay()]);
        $this->error('OFFLINE_POLICY_EXPIRED', fn () => app(SalePostingService::class)->post($c, (string) Str::uuid(), $this->offlineData($device, $shift, $a['allocation_id']), true));
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 10]);
        $this->assertDatabaseHas('pos_stock_allocations', ['id' => $a['allocation_id'], 'released' => 0]);
    }

    public function test_release_requires_matching_checkpoint_and_consumption(): void
    {
        $d = $this->device(); $c = $this->context(1, $d);
        $a = app(AllocationService::class)->request($c, (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]])['allocations'][0];
        $payload = ['checkpoint_sequence' => 1, 'pending_events' => 0, 'allocations' => [['allocation_id' => $a['allocation_id'], 'consumed_quantity' => 0]]];
        $this->error('RECONCILIATION_INCOMPLETE', fn () => app(AllocationService::class)->reconcile($c, (string) Str::uuid(), $payload));
        $payload['checkpoint_sequence'] = 0; $payload['allocations'][0]['consumed_quantity'] = 3;
        $this->error('RECONCILIATION_CONFLICT', fn () => app(AllocationService::class)->reconcile($c, (string) Str::uuid(), $payload));
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 10]);
    }

    public function test_offline_uses_issued_price_after_current_price_changes(): void
    {
        $d = $this->device(); $c = $this->context(1, $d); $shift = $this->shift(1, $d);
        $a = app(AllocationService::class)->request($c, (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]])['allocations'][0];
        DB::table('product_stocks')->where('id', 11)->update(['price' => '200.00']);
        DB::table('products')->where('id', 101)->update(['published' => 0]);
        $sale = app(SalePostingService::class)->post($c, (string) Str::uuid(), $this->offlineData($d, $shift, $a['allocation_id']), true);
        $this->assertSame(30000, $sale['total_minor']);
        $this->assertSame(10000, json_decode(DB::table('pos_sale_lines')->value('snapshot'), true)['unit_price_minor']);
    }

    public function test_tampered_offline_price_and_exposure_limit_roll_back_allocation_consumption(): void
    {
        $d = $this->device(); $c = $this->context(1, $d); $shift = $this->shift(1, $d);
        $a = app(AllocationService::class)->request($c, (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]])['allocations'][0];
        $data = $this->offlineData($d, $shift, $a['allocation_id']); $data['lines'][0]['unit_price_minor'] = 1;
        $this->error('PRICE_MISMATCH', fn () => app(SalePostingService::class)->post($c, (string) Str::uuid(), $data, true));
        $data['lines'][0]['unit_price_minor'] = 10000;
        DB::table('pos_devices')->where('id', $d->id)->update(['max_offline_sale_minor' => 1]);
        $this->error('OFFLINE_EXPOSURE_LIMIT', fn () => app(SalePostingService::class)->post($c, (string) Str::uuid(), $data, true));
        $this->assertDatabaseHas('pos_stock_allocations', ['id' => $a['allocation_id'], 'consumed' => 0]);
    }

    public function test_sync_is_durable_idempotent_and_sequence_ordered(): void
    {
        $d = $this->device(); $c = $this->context(1, $d); $eventId = (string) Str::uuid(); $clientShift = (string) Str::uuid();
        $event = ['event_id' => $eventId, 'local_sequence' => 1, 'type' => 'shift.opened',
            'payload' => ['client_shift_id' => $clientShift, 'register_id' => 1, 'opening_minor' => 0]];
        $payload = ['schema_version' => 1, 'device_id' => $d->id, 'events' => [$event]];
        $service = app(SyncService::class); $a = $service->push($c, $payload)['results'][0];
        $b = $service->push($c, $payload)['results'][0];
        $this->assertSame('accepted', $a['status']); $this->assertSame('duplicate', $b['status']);
        $this->assertSame($a['shift_id'], $b['shift_id']); $this->assertDatabaseCount('pos_shifts', 1);
        $event['local_sequence'] = 4; $event['event_id'] = (string) Str::uuid();
        $payload['events'] = [$event]; $gap = $service->push($c, $payload)['results'][0];
        $this->assertSame('SEQUENCE_GAP', $gap['error_code']); $this->assertFalse($gap['durable']);
        $this->assertDatabaseCount('pos_sync_inbox', 1);
    }

    public function test_sync_rejected_event_is_durable_but_does_not_consume_stock(): void
    {
        $d = $this->device(); $c = $this->context(1, $d); $shift = $this->shift(1, $d);
        $a = app(AllocationService::class)->request($c, (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]])['allocations'][0];
        $data = $this->offlineData($d, $shift, $a['allocation_id']);
        $data['client_shift_id'] = DB::table('pos_shifts')->where('id', $shift)->value('client_shift_id'); unset($data['shift_id']);
        $data['tenders'][0]['amount_minor'] = 1;
        $event = ['event_id' => (string) Str::uuid(), 'local_sequence' => 1, 'type' => 'sale.completed', 'payload' => $data];
        $result = app(SyncService::class)->push($c, ['schema_version' => 1, 'device_id' => $d->id, 'events' => [$event]])['results'][0];
        $this->assertSame('TENDER_TOTAL_MISMATCH', $result['error_code']); $this->assertTrue($result['durable']);
        $this->assertDatabaseCount('orders', 0); $this->assertDatabaseCount('pos_sync_inbox', 1);
        $this->assertDatabaseHas('pos_stock_allocations', ['id' => $a['allocation_id'], 'consumed' => 0]);
    }

    public function test_sync_lost_response_retry_returns_original_order_and_status_query(): void
    {
        $d = $this->device(); $c = $this->context(1, $d); $shift = $this->shift(1, $d);
        $a = app(AllocationService::class)->request($c, (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]])['allocations'][0];
        $data = $this->offlineData($d, $shift, $a['allocation_id']);
        $data['client_shift_id'] = DB::table('pos_shifts')->where('id', $shift)->value('client_shift_id'); unset($data['shift_id']);
        $event = ['event_id' => (string) Str::uuid(), 'local_sequence' => 1, 'type' => 'sale.completed', 'payload' => $data];
        $payload = ['schema_version' => 1, 'device_id' => $d->id, 'events' => [$event]];
        $a = app(SyncService::class)->push($c, $payload)['results'][0];
        $b = app(SyncService::class)->push($c, $payload)['results'][0];
        $this->assertSame('accepted', $a['status']); $this->assertSame('duplicate', $b['status']);
        $this->assertSame($a['order_id'], $b['order_id']); $this->assertDatabaseCount('orders', 1);
        $this->withToken($this->apiToken($d))->getJson('/api/pos/v1/sync/status?event_ids[]='.$event['event_id'])
            ->assertOk()->assertJsonPath('results.0.order_id', $a['order_id']);
    }

    public function test_revoked_device_cannot_release_unsent_reserves(): void
    {
        $d = $this->device(); $c = $this->context(1, $d);
        $a = app(AllocationService::class)->request($c, (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]])['allocations'][0];
        DB::table('pos_devices')->where('id', $d->id)->update(['revoked_at' => now()]);
        $this->error('DEVICE_REVOKED', fn () => app(AllocationService::class)->reconcile($c, (string) Str::uuid(),
            ['checkpoint_sequence' => 0, 'pending_events' => 0, 'allocations' => [['allocation_id' => $a['allocation_id'], 'consumed_quantity' => 0]]]));
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 10]);
    }
}
