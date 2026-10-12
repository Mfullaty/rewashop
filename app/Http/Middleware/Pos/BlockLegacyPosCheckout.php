<?php

namespace App\Http\Middleware\Pos;

use App\Pos\Exceptions\PosException;
use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BlockLegacyPosCheckout
{
    public function handle($request, Closure $next)
    {
        if ($request->isMethod('POST') && (config('pos.enabled') ||
            (Schema::hasTable('pos_stock_allocations') && DB::table('pos_stock_allocations')->where('status', 'open')->exists()))) {
            throw new PosException('LEGACY_POS_CHECKOUT_DISABLED', 'Use the shared POS checkout service. The old session checkout cannot safely share reserved inventory.', 409);
        }
        return $next($request);
    }
}
