<?php

namespace Tests\Feature\Pos;

use App\Models\User;
use App\Models\ProductStock;
use App\Pos\Services\CatalogService;
use App\Pos\Services\PairingService;
use App\Pos\Services\SalePostingService;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SecurityAndCatalogTest extends PosTestCase
{
    public function test_enrolled_identity_and_offline_permission_changes_are_rechecked_before_mutation(): void
    {
        $d = $this->device(); $context = $this->context(1, $d);
        $this->error('DEVICE_CASHIER_MISMATCH', fn () => app(\App\Pos\Services\AuthorizationService::class)->context(User::findOrFail(2), $d));
        DB::table('pos_devices')->where('id', $d->id)->update(['offline_allowed' => false]);
        $this->error('PERMISSION_CHANGED', fn () => app(\App\Pos\Services\AllocationService::class)->request($context,
            (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]]));
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 20]);
    }

    public function test_reauthorization_rotates_credentials_without_releasing_reserves(): void
    {
        $d = $this->device(); $oldToken = $this->apiToken($d);
        app(\App\Pos\Services\AllocationService::class)->request($this->context(1, $d), (string) Str::uuid(), ['lines' => [['stock_id' => 11, 'quantity' => 10]]]);
        app(PairingService::class)->revoke($this->context(), (string) Str::uuid(), $d->id, ['reason' => 'Lost credential']);
        $pair = app(PairingService::class)->start(['name' => 'Recovered terminal']);
        app(PairingService::class)->approve($this->context(), (string) Str::uuid(), ['pairing_id' => $pair['pairing_id'], 'register_id' => 1,
            'cashier_id' => 1, 'abilities' => config('pos.permissions'), 'offline_allowed' => true,
            'existing_device_id' => $d->id, 'reauthorization_reason' => 'Recovered the original local outbox safely']);
        $claim = app(PairingService::class)->claim($pair);
        $this->assertSame($d->id, $claim['device_id']);
        $this->withToken($oldToken)->getJson('/api/pos/v1/bootstrap')->assertStatus(401);
        $this->withToken($claim['token'])->getJson('/api/pos/v1/bootstrap')->assertOk();
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 10]);
        $this->assertDatabaseHas('pos_stock_allocations', ['device_id' => $d->id, 'released' => 0]);
    }

    public function test_device_api_requires_bound_bearer_and_ignores_browser_session(): void
    {
        $this->actingAs(User::findOrFail(1))->getJson('/api/pos/v1/bootstrap')->assertStatus(401);
        $buyerToken = User::findOrFail(1)->createToken('ordinary-buyer', ['*'])->plainTextToken;
        $this->withToken($buyerToken)->getJson('/api/pos/v1/bootstrap')->assertStatus(401);
        $d = $this->device(); $response = $this->withToken($this->apiToken($d))->getJson('/api/pos/v1/bootstrap');
        $response->assertOk()->assertJsonPath('seller_id', 1);
        $this->assertFalse($response->headers->has('Set-Cookie'));
    }

    public function test_revoked_and_expired_tokens_are_rejected(): void
    {
        $d = $this->device(); $token = $this->apiToken($d);
        DB::table('pos_device_tokens')->update(['expires_at' => now()->subMinute()]);
        $this->withToken($token)->getJson('/api/pos/v1/bootstrap')->assertStatus(401);
        DB::table('pos_device_tokens')->update(['expires_at' => now()->addDay()]); $d->update(['revoked_at' => now()]);
        $this->withToken($token)->getJson('/api/pos/v1/bootstrap')->assertStatus(401);
    }

    public function test_token_abilities_cannot_escalate_inventory_writes(): void
    {
        $d = $this->device(1, ['pos:catalog:read']);
        $this->withToken($this->apiToken($d))->withHeader('Idempotency-Key', (string) Str::uuid())
            ->postJson('/api/pos/v1/inventory/allocations/request', ['lines' => [['stock_id' => 11, 'quantity' => 1]]])
            ->assertStatus(403)->assertJsonPath('error.code', 'PERMISSION_DENIED');
    }

    public function test_barcode_or_search_never_escapes_owner_or_visibility_scope(): void
    {
        $d = $this->device(2); $this->withToken($this->apiToken($d));
        $this->getJson('/api/pos/v1/catalog/search?q=00303')->assertOk()->assertJsonCount(0, 'data');
        $this->getJson('/api/pos/v1/catalog/search?barcode=00101')->assertOk()->assertJsonCount(0, 'data');
        DB::table('products')->where('id', 202)->update(['published' => false]);
        $this->getJson('/api/pos/v1/catalog/search?barcode=00202')->assertOk()->assertJsonCount(0, 'data');
    }

    public function test_receipt_and_sale_ids_from_other_sellers_are_not_disclosed(): void
    {
        $sale = app(SalePostingService::class)->post($this->context(3), (string) Str::uuid(), $this->saleData(3));
        $d = $this->device(2); $this->withToken($this->apiToken($d));
        $this->getJson('/api/pos/v1/sales/'.$sale['sale_id'])->assertStatus(404);
        $this->getJson('/api/pos/v1/receipts/'.$sale['receipt_id'])->assertStatus(404);
    }

    public function test_forged_owner_and_nonpositive_quantity_are_rejected_before_writes(): void
    {
        $data = $this->saleData(); $d = $this->device(); $this->withToken($this->apiToken($d));
        $data['seller_id'] = 3;
        $this->withHeader('Idempotency-Key', (string) Str::uuid())->postJson('/api/pos/v1/sales', $data)->assertStatus(422);
        unset($data['seller_id']); $data['lines'][0]['quantity'] = 0;
        $this->postJson('/api/pos/v1/sales', $data)->assertStatus(422); $this->assertDatabaseCount('orders', 0);
    }

    public function test_pairing_is_approved_one_time_and_stores_only_hashed_credentials(): void
    {
        $service = app(PairingService::class); $pair = $service->start(['name' => 'New terminal']);
        $pending = $service->claim($pair); $this->assertSame('awaiting_approval', $pending['status']);
        $service->approve($this->context(), (string) Str::uuid(), ['pairing_id' => $pair['pairing_id'], 'register_id' => 1,
            'cashier_id' => 1, 'abilities' => config('pos.abilities'), 'offline_allowed' => false]);
        $claim = $service->claim($pair); $this->assertSame('paired', $claim['status']);
        $this->assertNotSame($pair['pairing_secret'], DB::table('pos_pairings')->value('secret_hash'));
        $this->assertStringNotContainsString($claim['token'], DB::table('pos_device_tokens')->value('token'));
        $this->withToken($claim['token'])->getJson('/api/pos/v1/bootstrap')->assertOk();
        $this->error('PAIRING_UNAVAILABLE', fn () => $service->claim($pair));
    }

    public function test_pairing_cannot_bind_another_sellers_register(): void
    {
        $pair = app(PairingService::class)->start(['name' => 'Forged terminal']);
        $this->error('REGISTER_NOT_FOUND', fn () => app(PairingService::class)->approve($this->context(2), (string) Str::uuid(),
            ['pairing_id' => $pair['pairing_id'], 'register_id' => 3, 'cashier_id' => 2, 'abilities' => ['pos:catalog:read']]));
    }

    public function test_snapshot_pages_are_immutable_and_deltas_resume_at_high_water_mark(): void
    {
        $catalog = app(CatalogService::class); $catalog->stock(11);
        $snapshot = $catalog->snapshot($this->context(), null, 0, 1);
        $this->stock(12, 102, 1, 'admin', 10, '150.00', '00102'); $catalog->stock(12);
        DB::table('product_stocks')->where('id', 11)->update(['qty' => 9]); $catalog->stock(11);
        $page = $catalog->snapshot($this->context(), $snapshot['snapshot_id'], 0, 100);
        $this->assertCount(1, $page['data']); $this->assertSame(20, $page['data'][0]['available_quantity']);
        $changes = $catalog->changes($this->context(), $snapshot['high_water_mark'], 100);
        $this->assertCount(2, $changes['data']); $this->assertSame(9, $changes['data'][1]['payload']['available_quantity']);
    }

    public function test_delisted_catalog_variant_publishes_a_tombstone(): void
    {
        $catalog = app(CatalogService::class); $catalog->stock(11);
        DB::table('products')->where('id', 101)->update(['pos_excluded' => true]); $catalog->stock(11);
        $this->assertDatabaseHas('pos_change_log', ['entity_id' => '11', 'operation' => 'delete']);
        $this->assertDatabaseCount('pos_catalog_entries', 0);
    }

    public function test_stale_stock_save_cannot_overwrite_a_concurrent_checkout(): void
    {
        $stale = ProductStock::findOrFail(11);
        DB::table('product_stocks')->where('id', 11)->update(['qty' => 19]);
        $stale->qty = 25; $this->error('STOCK_CHANGED', fn () => $stale->save());
        $this->assertDatabaseHas('product_stocks', ['id' => 11, 'qty' => 19]);
    }

    public function test_cashier_cannot_discount_refund_or_manage_devices_without_grants(): void
    {
        DB::table('users')->insert(['id' => 4, 'name' => 'Cashier', 'user_type' => 'staff']);
        DB::table('pos_cashier_permissions')->insert(['seller_id' => 1, 'user_id' => 4,
            'abilities' => Payload::json(['pos:sale:write', 'pos:catalog:read']), 'register_ids' => '[1]', 'max_discount_bps' => 0]);
        $c = app(\App\Pos\Services\AuthorizationService::class)->context(User::findOrFail(4));
        $this->error('PERMISSION_DENIED', fn () => $c->require('pos:refund:write'));
        $this->error('PERMISSION_DENIED', fn () => $c->require('pos:device:manage'));
        $this->error('PERMISSION_DENIED', fn () => $c->require('pos:discount:write'));
    }

    public function test_browser_backend_retains_csrf_protection(): void
    {
        $this->app->instance('env', 'local');
        $this->actingAs(User::findOrFail(1))->postJson('/pos/backend/shifts/open',
            ['client_shift_id' => (string) Str::uuid(), 'register_id' => 1, 'opening_minor' => 0])->assertStatus(419);
    }
}
