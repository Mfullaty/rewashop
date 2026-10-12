<?php
// Disposable local browser fixture. Never copied into the installable addon.
require dirname(__DIR__, 2).'/vendor/autoload.php';

foreach (['APP_ENV' => 'testing', 'APP_KEY' => 'base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
    'CACHE_DRIVER' => 'array', 'SESSION_DRIVER' => 'file', 'DEMO_MODE' => 'Off'] as $key => $value) { putenv($key.'='.$value); $_ENV[$key] = $value; }

class PosWebFixture extends \Tests\Feature\Pos\PosTestCase
{
    public function build(): void
    {
        $this->setUp();
        \Illuminate\Support\Facades\DB::table('addons')->insert(['unique_identifier' => 'rewa_pos_pro', 'activated' => true, 'name' => 'RewaShop POS Pro', 'version' => '1.1']);
        \Illuminate\Support\Facades\DB::table('business_settings')->insert(['type' => 'current_version', 'value' => '7.5.0']);
        \Illuminate\Support\Facades\DB::table('users')->where('id', 1)->update(['name' => 'RewaShop Central']);
        \Illuminate\Support\Facades\DB::table('shops')->where('user_id', 2)->update(['name' => 'Amina Retail']);
        $names = ['Premium Basmati Rice', 'Golden Valley Cooking Oil', 'Fresh Ground Coffee', 'Natural Honey', 'Breakfast Oats', 'Classic Whole Milk', 'Garden Tomato Paste', 'Sea Salt Crackers', 'Pure Coconut Water', 'Roasted Cashew Nuts', 'Black Tea Collection', 'Laundry Essentials'];
        \Illuminate\Support\Facades\DB::table('products')->where('id', 101)->update(['name' => $names[0]]);
        \Illuminate\Support\Facades\DB::table('products')->where('id', 202)->update(['name' => 'Seller Rice 5 kg']);
        \Illuminate\Support\Facades\DB::table('products')->where('id', 303)->update(['name' => 'Other Seller Rice']);
        foreach (array_slice($names, 1) as $index => $name) {
            $this->stock(100+$index, 400+$index, 1, 'admin', 25, '125.00', 'BAR-'.$index);
            \Illuminate\Support\Facades\DB::table('products')->where('id', 400+$index)->update(['name' => $name]);
        }
        $this->stock(150, 550, 1, 'admin', 8, '150.00', 'SHARED');
        \Illuminate\Support\Facades\DB::table('products')->where('id', 550)->update(['name' => 'Organic Flour']);
        \Illuminate\Support\Facades\DB::table('product_stocks')->where('id', 150)->update(['variant' => '1 kg']);
        \Illuminate\Support\Facades\DB::table('product_stocks')->insert(['id'=>151,'product_id'=>550,'variant'=>'2 kg','sku'=>'FLOUR-2','price'=>'275.00','qty'=>6]);
        $dbPath = sys_get_temp_dir().'/rewashop-pos-web-test.sqlite';
        if (is_file($dbPath)) { unlink($dbPath); }
        \Illuminate\Support\Facades\DB::statement("VACUUM INTO '".$dbPath."'");
        file_put_contents(sys_get_temp_dir().'/rewashop-pos-web-test.key', sodium_crypto_sign_secretkey(sodium_crypto_sign_keypair()));
        echo $dbPath.PHP_EOL;
        $this->tearDown();
    }
}
(new PosWebFixture('browserFixture'))->build();
