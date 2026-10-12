<?php

namespace App\Pos\Services;

use App\Models\Pos\Device;
use App\Models\User;
use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PairingService
{
    public function start(array $data): array
    {
        $id = (string) Str::uuid(); $secret = bin2hex(random_bytes(32));
        $expires = now('UTC')->addMinutes(config('pos.pairing_minutes'));
        DB::table('pos_pairings')->insert([
            'id' => $id, 'secret_hash' => hash('sha256', $secret), 'name' => $data['name'],
            'expires_at' => $expires, 'created_at' => now('UTC'), 'updated_at' => now('UTC'),
        ]);
        return ['pairing_id' => $id, 'pairing_secret' => $secret, 'expires_at' => $expires->toIso8601String()];
    }

    public function approve(PosContext $context, string $key, array $data): array
    {
        $context->require('pos:device:manage');
        return app(TransactionService::class)->once($context, $key, 'pairing.approve', $data, function () use ($context, $data) {
            $pairing = DB::table('pos_pairings')->where('id', $data['pairing_id'])->lockForUpdate()->first();
            if (!$pairing || now('UTC')->greaterThan($pairing->expires_at) || $pairing->device_id) {
                throw new PosException('PAIRING_UNAVAILABLE', 'This pairing is expired or already approved.', 409);
            }
            $register = $context->register((int) $data['register_id']);
            $cashier = User::findOrFail($data['cashier_id']);
            $cashierContext = app(AuthorizationService::class)->context($cashier, null, (int) $register->id);
            if ($cashierContext->sellerId !== $context->sellerId) {
                throw new PosException('CASHIER_SCOPE_MISMATCH', 'The cashier must belong to this store.', 403);
            }
            $abilities = array_values(array_intersect($data['abilities'], $context->abilities, $cashierContext->abilities));
            if (count($abilities) !== count($data['abilities'])) {
                throw new PosException('PERMISSION_DENIED', 'A requested device ability exceeds the approved cashier permissions.', 403);
            }
            $existingId = $data['existing_device_id'] ?? null;
            $existing = $existingId ? Device::where('seller_id', $context->sellerId)->where('id', $existingId)->lockForUpdate()->first() : null;
            if ($existingId && (!$existing || (int) $existing->register_id !== (int) $register->id || (int) $existing->cashier_id !== (int) $cashier->id)) {
                throw new PosException('DEVICE_SCOPE_MISMATCH', 'Reauthorization must preserve the device store, register and cashier.', 403);
            }
            if ($existingId && empty($data['reauthorization_reason'])) {
                throw new PosException('REAUTHORIZATION_REASON_REQUIRED', 'Explain why this device is being reauthorized.');
            }
            $id = $existingId ?? (string) Str::uuid();
            $fields = [
                'id' => $id, 'seller_id' => $context->sellerId, 'register_id' => $register->id,
                'cashier_id' => $cashier->id, 'name' => $pairing->name, 'abilities' => Payload::json($abilities),
                'offline_allowed' => $data['offline_allowed'] ?? false,
                'max_offline_sale_minor' => $data['max_offline_sale_minor'] ?? config('pos.max_offline_sale_minor'),
                'max_offline_budget_minor' => $data['max_offline_budget_minor'] ?? config('pos.max_offline_sale_minor'),
                'max_reserved_units' => $data['max_reserved_units'] ?? config('pos.max_reserved_units'),
                'created_at' => now('UTC'), 'updated_at' => now('UTC'),
            ];
            if ($existing) {
                unset($fields['id'], $fields['created_at']);
                DB::table('pos_devices')->where('id', $id)->update($fields + ['revoked_at' => null]);
                $existing->tokens()->delete();
                app(AuditService::class)->record($context, 'device.reauthorize', $id,
                    ['reason' => $data['reauthorization_reason'], 'last_sequence' => $existing->last_sequence]);
            } else {
                DB::table('pos_devices')->insert($fields);
            }
            DB::table('pos_pairings')->where('id', $pairing->id)->update(['device_id' => $id]);
            app(AuditService::class)->record($context, 'device.pair_approve', $id, ['cashier_id' => $cashier->id, 'register_id' => $register->id]);
            return ['device_id' => $id, 'pairing_id' => $pairing->id];
        });
    }

    public function claim(array $data): array
    {
        return DB::transaction(function () use ($data) {
            $pairing = DB::table('pos_pairings')->where('id', $data['pairing_id'])->lockForUpdate()->first();
            if (!$pairing || !hash_equals($pairing->secret_hash, hash('sha256', $data['pairing_secret'])) ||
                now('UTC')->greaterThan($pairing->expires_at) || $pairing->claimed_at) {
                throw new PosException('PAIRING_UNAVAILABLE', 'The pairing credentials are invalid, expired or already claimed.', 403);
            }
            if (!$pairing->device_id) { return ['status' => 'awaiting_approval']; }
            $device = Device::findOrFail($pairing->device_id);
            if ($device->revoked_at) { throw new PosException('DEVICE_REVOKED', 'This device has been revoked.', 403); }
            app(AuthorizationService::class)->context(User::findOrFail($device->cashier_id), $device);
            $token = $device->createToken('pos-device', $device->abilities, now('UTC')->addDays(config('pos.token_days')));
            DB::table('pos_pairings')->where('id', $pairing->id)->update(['claimed_at' => now('UTC')]);
            // The plaintext token is returned once and never stored in an inbox or audit log.
            return ['status' => 'paired', 'device_id' => $device->id, 'token' => $token->plainTextToken,
                'expires_at' => now('UTC')->addDays(config('pos.token_days'))->toIso8601String()];
        }, 5);
    }

    public function revoke(PosContext $context, string $key, string $id, array $data): array
    {
        $context->require('pos:device:manage');
        return app(TransactionService::class)->once($context, $key, 'device.revoke:'.$id, $data, function () use ($context, $id, $data) {
            $device = Device::where('id', $id)->where('seller_id', $context->sellerId)->lockForUpdate()->first();
            if (!$device) { throw new PosException('NOT_FOUND', 'The device was not found.', 404); }
            $context->register((int) $device->register_id);
            $device->update(['revoked_at' => now('UTC')]); $device->tokens()->delete();
            // Revocation does not release stock: unsent local sales may still exist.
            app(AuditService::class)->record($context, 'device.revoke', $id, $data);
            return ['device_id' => $id, 'status' => 'revoked', 'reservations_released' => false];
        });
    }
}
