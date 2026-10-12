<?php

namespace App\Providers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductStock;
use App\Models\ProductTax;
use App\Pos\Services\CatalogService;
use App\Pos\Services\LegacyGuard;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class PosServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        RateLimiter::for('pos-pair', fn (Request $r) => Limit::perMinute(10)->by($r->ip()));
        RateLimiter::for('pos', fn (Request $r) => Limit::perMinute(240)->by(
            $r->attributes->get('pos_context')?->device?->id ?? $r->user()?->id ?? $r->ip()));

        \App\Models\User::saved(function ($user) {
            if ($user->user_type === 'seller') { app(\App\Pos\Services\StoreProvisioningService::class)->ensure($user); }
        });

        Product::saved(fn ($p) => app(CatalogService::class)->ready() ? app(CatalogService::class)->product($p->id) : null);
        ProductStock::saved(fn ($s) => app(CatalogService::class)->ready() ? app(CatalogService::class)->stock($s->id) : null);
        ProductStock::deleted(fn ($s) => app(CatalogService::class)->ready() ? app(CatalogService::class)->stock($s->id) : null);
        ProductTax::saved(fn ($t) => app(CatalogService::class)->ready() ? app(CatalogService::class)->product($t->product_id) : null);
        ProductTax::deleted(fn ($t) => app(CatalogService::class)->ready() ? app(CatalogService::class)->product($t->product_id) : null);
        Order::saving(fn ($o) => app(LegacyGuard::class)->order($o));
        Order::deleting(fn ($o) => app(LegacyGuard::class)->order($o, true));
        OrderDetail::saving(fn ($d) => app(LegacyGuard::class)->detail($d));
        OrderDetail::deleting(fn ($d) => app(LegacyGuard::class)->detail($d, true));
        Product::saving(fn ($p) => app(LegacyGuard::class)->product($p));
        Product::deleting(fn ($p) => app(LegacyGuard::class)->assertProductDeletable((int) $p->id));
        ProductStock::deleting(fn ($s) => app(LegacyGuard::class)->assertStockDeletable((int) $s->id));
    }
}
