<?php

namespace Tests\Feature\Pos;

use App\Models\User;
use App\Pos\Services\AuthorizationService;
use App\Pos\Services\CatalogService;
use App\Pos\Services\SalePostingService;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DefaultsAndBrandingTest extends PosTestCase
{
    public function test_legacy_opt_in_is_not_required_but_explicit_exclusion_and_publication_are_enforced(): void
    {
        DB::table('products')->where('id', 101)->update(['pos' => false]);
        $this->assertTrue(app(AuthorizationService::class)->stocks($this->context())->where('s.id', 11)->exists());
        app(CatalogService::class)->stock(11);
        $this->assertDatabaseHas('pos_catalog_entries', ['seller_id' => 1, 'stock_id' => 11]);
        DB::table('products')->where('id', 101)->update(['pos_excluded' => true]);
        app(CatalogService::class)->stock(11);
        $this->assertDatabaseMissing('pos_catalog_entries', ['stock_id' => 11]);
        $this->error('STOCK_NOT_FOUND', fn () => app(SalePostingService::class)->post($this->context(), (string) Str::uuid(), $this->saleData()));
        foreach (['digital', 'auction_product'] as $field) {
            DB::table('products')->where('id', 101)->update(['pos_excluded' => false, $field => true]);
            $this->assertFalse(app(AuthorizationService::class)->stocks($this->context())->where('s.id', 11)->exists());
            DB::table('products')->where('id', 101)->update([$field => false]);
        }
        DB::table('products')->where('id', 101)->update(['published' => false]);
        $this->assertFalse(app(AuthorizationService::class)->stocks($this->context())->where('s.id', 11)->exists());
        DB::table('products')->where('id', 101)->update(['published' => true, 'approved' => false]);
        $this->assertFalse(app(AuthorizationService::class)->stocks($this->context())->where('s.id', 11)->exists());
    }

    public function test_existing_unverified_seller_is_provisioned_once_and_stays_isolated(): void
    {
        DB::table('pos_registers')->where('seller_id', 2)->delete();
        DB::table('pos_locations')->where('seller_id', 2)->delete();
        DB::table('pos_settings')->where('seller_id', 2)->delete();
        DB::table('shops')->where('user_id', 2)->update(['verification_status' => false]);
        $context = $this->context(2); $this->context(2);
        $this->assertSame(1, DB::table('pos_registers')->where('seller_id', 2)->count());
        $this->assertDatabaseHas('pos_catalog_entries', ['seller_id' => 2, 'stock_id' => 22]);
        $this->assertFalse(app(AuthorizationService::class)->stocks($context)->where('s.id', 33)->exists());
        DB::table('business_settings')->insert(['type' => 'pos_sellers_enabled', 'value' => '0']);
        $this->error('SELLER_POS_DISABLED', fn () => $this->context(2));
        $this->context(1);
        DB::table('business_settings')->where('type', 'pos_sellers_enabled')->update(['value' => '1']);
        $this->context(2);
        DB::table('users')->where('id', 2)->update(['banned' => true]);
        $this->error('USER_BLOCKED', fn () => $this->context(2));
    }

    public function test_new_seller_gets_default_register_without_manual_setup(): void
    {
        $user = new User; $user->forceFill(['id' => 8, 'name' => 'New seller', 'user_type' => 'seller', 'banned' => false]); $user->save();
        $this->assertDatabaseHas('pos_settings', ['seller_id' => 8, 'owner_type' => 'seller']);
        $this->assertDatabaseHas('pos_registers', ['seller_id' => 8, 'code' => 'REG-01']);
        $user->save();
        $this->assertSame(1, DB::table('pos_registers')->where('seller_id', 8)->count());
    }

    public function test_only_admin_can_change_global_toggle_and_branding_is_scoped_and_snapshotted(): void
    {
        $this->actingAs(User::find(2))->withHeader('Idempotency-Key', (string) Str::uuid())
            ->putJson('/pos/backend/settings', ['sellers_enabled' => false])->assertForbidden();
        $branding = ['receipt_name' => 'Seller Two Retail', 'receipt_logo_url' => 'https://example.com/store.png',
            'receipt_address' => 'Kano', 'receipt_phone' => '+2348000000000', 'receipt_email' => 'store@example.com',
            'receipt_tax_details' => 'TIN 123', 'receipt_footer' => 'Come again'];
        $this->withHeader('Idempotency-Key', (string) Str::uuid())->putJson('/pos/backend/settings', $branding)->assertOk();
        $this->assertSame('Seller Two Retail', json_decode(DB::table('pos_settings')->where('seller_id', 2)->value('settings'), true)['receipt_name']);
        $this->assertArrayNotHasKey('receipt_name', json_decode(DB::table('pos_settings')->where('seller_id', 3)->value('settings'), true));
        $sale = app(SalePostingService::class)->post($this->context(2), (string) Str::uuid(), $this->saleData(2));
        DB::table('pos_settings')->where('seller_id', 2)->update(['settings' => Payload::json(['receipt_name' => 'Changed store'])]);
        $this->getJson('/pos/backend/receipts/'.$sale['receipt_id'])->assertOk()
            ->assertJsonPath('receipt.store.name', 'Seller Two Retail')->assertJsonPath('receipt.store.footer', 'Come again');
        $this->actingAs(User::find(3))->getJson('/pos/backend/receipts/'.$sale['receipt_id'])->assertNotFound();
        $this->actingAs(User::find(1))->withHeader('Idempotency-Key', (string) Str::uuid())
            ->putJson('/pos/backend/settings', ['sellers_enabled' => false])->assertOk();
        $this->actingAs(User::find(2))->getJson('/pos/backend/bootstrap')->assertForbidden();
    }
}
