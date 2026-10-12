<?php

namespace App\Pos\Services;

use App\Models\User;
use App\Models\Pos\Device;
use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use Illuminate\Support\Facades\DB;

class AuthorizationService
{
    public function context(User $user, ?Device $device = null, ?int $registerId = null): PosContext
    {
        if ($user->banned) {
            throw new PosException('USER_BLOCKED', 'This account is blocked.', 403);
        }
        if ($device && (int) $device->cashier_id !== (int) $user->id) {
            throw new PosException('DEVICE_CASHIER_MISMATCH', 'The device must use its enrolled cashier identity.', 403);
        }
        $platformId = (int) User::where('user_type', 'admin')->orderBy('id')->value('id');
        if ($device) {
            $sellerId = (int) $device->seller_id;
        } elseif ($user->user_type === 'seller') {
            $sellerId = (int) $user->id;
        } elseif ($user->user_type === 'admin') {
            $sellerId = $platformId;
        } elseif ($user->user_type === 'staff' && !$registerId) {
            $sellerId = $platformId;
        } elseif ($registerId) {
            $sellerId = (int) DB::table('pos_registers')->where('id', $registerId)->value('seller_id');
        } else {
            throw new PosException('REGISTER_REQUIRED', 'A permitted register must be selected.', 403);
        }
        $owner = User::find($sellerId);
        if ($owner && $owner->user_type === 'seller' && !app(StoreProvisioningService::class)->sellersEnabled()) {
            throw new PosException('SELLER_POS_DISABLED', 'Seller POS is disabled by the administrator.', 403);
        }
        if ($owner && app(StoreProvisioningService::class)->ensure($owner)) {
            DB::table('products')->where('added_by', $owner->user_type)
                ->when($owner->user_type === 'seller', fn ($q) => $q->where('user_id', $owner->id))
                ->orderBy('id')->pluck('id')->each(fn ($id) => app(CatalogService::class)->product((int) $id));
        }
        $settings = DB::table('pos_settings')->where('seller_id', $sellerId)->first();
        if (!$settings || !$owner || $owner->banned ||
            ($settings->owner_type === 'seller' && ($owner->user_type !== 'seller'))) {
            throw new PosException('STORE_UNAVAILABLE', 'The POS store is not available.', 403);
        }
        if (\Illuminate\Support\Facades\Schema::hasTable('currencies') && \Illuminate\Support\Facades\Schema::hasTable('business_settings')) {
            $currencyId = DB::table('business_settings')->where('type', 'system_default_currency')->value('value');
            $baseCurrency = $currencyId ? DB::table('currencies')->where('id', $currencyId)->value('code') : null;
            if ($baseCurrency && $baseCurrency !== $settings->currency) {
                throw new PosException('CURRENCY_CHANGED', 'The ecommerce base currency changed. Reconcile the POS currency before selling.', 409);
            }
        }
        $isOwner = ($settings->owner_type === 'admin' && $user->user_type === 'admin' && $sellerId === $platformId)
            || ($settings->owner_type === 'seller' && $user->user_type === 'seller' && (int) $user->id === $sellerId);
        if ($isOwner) {
            $abilities = config('pos.permissions'); $registerIds = []; $discountBps = 10000;
        } else {
            $permission = DB::table('pos_cashier_permissions')->where('seller_id', $sellerId)
                ->where('user_id', $user->id)->where('active', true)->first();
            if (!$permission) {
                throw new PosException('PERMISSION_DENIED', 'No active cashier assignment exists for this store.', 403);
            }
            $abilities = json_decode($permission->abilities, true, 512, JSON_THROW_ON_ERROR);
            $registerIds = array_map('intval', json_decode($permission->register_ids, true, 512, JSON_THROW_ON_ERROR));
            // Staff must have at least one explicitly assigned register.
            if (!$registerIds) {
                throw new PosException('PERMISSION_DENIED', 'No register is assigned to this cashier.', 403);
            }
            $discountBps = (int) $permission->max_discount_bps;
        }
        if ($device) {
            $abilities = array_values(array_intersect($abilities, $device->abilities));
        }
        $context = new PosContext($user, $sellerId, $settings->owner_type, $settings->currency, $abilities, $registerIds, $discountBps, $device);
        if ($registerId || $device) {
            $context->register($registerId ?? (int) $device->register_id);
        }
        return $context;
    }

    public function stocks(PosContext $context, bool $eligible = true)
    {
        $query = DB::table('product_stocks as s')->join('products as p', 'p.id', '=', 's.product_id');
        if ($context->ownerType === 'admin') {
            $query->where('p.added_by', 'admin');
        } else {
            $query->where('p.added_by', 'seller')->where('p.user_id', $context->sellerId);
        }
        if ($eligible) {
            $query->where('p.published', 1)->where('p.approved', 1)->where('p.pos_excluded', 0)
                ->where('p.digital', 0)->where('p.auction_product', 0);
        }
        return $query;
    }
}
