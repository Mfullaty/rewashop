<?php
namespace Tests\Feature\Pos;
use App\Pos\Services\ShiftService;
use Illuminate\Support\Str;
class DesktopBootstrapTest extends PosTestCase
{
    public function test_bootstrap_exposes_only_this_devices_shift_and_offline_limits(): void
    {
        $device = $this->device(2);
        $context = $this->context(2, $device);
        $shift = app(ShiftService::class)->open($context, (string) Str::uuid(), [
            'client_shift_id' => (string) Str::uuid(), 'register_id' => 2, 'opening_minor' => 12000,
        ]);
        $this->withToken($this->apiToken($device))->getJson('/api/pos/v1/bootstrap')
            ->assertOk()->assertJsonPath('device.offline_allowed', true)
            ->assertJsonPath('device.max_reserved_units', 1000)
            ->assertJsonPath('device.offline_spent_minor', 0)
            ->assertJsonPath('active_shift.id', $shift['shift_id'])
            ->assertJsonPath('active_shift.expected_minor', 12000);
        $other = $this->device(3);
        $this->withToken($this->apiToken($other))->getJson('/api/pos/v1/bootstrap')
            ->assertOk()->assertJsonPath('active_shift', null);
    }
}
