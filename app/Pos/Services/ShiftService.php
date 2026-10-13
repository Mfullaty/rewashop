<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use Illuminate\Support\Facades\DB;

class ShiftService
{
    public function open(PosContext $context, string $key, array $data): array
    {
        $context->require(!empty($data['automatic']) && ($data['opening_minor'] ?? -1) === 0 ? 'pos:sale:write' : 'pos:shift:write');
        return app(TransactionService::class)->once($context, $key, 'shift.open', $data, function () use ($context, $data) {
            $register = $context->register((int) $data['register_id']);
            $automatic = !empty($data['automatic']);
            if (!$automatic && $register->active_shift_id) {
                throw new PosException('SHIFT_ALREADY_OPEN', 'This register already has an open shift.', 409);
            }
            if (DB::table('pos_shifts')->where('client_shift_id', $data['client_shift_id'])->exists()) {
                throw new PosException('SHIFT_ID_CONFLICT', 'This shift identifier already exists.', 409);
            }
            $openedAt = $data['occurred_at'] ?? now('UTC')->toIso8601String();
            if (\Carbon\CarbonImmutable::parse($openedAt)->greaterThan(now('UTC')->addMinutes(5))) {
                throw new PosException('INVALID_EVENT_TIME', 'The shift time is in the future.');
            }
            $id = DB::table('pos_shifts')->insertGetId([
                'client_shift_id' => $data['client_shift_id'], 'seller_id' => $context->sellerId,
                'register_id' => $register->id, 'cashier_id' => $context->actor->id,
                'automatic' => $automatic, 'device_id' => $context->device?->id, 'status' => 'open', 'opening_minor' => $data['opening_minor'],
                'opened_at' => \Carbon\CarbonImmutable::parse($openedAt)->utc(),
                'created_at' => now('UTC'), 'updated_at' => now('UTC'),
            ]);
            if (!$automatic) { DB::table('pos_registers')->where('id', $register->id)->update(['active_shift_id' => $id]); }
            app(AuditService::class)->record($context, 'shift.open', (string) $id, $data);
            return ['shift_id' => $id, 'client_shift_id' => $data['client_shift_id'], 'status' => 'open'];
        });
    }

    public function active(PosContext $context, int $id, ?int $registerId = null): object
    {
        $shift = $context->scoped('pos_shifts', $id);
        $register = $context->register((int) $shift->register_id);
        if ($shift->status !== 'open' || (int) $shift->cashier_id !== (int) $context->actor->id ||
            (!$shift->automatic && (int) $register->active_shift_id !== $id) ||
            ($registerId && (int) $shift->register_id !== $registerId) ||
            ($shift->device_id !== $context->device?->id)) {
            throw new PosException('SHIFT_UNAVAILABLE', 'An open shift belonging to this cashier and register is required.', 409);
        }
        return $shift;
    }

    public function automatic(PosContext $context, int $registerId): object
    {
        $context->register($registerId);
        $existing = DB::table('pos_shifts')->where('seller_id', $context->sellerId)->where('register_id', $registerId)
            ->where('cashier_id', $context->actor->id)->where('device_id', $context->device?->id)->where('status', 'open')->first();
        if ($existing) { return $existing; }
        $id = (string) \Illuminate\Support\Str::uuid();
        $result = $this->open($context, $id, ['client_shift_id' => $id, 'register_id' => $registerId,
            'opening_minor' => 0, 'automatic' => true]);
        return DB::table('pos_shifts')->where('id', $result['shift_id'])->first();
    }

    public function expected(int $id): int
    {
        $shift = DB::table('pos_shifts')->where('id', $id)->first();
        $cash = DB::table('pos_tenders as t')->join('pos_sales as s', 's.id', '=', 't.sale_id')
            ->where('s.shift_id', $id)->where('s.status', '!=', 'voided')->where('t.method', 'cash')->sum('t.amount_minor');
        $refunds = DB::table('pos_refunds')->where('shift_id', $id)->where('method', 'cash')->where('status', 'completed')->sum('amount_minor');
        $movements = DB::table('pos_cash_movements')->where('shift_id', $id)->sum('amount_minor');
        return (int) $shift->opening_minor + (int) $cash - (int) $refunds + (int) $movements;
    }

    public function close(PosContext $context, string $key, int $id, array $data): array
    {
        $context->require('pos:shift:write');
        return app(TransactionService::class)->once($context, $key, 'shift.close:'.$id, $data, function () use ($context, $id, $data) {
            $shift = $this->active($context, $id);
            $expected = $this->expected($id); $variance = $data['counted_minor'] - $expected;
            if ($variance && empty($data['reason'])) {
                throw new PosException('VARIANCE_REASON_REQUIRED', 'Explain the cash-count variance.');
            }
            $closedAt = \Carbon\CarbonImmutable::parse($data['occurred_at'] ?? now('UTC'))->utc();
            if ($closedAt->lessThan(\Carbon\CarbonImmutable::parse($shift->opened_at, 'UTC')) || $closedAt->greaterThan(now('UTC')->addMinutes(5))) {
                throw new PosException('INVALID_EVENT_TIME', 'The shift closing time is invalid.');
            }
            DB::table('pos_shifts')->where('id', $id)->update([
                'status' => 'closed', 'expected_minor' => $expected, 'counted_minor' => $data['counted_minor'],
                'variance_minor' => $variance, 'close_reason' => $data['reason'] ?? null,
                'closed_at' => $closedAt, 'updated_at' => now('UTC'),
            ]);
            DB::table('pos_registers')->where('id', $shift->register_id)->where('active_shift_id', $id)->update(['active_shift_id' => null]);
            app(AuditService::class)->record($context, 'shift.close', (string) $id, ['expected_minor' => $expected, 'variance_minor' => $variance] + $data);
            return ['shift_id' => $id, 'status' => 'closed', 'expected_minor' => $expected,
                'counted_minor' => $data['counted_minor'], 'variance_minor' => $variance];
        });
    }

    public function cash(PosContext $context, string $key, int $id, array $data): array
    {
        $context->require('pos:cash:write');
        return app(TransactionService::class)->once($context, $key, 'shift.cash:'.$id, $data, function () use ($context, $id, $data) {
            $this->active($context, $id);
            if ($data['amount_minor'] === 0 || $this->expected($id) + $data['amount_minor'] < 0) {
                throw new PosException('INVALID_CASH_MOVEMENT', 'The cash movement would create an invalid till balance.');
            }
            $movementId = DB::table('pos_cash_movements')->insertGetId([
                'shift_id' => $id, 'seller_id' => $context->sellerId, 'actor_id' => $context->actor->id,
                'amount_minor' => $data['amount_minor'], 'reason' => $data['reason'], 'created_at' => now('UTC'),
            ]);
            app(AuditService::class)->record($context, 'shift.cash', (string) $movementId, $data);
            return ['movement_id' => $movementId, 'shift_id' => $id];
        });
    }
}
