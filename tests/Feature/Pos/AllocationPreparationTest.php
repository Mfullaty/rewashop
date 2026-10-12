<?php
namespace Tests\Feature\Pos;
use App\Pos\Services\AllocationService;
use Illuminate\Support\Str;
class AllocationPreparationTest extends PosTestCase
{
    public function test_duplicate_preparation_cannot_reserve_more_units_and_replay_is_still_idempotent(): void
    {
        $device = $this->device(); $context = $this->context(1, $device);
        $service = app(AllocationService::class); $key = (string) Str::uuid();
        $payload = ['lines' => [['stock_id' => 11, 'quantity' => 5]]];
        $first = $service->request($context, $key, $payload);
        $replay = $service->request($context, $key, $payload);
        $this->assertSame($first['allocations'], $replay['allocations']);
        $this->error('ALLOCATION_ALREADY_OPEN', fn () => $service->request($context, (string) Str::uuid(), $payload));
        $this->assertDatabaseCount('pos_stock_allocations', 1);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 15]);
        $service->reconcile($context, (string) Str::uuid(), ['checkpoint_sequence' => 0, 'pending_events' => 0,
            'allocations' => [['allocation_id' => $first['allocations'][0]['allocation_id'], 'consumed_quantity' => 0]]]);
        $service->request($context, (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]]);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 10]);
    }
    public function test_another_devices_allocation_does_not_block_this_device(): void
    {
        $first = $this->device(); $second = $this->device(); $service = app(AllocationService::class);
        foreach ([$first, $second] as $device) {
            $service->request($this->context(1, $device), (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 5]]]);
        }
        $this->assertDatabaseCount('pos_stock_allocations', 2);
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 10]);
    }
}
