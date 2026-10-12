<?php

namespace Tests\Feature\Pos;

use App\Models\User;
use App\Models\Pos\Device;
use App\Pos\Services\AuthorizationService;
use App\Pos\Services\ShiftService;
use App\Pos\Support\Payload;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Tests\TestCase;

abstract class PosTestCase extends TestCase
{
    private string $policyKeyPath;
    private ?string $mysqlDatabase = null;
    protected function setUp(): void
    {
        parent::setUp();
        config(['pos.enabled' => true, 'pos.offline_enabled' => true, 'pos.currency' => 'NGN']);
        $this->policyKeyPath = tempnam(sys_get_temp_dir(), 'pos-policy-test-');
        file_put_contents($this->policyKeyPath, sodium_crypto_sign_secretkey(sodium_crypto_sign_keypair()));
        config(['pos.signing_key_path' => $this->policyKeyPath]);
        if (getenv('POS_TEST_DB') === 'mysql') {
            config(['database.default' => 'mysql', 'database.connections.mysql.host' => getenv('DB_HOST') ?: '127.0.0.1',
                'database.connections.mysql.port' => getenv('DB_PORT') ?: 3306,
                'database.connections.mysql.database' => getenv('DB_DATABASE') ?: 'rewashop_pos_test',
                'database.connections.mysql.username' => getenv('DB_USERNAME') ?: 'root',
                'database.connections.mysql.password' => getenv('DB_PASSWORD') ?: '',
                'database.connections.mysql.unix_socket' => '']);
        } else {
            config(['database.default' => 'sqlite', 'database.connections.sqlite.database' => ':memory:']);
        }
        DB::purge();
        // This suite owns a disposable test database, never a production schema.
        if (config('database.default') === 'mysql' && !str_contains(config('database.connections.mysql.database'), 'test')) {
            throw new \RuntimeException('POS integration tests require a database name containing test.');
        }
        if (config('database.default') === 'mysql') {
            // Unique schemas also permit concurrent CI jobs and avoid repeated
            // create/drop of identical InnoDB tablespace paths on overlay filesystems.
            $this->mysqlDatabase = 'rewashop_pos_test_'.strtolower(Str::random(12));
            DB::statement('CREATE DATABASE `'.$this->mysqlDatabase.'`');
            config(['database.connections.mysql.database' => $this->mysqlDatabase]); DB::purge();
        }
        Schema::dropAllTables();
        $this->legacySchema();
        (require database_path('migrations/2026_10_12_000000_create_shared_pos_backend.php'))->up();
        (require database_path('migrations/2026_10_12_000001_add_pos_catalog_indexes.php'))->up();
        (require database_path('migrations/2026_10_12_000002_create_pos_web_drafts.php'))->up();
        (require database_path('migrations/2026_10_12_000003_add_pos_defaults.php'))->up();
        $this->seedStore(1, 'admin'); $this->seedStore(2, 'seller'); $this->seedStore(3, 'seller');
        $this->stock(11, 101, 1, 'admin', 20, '100.00', '00101');
        $this->stock(22, 202, 2, 'seller', 20, '100.00', '00202');
        $this->stock(33, 303, 3, 'seller', 20, '100.00', '00303');
    }

    protected function tearDown(): void
    {
        if ($this->mysqlDatabase) {
            DB::purge();
            config(['database.connections.mysql.database' => getenv('DB_DATABASE') ?: 'rewashop_pos_test']);
            DB::statement('DROP DATABASE IF EXISTS `'.$this->mysqlDatabase.'`'); DB::purge();
        }
        if (isset($this->policyKeyPath) && is_file($this->policyKeyPath)) { unlink($this->policyKeyPath); }
        parent::tearDown();
    }

    private function legacySchema(): void
    {
        Schema::create('users', function (Blueprint $t) {
            $t->increments('id'); $t->string('name'); $t->string('email')->nullable();
            $t->string('user_type'); $t->string('password')->nullable(); $t->boolean('banned')->default(false);
            $t->timestamp('email_verified_at')->nullable(); $t->string('remember_token')->nullable(); $t->timestamps();
        });
        Schema::create('shops', function (Blueprint $t) {
            $t->increments('id'); $t->unsignedInteger('user_id'); $t->string('name');
            $t->boolean('verification_status')->default(true); $t->timestamps();
        });
        Schema::create('products', function (Blueprint $t) {
            $t->increments('id'); $t->string('name'); $t->string('added_by'); $t->integer('user_id');
            $t->integer('category_id')->default(1); $t->integer('brand_id')->nullable();
            $t->integer('thumbnail_img')->nullable(); $t->string('unit')->default('piece');
            $t->decimal('unit_price', 20, 2)->default(100); $t->decimal('discount', 20, 2)->default(0);
            $t->string('discount_type')->default('amount'); $t->integer('discount_start_date')->nullable();
            $t->integer('discount_end_date')->nullable(); $t->decimal('gst_rate', 20, 2)->default(0);
            $t->boolean('published')->default(true); $t->boolean('approved')->default(true); $t->boolean('pos')->default(true);
            $t->boolean('digital')->default(false); $t->boolean('auction_product')->default(false);
            $t->boolean('wholesale_product')->default(false);
            $t->integer('num_of_sale')->default(0); $t->boolean('variant_product')->default(false);
            $t->string('barcode')->nullable(); $t->timestamps();
        });
        Schema::create('product_stocks', function (Blueprint $t) {
            $t->increments('id'); $t->integer('product_id'); $t->string('variant')->default('');
            $t->string('sku')->nullable(); $t->decimal('price', 20, 2)->default(0); $t->integer('qty');
            $t->integer('image')->nullable(); $t->timestamps();
        });
        Schema::create('product_taxes', function (Blueprint $t) {
            $t->increments('id'); $t->integer('product_id'); $t->integer('tax_id')->default(1);
            $t->decimal('tax', 20, 2); $t->string('tax_type'); $t->timestamps();
        });
        Schema::create('orders', function (Blueprint $t) {
            $t->increments('id'); $t->integer('user_id')->nullable(); $t->integer('seller_id')->nullable();
            $t->text('shipping_address')->nullable(); $t->string('shipping_type'); $t->string('order_from')->default('web');
            $t->string('delivery_status')->default('pending'); $t->string('payment_type')->nullable();
            $t->string('payment_status')->default('unpaid'); $t->decimal('grand_total', 20, 2)->nullable();
            $t->decimal('coupon_discount', 20, 2)->default(0); $t->text('code')->nullable(); $t->integer('date');
            $t->integer('viewed')->default(0); $t->integer('delivery_viewed')->default(0); $t->integer('payment_status_viewed')->default(0);
            $t->integer('commission_calculated')->default(0); $t->timestamps();
        });
        Schema::create('order_details', function (Blueprint $t) {
            $t->increments('id'); $t->integer('order_id'); $t->integer('seller_id'); $t->integer('product_id');
            $t->text('variation')->nullable(); $t->decimal('price', 20, 2); $t->decimal('tax', 20, 2)->default(0);
            $t->decimal('gst_rate', 20, 2)->default(0); $t->decimal('gst_amount', 20, 2)->default(0);
            $t->decimal('coupon_discount', 20, 2)->default(0); $t->decimal('shipping_cost', 20, 2)->default(0);
            $t->integer('quantity'); $t->string('shipping_type')->nullable(); $t->string('payment_status')->default('unpaid');
            $t->string('delivery_status')->default('pending'); $t->timestamps();
        });
        Schema::create('personal_access_tokens', function (Blueprint $t) {
            $t->id(); $t->morphs('tokenable'); $t->string('name'); $t->string('token', 64)->unique();
            $t->text('abilities'); $t->timestamp('last_used_at')->nullable(); $t->timestamp('expires_at')->nullable(); $t->timestamps();
        });
        Schema::create('addons', function (Blueprint $t) { $t->id(); $t->string('unique_identifier'); $t->boolean('activated');
            $t->string('name')->nullable(); $t->string('version')->nullable(); $t->string('image')->nullable(); $t->string('purchase_code')->nullable(); $t->timestamps(); });
        Schema::create('business_settings', function (Blueprint $t) { $t->id(); $t->string('type'); $t->text('value')->nullable(); });
        Schema::create('languages', function (Blueprint $t) { $t->id(); $t->string('code'); $t->string('name'); $t->boolean('rtl')->default(false); });
        Schema::create('carts', function (Blueprint $t) {
            $t->id(); $t->integer('user_id'); $t->integer('product_id'); $t->string('variation')->default('');
            $t->integer('quantity'); $t->boolean('status')->default(true); $t->timestamps();
        });
        Schema::create('product_translations', function (Blueprint $t) { $t->id(); $t->integer('product_id'); $t->string('lang'); $t->string('name'); });
        Schema::create('uploads', function (Blueprint $t) { $t->id(); });
        DB::table('languages')->insert(['code' => 'en', 'name' => 'English']);
    }

    protected function seedStore(int $id, string $type): void
    {
        DB::table('users')->insert(['id' => $id, 'name' => 'Merchant '.$id, 'user_type' => $type, 'email' => 'merchant'.$id.'@example.test',
            'email_verified_at' => now(), 'created_at' => now(), 'updated_at' => now()]);
        if ($type === 'seller') { DB::table('shops')->insert(['user_id' => $id, 'name' => 'Shop '.$id, 'verification_status' => true]); }
        DB::table('pos_settings')->insert(['seller_id' => $id, 'owner_type' => $type, 'currency' => 'NGN', 'settings' => '{}', 'created_at' => now(), 'updated_at' => now()]);
        $location = DB::table('pos_locations')->insertGetId(['seller_id' => $id, 'code' => 'MAIN', 'name' => 'Main store']);
        DB::table('pos_registers')->insert(['id' => $id, 'seller_id' => $id, 'location_id' => $location, 'code' => 'REG-'.$id, 'name' => 'Register '.$id]);
    }

    protected function stock(int $id, int $product, int $owner, string $type, int $qty, string $price, string $barcode): void
    {
        DB::table('products')->insert(['id' => $product, 'name' => 'Product '.$product, 'added_by' => $type, 'user_id' => $owner, 'barcode' => $barcode]);
        DB::table('product_stocks')->insert(['id' => $id, 'product_id' => $product, 'variant' => '', 'sku' => 'SKU-'.$id, 'price' => $price, 'qty' => $qty]);
    }

    protected function context(int $owner = 1, ?Device $device = null)
    {
        return app(AuthorizationService::class)->context(User::findOrFail($owner), $device);
    }

    protected function shift(int $owner = 1, ?Device $device = null): int
    {
        return app(ShiftService::class)->open($this->context($owner, $device), (string) Str::uuid(),
            ['client_shift_id' => (string) Str::uuid(), 'register_id' => $owner, 'opening_minor' => 50000])['shift_id'];
    }

    protected function saleData(int $owner = 1, ?int $shift = null): array
    {
        return ['client_sale_id' => (string) Str::uuid(), 'register_id' => $owner, 'shift_id' => $shift ?? $this->shift($owner),
            'currency' => 'NGN', 'lines' => [['stock_id' => $owner * 11, 'quantity' => 2]],
            'tenders' => [['method' => 'cash', 'currency' => 'NGN', 'amount_minor' => 20000, 'received_minor' => 30000, 'change_minor' => 10000]]];
    }

    protected function device(int $owner = 1, array $abilities = []): Device
    {
        return Device::create(['id' => (string) Str::uuid(), 'seller_id' => $owner, 'register_id' => $owner, 'cashier_id' => $owner,
            'name' => 'Test terminal', 'abilities' => $abilities ?: config('pos.permissions'), 'offline_allowed' => true,
            'max_reserved_units' => 1000, 'max_offline_sale_minor' => 100000000, 'max_offline_budget_minor' => 100000000]);
    }

    protected function apiToken(Device $device): string
    {
        return $device->createToken('test-device', $device->abilities, now()->addDay())->plainTextToken;
    }

    protected function error(string $code, callable $action): void
    {
        try { $action(); $this->fail('Expected POS error '.$code); }
        catch (\App\Pos\Exceptions\PosException $e) { $this->assertSame($code, $e->errorCode); }
    }
}
