<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Support\Payload;
use App\Pos\Support\Schemas;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SyncService
{
    public function push(PosContext $context, array $data): array
    {
        $context->require('pos:sync');
        if (!$context->device || $context->device->id !== $data['device_id']) {
            throw new PosException('DEVICE_SCOPE_MISMATCH', 'The payload must belong to the authenticated device.', 403);
        }
        $results = [];
        foreach ($data['events'] as $event) {
            $results[] = app(TransactionService::class)->run($context, function () use ($context, $event) {
                $digest = Payload::hash($event);
                $old = DB::table('pos_sync_inbox')->where('event_id', $event['event_id'])->first();
                if ($old) {
                    if ($old->device_id !== $context->device->id || !hash_equals($old->request_hash, $digest)) {
                        return ['event_id' => $event['event_id'], 'status' => 'rejected', 'error_code' => 'EVENT_ID_CONFLICT', 'durable' => false];
                    }
                    $result = json_decode($old->result, true, 512, JSON_THROW_ON_ERROR);
                    $result['duplicate'] = true;
                    if ($result['status'] === 'accepted') { $result['status'] = 'duplicate'; }
                    return $result;
                }
                $sequence = (int) DB::table('pos_devices')->where('id', $context->device->id)->value('last_sequence');
                if ((int) $event['local_sequence'] !== $sequence + 1) {
                    return ['event_id' => $event['event_id'], 'status' => 'rejected', 'error_code' => 'SEQUENCE_GAP',
                        'expected_sequence' => $sequence + 1, 'durable' => false];
                }
                try {
                    // The nested transaction is a savepoint. A failed sale rolls back
                    // every mutation before its durable conflict acknowledgment is written.
                    $result = DB::transaction(fn () => $this->dispatch($context, $event));
                    $result = ['event_id' => $event['event_id'], 'status' => 'accepted', 'durable' => true] + $result;
                } catch (PosException $e) {
                    $result = ['event_id' => $event['event_id'], 'status' => $e->status === 409 ? 'needs_review' : 'rejected',
                        'error_code' => $e->errorCode, 'message' => $e->getMessage(), 'durable' => true];
                } catch (ValidationException $e) {
                    $result = ['event_id' => $event['event_id'], 'status' => 'rejected', 'error_code' => 'INVALID_EVENT',
                        'errors' => $e->errors(), 'durable' => true];
                }
                DB::table('pos_sync_inbox')->insert([
                    'event_id' => $event['event_id'], 'device_id' => $context->device->id,
                    'seller_id' => $context->sellerId, 'local_sequence' => $event['local_sequence'],
                    'request_hash' => $digest, 'type' => $event['type'], 'status' => $result['status'],
                    'result' => Payload::json($result), 'created_at' => now('UTC'),
                ]);
                DB::table('pos_devices')->where('id', $context->device->id)->update([
                    'last_sequence' => $event['local_sequence'], 'last_seen_at' => now('UTC'),
                ]);
                app(AuditService::class)->record($context, 'sync.'.$result['status'], $event['event_id'],
                    ['type' => $event['type'], 'sequence' => $event['local_sequence'], 'error_code' => $result['error_code'] ?? null]);
                return $result;
            });
        }
        return ['schema_version' => 1, 'results' => $results];
    }

    private function dispatch(PosContext $context, array $event): array
    {
        $key = 'sync:'.$event['event_id']; $input = $event['payload'];
        if ($event['type'] === 'sale.completed') {
            $data = Validator::make($input, Schemas::sale(true))->validate();
            $data['shift_id'] = $this->shiftId($context, $data['client_shift_id']);
            return app(SalePostingService::class)->post($context, $key, $data, true);
        }
        if ($event['type'] === 'shift.opened') {
            $data = Validator::make($input, Schemas::shiftOpen())->validate();
            return app(ShiftService::class)->open($context, $key, $data);
        }
        if ($event['type'] === 'shift.closed' || $event['type'] === 'cash.moved') {
            $rules = ($event['type'] === 'shift.closed' ? Schemas::shiftClose() : Schemas::cash()) + ['client_shift_id' => 'required|uuid'];
            $data = Validator::make($input, $rules)->validate();
            $id = $this->shiftId($context, $data['client_shift_id']);
            return $event['type'] === 'shift.closed'
                ? app(ShiftService::class)->close($context, $key, $id, $data)
                : app(ShiftService::class)->cash($context, $key, $id, $data);
        }
        if ($event['type'] === 'refund.created') {
            $rules = Schemas::refund();
            $rules['shift_id'] = 'prohibited';
            $rules += ['client_shift_id' => 'required|uuid', 'client_sale_id' => 'required|uuid'];
            $data = Validator::make($input, $rules)->validate();
            $sale = DB::table('pos_sales')->where('seller_id', $context->sellerId)->where('client_sale_id', $data['client_sale_id'])->first();
            if (!$sale) { throw new PosException('ORIGINAL_SALE_UNAVAILABLE', 'The original sale must be accepted before its return.', 409); }
            $data['shift_id'] = $this->shiftId($context, $data['client_shift_id']);
            return app(RefundService::class)->create($context, $key, (int) $sale->id, $data);
        }
        if ($event['type'] === 'receipt.reprinted') {
            $data = Validator::make($input, ['receipt_id' => 'required|integer|min:1', 'reason' => 'required|string|min:3|max:500'])->validate();
            $context->require('pos:receipt:reprint');
            $receipt = $context->scoped('pos_receipts', (int) $data['receipt_id']);
            $context->scoped('pos_sales', (int) $receipt->sale_id);
            app(AuditService::class)->record($context, 'receipt.reprint', (string) $receipt->id, $data);
            return ['receipt_id' => (int) $receipt->id];
        }
        throw new PosException('UNSUPPORTED_EVENT', 'This event type is not supported by schema version 1.');
    }

    private function shiftId(PosContext $context, string $id): int
    {
        $shift = DB::table('pos_shifts')->where('seller_id', $context->sellerId)->where('device_id', $context->device->id)
            ->where('cashier_id', $context->actor->id)->where('client_shift_id', $id)->first();
        if (!$shift) { throw new PosException('SHIFT_UNAVAILABLE', 'The local shift must be accepted before dependent events.', 409); }
        return (int) $shift->id;
    }
}
