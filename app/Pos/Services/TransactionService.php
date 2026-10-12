<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class TransactionService
{
    public function run(PosContext $context, callable $work)
    {
        try {
            return DB::transaction(function () use ($context, $work) {
                // One mutex per merchant also makes cursor publication commit-ordered.
                DB::table('pos_settings')->where('seller_id', $context->sellerId)->lockForUpdate()->first();
                if ($context->device) {
                    $device = DB::table('pos_devices')->where('id', $context->device->id)->lockForUpdate()->first();
                    if (!$device || $device->revoked_at) {
                        throw new PosException('DEVICE_REVOKED', 'This POS device is revoked.', 403);
                    }
                }
                $actor = $context->actor->fresh();
                if (!$actor) { throw new PosException('USER_BLOCKED', 'The cashier account is unavailable.', 403); }
                $current = app(AuthorizationService::class)->context($actor, $context->device?->fresh(),
                    $context->device ? (int) $context->device->register_id : ($context->registerIds[0] ?? null));
                if ($current->sellerId !== $context->sellerId || array_diff($context->abilities, $current->abilities) ||
                    $current->device?->offline_allowed !== $context->device?->offline_allowed ||
                    $current->maxDiscountBps < $context->maxDiscountBps || $current->registerIds !== $context->registerIds) {
                    throw new PosException('PERMISSION_CHANGED', 'POS permissions changed. Reload the register session.', 403);
                }
                return $work();
            }, 5);
        } catch (QueryException $e) {
            if (($e->errorInfo[1] ?? null) === 1062 || ($e->errorInfo[0] ?? null) === '23505' ||
                str_contains($e->getMessage(), 'UNIQUE constraint failed')) {
                throw new PosException('IDENTITY_CONFLICT', 'A concurrent request already used this unique POS identifier.', 409);
            }
            throw $e;
        }
    }

    public function once(PosContext $context, string $key, string $operation, array $payload, callable $work): array
    {
        if (!preg_match('/^[A-Za-z0-9:_-]{16,100}$/D', $key)) {
            throw new PosException('IDEMPOTENCY_KEY_REQUIRED', 'A stable 16 to 100 character idempotency key is required.');
        }
        return $this->run($context, function () use ($context, $key, $operation, $payload, $work) {
            $hash = Payload::hash($payload);
            $old = DB::table('pos_idempotency_keys')->where('key', $key)->first();
            if ($old) {
                if ((int) $old->seller_id !== $context->sellerId || (int) $old->actor_id !== (int) $context->actor->id ||
                    $old->operation !== $operation || !hash_equals($old->request_hash, $hash)) {
                    throw new PosException('IDEMPOTENCY_CONFLICT', 'The key was already used for a different request.', 409);
                }
                return json_decode($old->result, true, 512, JSON_THROW_ON_ERROR) + ['duplicate' => true];
            }
            $result = $work();
            DB::table('pos_idempotency_keys')->insert([
                'key' => $key, 'seller_id' => $context->sellerId, 'actor_id' => $context->actor->id,
                'operation' => $operation, 'request_hash' => $hash,
                'result' => Payload::json($result), 'created_at' => now('UTC'),
            ]);
            return $result + ['duplicate' => false];
        });
    }
}
