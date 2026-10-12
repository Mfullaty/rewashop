<?php
// Disposable loopback integration fixture; never deploy this file.
require dirname(__DIR__, 2).'/vendor/autoload.php';
foreach (['APP_ENV' => 'testing', 'APP_KEY' => 'base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
    'CACHE_DRIVER' => 'array', 'SESSION_DRIVER' => 'file', 'DEMO_MODE' => 'Off'] as $key => $value) { putenv($key.'='.$value); $_ENV[$key] = $value; }
class PosDesktopFixture extends \Tests\Feature\Pos\PosTestCase
{
    public function build(): void
    {
        $this->setUp();
        $device = $this->device(2);
        $token = $this->apiToken($device);
        \Illuminate\Support\Facades\DB::table('product_taxes')->insert(['product_id' => 202, 'tax' => '7.50', 'tax_type' => 'percent']);
        app(\App\Pos\Services\CatalogService::class)->stock(22);
        $database = sys_get_temp_dir().'/rewashop-pos-desktop-test.sqlite';
        if (is_file($database)) { unlink($database); }
        \Illuminate\Support\Facades\DB::statement("VACUUM INTO '".$database."'");
        copy(config('pos.signing_key_path'), sys_get_temp_dir().'/rewashop-pos-desktop-test.key');
        file_put_contents(sys_get_temp_dir().'/rewashop-pos-desktop-credential.json', json_encode(['token' => $token, 'device_id' => $device->id]));
        chmod(sys_get_temp_dir().'/rewashop-pos-desktop-credential.json', 0600);
        $this->tearDown();
        echo "Desktop fixture ready.\n";
    }
}
(new PosDesktopFixture('desktopFixture'))->build();
