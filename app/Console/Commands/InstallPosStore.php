<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Pos\Support\Payload;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InstallPosStore extends Command
{
    protected $signature = 'pos:install-store {owner : Existing admin or seller user ID}';
    protected $description = 'Provision a single virtual POS location and default register without changing ecommerce products';

    public function handle(): int
    {
        if (!Schema::hasTable('pos_settings')) { $this->error('Run the additive POS migration first.'); return self::FAILURE; }
        $user = User::find($this->argument('owner'));
        $platformId = User::where('user_type', 'admin')->orderBy('id')->value('id');
        if (!$user || !in_array($user->user_type, ['admin', 'seller'], true) || ($user->user_type === 'admin' && $user->id != $platformId)) {
            $this->error('Choose the platform admin owner or an existing seller.'); return self::FAILURE;
        }
        if (DB::table('pos_settings')->where('seller_id', $user->id)->exists()) {
            $this->info('This POS store is already provisioned.'); return self::SUCCESS;
        }
        if (Schema::hasTable('business_settings') && Schema::hasTable('currencies')) {
            $defaultCurrency = DB::table('business_settings')->where('type', 'system_default_currency')->value('value');
            $code = DB::table('currencies')->where('id', $defaultCurrency)->value('code');
            if ($code && $code !== config('pos.currency')) {
                $this->error('POS_CURRENCY must match the existing ecommerce base currency ('.$code.').'); return self::FAILURE;
            }
        }
        DB::transaction(function () use ($user) {
            DB::table('pos_settings')->insert(['seller_id' => $user->id, 'owner_type' => $user->user_type,
                'currency' => config('pos.currency'), 'minor_exponent' => 2,
                'settings' => Payload::json(['tax_inclusive' => false, 'receipt_footer' => 'Thank you for shopping with us.']),
                'created_at' => now('UTC'), 'updated_at' => now('UTC')]);
            $locationId = DB::table('pos_locations')->insertGetId(['seller_id' => $user->id, 'code' => 'MAIN',
                'name' => 'Main store', 'created_at' => now('UTC'), 'updated_at' => now('UTC')]);
            DB::table('pos_registers')->insert(['seller_id' => $user->id, 'location_id' => $locationId,
                'code' => 'REG-01', 'name' => 'Register 01', 'created_at' => now('UTC'), 'updated_at' => now('UTC')]);
        });
        $this->info('POS store provisioned for '.$user->name.'. Run pos:catalog:rebuild after enabling POS.');
        return self::SUCCESS;
    }
}
