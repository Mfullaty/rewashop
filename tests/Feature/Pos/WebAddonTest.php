<?php

namespace Tests\Feature\Pos;

use App\Models\User;
use App\Pos\Services\WebAddonInstaller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use ZipArchive;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class WebAddonTest extends PosTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        DB::table('addons')->insert(['unique_identifier' => 'rewa_pos_pro', 'activated' => 1, 'version' => '1.0']);
        DB::table('business_settings')->insert(['type' => 'current_version', 'value' => '7.5.0']);
    }

    public function test_admin_and_seller_workspaces_enforce_server_ownership_and_safe_boot_configuration(): void
    {
        $this->actingAs(User::find(1))->get('/admin/rewa-pos')->assertOk()->assertSee('rewa-pos-root');
        $this->get('/seller/rewa-pos')->assertForbidden();
        $this->actingAs(User::find(2))->get('/seller/rewa-pos')->assertOk();
        $this->get('/admin/rewa-pos')->assertForbidden();
        $this->getJson('/pos/backend/catalog/search?barcode=00101')->assertOk()->assertJsonCount(0, 'data');
        $this->getJson('/pos/backend/catalog/search?stock_id=22')->assertOk()->assertJsonPath('data.0.stock_id', 22);
        $this->getJson('/rewa-pos/web/products')->assertOk()->assertJsonCount(1, 'data')->assertJsonPath('data.0.id', 202);
        $this->withHeader('Idempotency-Key', (string) Str::uuid())->putJson('/rewa-pos/web/products/101', ['pos' => false])->assertNotFound();
        $this->withHeader('Idempotency-Key', (string) Str::uuid())->putJson('/rewa-pos/web/products/202', ['pos' => false])->assertOk();
        $this->getJson('/pos/backend/catalog/search?stock_id=22')->assertJsonCount(0, 'data');
        $this->assertDatabaseHas('products', ['id' => 101, 'pos' => 1]);
    }

    public function test_deactivation_preserves_financial_data_and_blocks_ui_api_even_with_registered_routes(): void
    {
        $data = $this->saleData(2);
        $sale = app(\App\Pos\Services\SalePostingService::class)->post($this->context(2), (string) Str::uuid(), $data);
        DB::table('addons')->where('unique_identifier', 'rewa_pos_pro')->update(['activated' => 0]);
        $this->actingAs(User::find(2))->get('/seller/rewa-pos')->assertNotFound();
        $this->getJson('/rewa-pos/web/products')->assertNotFound();
        $this->getJson('/pos/backend/receipts/'.$sale['receipt_id'])->assertOk();
        $this->assertDatabaseCount('pos_sales', 1); $this->assertDatabaseCount('pos_receipts', 1);
        $this->assertDatabaseHas('product_stocks', ['id' => 22, 'qty' => 18]);
    }

    private function payload(int $stock = 22): array
    {
        return ['register_id' => 2, 'label' => 'Held by cashier', 'revision' => 0,
            'payload' => ['lines' => [['item' => ['stock_id' => $stock], 'quantity' => 1]]]];
    }

    public function test_drafts_are_scoped_expiring_and_revision_guarded_without_any_stock_effect(): void
    {
        $id = (string) Str::uuid(); $data = $this->payload();
        $this->actingAs(User::find(2))->putJson('/rewa-pos/web/drafts/'.$id, $data)->assertOk()->assertJsonPath('revision', 1);
        $this->putJson('/rewa-pos/web/drafts/'.$id, $data)->assertStatus(409)->assertJsonPath('error.code', 'DRAFT_CONFLICT');
        $this->getJson('/rewa-pos/web/drafts?register_id=2')->assertJsonCount(1, 'data');
        $this->actingAs(User::find(3))->getJson('/rewa-pos/web/drafts?register_id=3')->assertJsonCount(0, 'data');
        $this->deleteJson('/rewa-pos/web/drafts/'.$id, ['register_id' => 3, 'revision' => 1])->assertStatus(409);
        $this->actingAs(User::find(2))->putJson('/rewa-pos/web/drafts/'.Str::uuid(), $this->payload(33))->assertNotFound();
        DB::table('pos_web_drafts')->where('id', $id)->update(['expires_at' => now()->subMinute()]);
        $this->getJson('/rewa-pos/web/drafts?register_id=2')->assertJsonCount(0, 'data');
        $this->assertDatabaseCount('orders', 0); $this->assertDatabaseHas('product_stocks', ['id' => 22, 'qty' => 20]);
    }

    public function test_active_shift_is_recovered_after_reload_and_other_merchants_cannot_read_it(): void
    {
        $shift = $this->shift(2);
        $this->actingAs(User::find(2))->getJson('/rewa-pos/web/shifts?register_id=2')->assertOk()
            ->assertJsonPath('data.0.id', $shift)->assertJsonPath('data.0.is_own', true)->assertJsonPath('data.0.expected_minor', 50000);
        $this->actingAs(User::find(3))->getJson('/rewa-pos/web/shifts?register_id=2')->assertNotFound();
    }

    public function test_prepared_checkout_cannot_be_deleted_until_its_canonical_sale_is_resolved(): void
    {
        $data = $this->saleData(2); $key = (string) Str::uuid(); $id = (string) Str::uuid();
        $draft = $this->payload(); $draft['payload']['intent'] = ['key' => $key, 'payload' => $data];
        $this->actingAs(User::find(2))->putJson('/rewa-pos/web/drafts/'.$id, $draft)->assertOk();
        $this->deleteJson('/rewa-pos/web/drafts/'.$id, ['register_id' => 2, 'revision' => 1])->assertStatus(409)->assertJsonPath('error.code', 'CHECKOUT_UNRESOLVED');
        $sale = $this->withHeader('Idempotency-Key', $key)->postJson('/pos/backend/sales', $data)->assertCreated()->json();
        $this->getJson('/pos/backend/receipts/'.$sale['receipt_id'])->assertJsonPath('receipt.store.name', 'Shop 2');
        $this->deleteJson('/rewa-pos/web/drafts/'.$id, ['register_id' => 2, 'revision' => 1])->assertOk();
        $this->assertDatabaseCount('pos_web_drafts', 0); $this->assertDatabaseCount('pos_sales', 1);
    }

    public function test_package_mapping_cannot_overwrite_core_files_and_missing_schema_blocks_install(): void
    {
        $zipPath = tempnam(sys_get_temp_dir(), 'pos-addon-'); $zip = new ZipArchive(); $zip->open($zipPath, ZipArchive::OVERWRITE);
        $zip->addFromString('rewa_pos_pro/config.json', json_encode(['unique_identifier' => 'rewa_pos_pro', 'version' => '1.0', 'minimum_item_version' => '7.5.0',
            'files' => [['root_directory' => 'addons/rewa_pos_pro/files/config/app.php', 'update_directory' => 'config/app.php', 'sha256' => hash('sha256', 'unsafe')]]]));
        $zip->addFromString('rewa_pos_pro/files/config/app.php', 'unsafe'); $zip->close(); $zip->open($zipPath);
        try { app(WebAddonInstaller::class)->install($zip); $this->fail('Unsafe destination accepted'); }
        catch (\RuntimeException $e) { $this->assertStringContainsString('unsupported destination', $e->getMessage()); }
        finally { $zip->close(); unlink($zipPath); }
        Schema::drop('pos_web_drafts');
        try { app(WebAddonInstaller::class)->prerequisites(); $this->fail('Missing core migration accepted'); }
        catch (\RuntimeException $e) { $this->assertStringContainsString('pos_web_drafts', $e->getMessage()); }
    }

    public function test_real_release_installs_updates_and_rejects_tampering_before_activation(): void
    {
        $path = base_path('dist/rewa_pos_pro-1.0.zip');
        if (!is_file($path)) { $this->markTestSkipped('Build and package the web addon to run the install lifecycle check.'); }
        $originalBase = base_path();
        $testRoot = sys_get_temp_dir().'/pos-addon-install-'.Str::uuid();
        foreach (['routes', 'public', 'bootstrap/cache'] as $directory) { mkdir($testRoot.'/'.$directory, 0755, true); }
        app()->setBasePath($testRoot);
        try {
        DB::table('addons')->where('unique_identifier', 'rewa_pos_pro')->delete();
        $zip = new ZipArchive(); $zip->open($path);
        $addon = app(WebAddonInstaller::class)->install($zip); $zip->close();
        $this->assertSame(1, $addon->activated); $this->assertSame('1.0', $addon->version);
        $tmp = tempnam(sys_get_temp_dir(), 'pos-upgrade-'); copy($path, $tmp); $zip->open($tmp);
        $manifest = json_decode($zip->getFromName('rewa_pos_pro/config.json'), true); $manifest['version'] = '1.1';
        $zip->addFromString('rewa_pos_pro/config.json', json_encode($manifest)); $zip->close(); $zip->open($tmp);
        $updated = app(WebAddonInstaller::class)->install($zip); $zip->close();
        $this->assertSame('1.1', $updated->version); $this->assertDatabaseCount('addons', 1);
        $zip->open($tmp); $zip->addFromString(substr($manifest['files'][0]['root_directory'], 7), 'tampered'); $zip->close(); $zip->open($tmp);
        try { app(WebAddonInstaller::class)->install($zip); $this->fail('Tampered release accepted'); }
        catch (\RuntimeException $e) { $this->assertStringContainsString('checksum', $e->getMessage()); }
        finally { $zip->close(); unlink($tmp); }
        $this->assertDatabaseHas('addons', ['unique_identifier' => 'rewa_pos_pro', 'version' => '1.1', 'activated' => 1]);
        } finally {
            app()->setBasePath($originalBase);
            \Illuminate\Support\Facades\File::deleteDirectory($testRoot);
        }
    }

    public function test_real_addons_manager_upload_uses_the_bridge_before_legacy_extraction(): void
    {
        $zipPath = base_path('dist/rewa_pos_pro-1.0.zip');
        if (!is_file($zipPath)) { $this->markTestSkipped('Build the release ZIP first.'); }
        $root = sys_get_temp_dir().'/pos-addon-http-'.Str::uuid();
        foreach (['routes', 'public', 'bootstrap/cache'] as $dir) { mkdir($root.'/'.$dir, 0755, true); }
        $previousBase = base_path(); $previousDiskRoot = config('filesystems.disks.local.root');
        app()->setBasePath($root); config(['filesystems.disks.local.root' => $root.'/public']); Storage::forgetDisk('local');
        Cache::forever('translations-en', ['rewashop_pos_pro_installed_successfully' => 'RewaShop POS Pro installed successfully']);
        $this->withoutMiddleware(\Spatie\Permission\Middlewares\PermissionMiddleware::class);
        try {
            DB::table('addons')->where('unique_identifier', 'rewa_pos_pro')->delete();
            $this->actingAs(User::find(1))->post(route('addons.store'), ['addon_zip' => UploadedFile::fake()->createWithContent('rewa_pos_pro-1.0.zip', file_get_contents($zipPath))])
                ->assertRedirect(route('addons.index'));
            $this->assertDatabaseHas('addons', ['unique_identifier' => 'rewa_pos_pro', 'activated' => 1, 'version' => '1.0']);
            $this->assertFileExists($root.'/routes/rewa_pos_pro.php');
            $this->assertDirectoryDoesNotExist($root.'/temp');
            $addonId = DB::table('addons')->where('unique_identifier', 'rewa_pos_pro')->value('id');
            $this->postJson(route('addons.activation'), ['id' => $addonId, 'status' => 0])->assertOk();
            $this->assertDatabaseHas('addons', ['id' => $addonId, 'activated' => 0]);
            $this->postJson(route('addons.activation'), ['id' => $addonId, 'status' => 1])->assertOk();
            $this->assertDatabaseHas('addons', ['id' => $addonId, 'activated' => 1]);
        } finally {
            app()->setBasePath($previousBase); config(['filesystems.disks.local.root' => $previousDiskRoot]); Storage::forgetDisk('local');
            \Illuminate\Support\Facades\File::deleteDirectory($root);
        }
    }
}
