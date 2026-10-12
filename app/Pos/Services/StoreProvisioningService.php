<?php

namespace App\Pos\Services;

use App\Models\User;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class StoreProvisioningService
{
    public function sellersEnabled(): bool
    {
        return (string) DB::table('business_settings')->where('type', 'pos_sellers_enabled')->value('value') !== '0';
    }

    public function ensure(User $owner): bool
    {
        if (!config('pos.enabled') || $owner->banned || !in_array($owner->user_type, ['admin', 'seller'], true)
            || !Schema::hasTable('pos_settings') || ($owner->user_type === 'seller' && !$this->sellersEnabled())) { return false; }
        if ($owner->user_type === 'admin' && $owner->id != User::where('user_type', 'admin')->orderBy('id')->value('id')) { return false; }
        if (DB::table('pos_settings')->where('seller_id', $owner->id)->exists()) { return false; }
        $created = DB::transaction(function () use ($owner) {
            // Serialize lazy provisioning across concurrent browser, catalog and device requests.
            DB::table('users')->where('id', $owner->id)->lockForUpdate()->first();
            if (DB::table('pos_settings')->where('seller_id', $owner->id)->exists()) { return false; }
            DB::table('pos_settings')->insert(['seller_id' => $owner->id, 'owner_type' => $owner->user_type,
                'currency' => config('pos.currency'), 'minor_exponent' => 2,
                'settings' => Payload::json(['tax_inclusive' => false, 'receipt_footer' => 'Thank you for shopping with us.']),
                'created_at' => now('UTC'), 'updated_at' => now('UTC')]);
            $location = DB::table('pos_locations')->insertGetId(['seller_id' => $owner->id, 'code' => 'MAIN',
                'name' => 'Main store', 'created_at' => now('UTC'), 'updated_at' => now('UTC')]);
            DB::table('pos_registers')->insert(['seller_id' => $owner->id, 'location_id' => $location,
                'code' => 'REG-01', 'name' => 'Register 01', 'created_at' => now('UTC'), 'updated_at' => now('UTC')]);
            return true;
        }, 5);
        return $created;
    }

    public function branding(int $sellerId, string $ownerType): array
    {
        $settings = json_decode(DB::table('pos_settings')->where('seller_id', $sellerId)->value('settings') ?? '{}', true);
        $name = $ownerType === 'seller' ? DB::table('shops')->where('user_id', $sellerId)->value('name')
            : DB::table('business_settings')->where('type', 'site_name')->value('value');
        return ['seller_id' => $sellerId, 'name' => $settings['receipt_name'] ?? ($name ?: DB::table('users')->where('id', $sellerId)->value('name')),
            'logo_url' => $settings['receipt_logo_url'] ?? '', 'address' => $settings['receipt_address'] ?? '',
            'phone' => $settings['receipt_phone'] ?? '', 'email' => $settings['receipt_email'] ?? '',
            'tax_details' => $settings['receipt_tax_details'] ?? '', 'footer' => $settings['receipt_footer'] ?? 'Thank you for shopping with us.'];
    }
}
