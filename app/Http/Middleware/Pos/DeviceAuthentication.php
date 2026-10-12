<?php

namespace App\Http\Middleware\Pos;

use App\Models\Pos\Device;
use App\Models\User;
use App\Pos\Exceptions\PosException;
use App\Pos\Services\AuthorizationService;
use Closure;
use Illuminate\Http\Request;
use App\Models\Pos\DeviceAccessToken;

class DeviceAuthentication
{
    public function handle(Request $request, Closure $next)
    {
        $bearer = $request->bearerToken();
        $token = $bearer ? DeviceAccessToken::findToken($bearer) : null;
        $device = $token?->tokenable;
        $expiration = config('sanctum.expiration');
        if (!$token || !($device instanceof Device) || $device->revoked_at ||
            ($token->getRawOriginal('expires_at') && \Carbon\CarbonImmutable::parse($token->getRawOriginal('expires_at'), 'UTC')->isPast()) ||
            ($expiration && \Carbon\CarbonImmutable::parse($token->getRawOriginal('created_at'), 'UTC')->lte(now('UTC')->subMinutes($expiration)))) {
            throw new PosException('DEVICE_UNAUTHENTICATED', 'A valid device-bound POS token is required.', 401);
        }
        $user = User::find($device->cashier_id);
        if (!$user) { throw new PosException('USER_BLOCKED', 'The enrolled cashier is unavailable.', 403); }
        $device->withAccessToken($token);
        $context = app(AuthorizationService::class)->context($user, $device);
        foreach ($context->abilities as $ability) {
            if (!$token->can($ability)) {
                throw new PosException('TOKEN_SCOPE_MISMATCH', 'The token does not match its device permissions.', 403);
            }
        }
        $request->setUserResolver(fn () => $user);
        $request->attributes->set('pos_context', $context);
        $token->forceFill(['last_used_at' => now('UTC')])->save();
        $device->forceFill(['last_seen_at' => now('UTC')])->save();
        return $next($request);
    }
}
