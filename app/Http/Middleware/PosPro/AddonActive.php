<?php

namespace App\Http\Middleware\PosPro;

use App\Pos\Exceptions\PosException;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AddonActive
{
    public function handle(Request $request, Closure $next)
    {
        $addon = DB::table('addons')->where('unique_identifier', 'rewa_pos_pro')->where('activated', 1)->first();
        if (!$addon) {
            throw new PosException('ADDON_DISABLED', 'RewaShop POS Pro is not activated.', 404);
        }
        $request->attributes->set('pos_addon_version', $addon->version ?: '1.0');
        if (app()->environment('production') && !$request->secure()) {
            throw new PosException('HTTPS_REQUIRED', 'Open POS Pro over HTTPS.', 426);
        }
        $response = $next($request);
        $response->headers->set('Cache-Control', 'private, no-store');
        return $response;
    }
}
