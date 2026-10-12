<?php

namespace App\Http\Middleware\Pos;

use App\Pos\Services\AuthorizationService;
use Closure;
use Illuminate\Http\Request;

class WebAuthorization
{
    public function handle(Request $request, Closure $next)
    {
        $id = $request->input('register_id');
        $request->attributes->set('pos_context', app(AuthorizationService::class)
            ->context($request->user(), null, is_numeric($id) ? (int) $id : null));
        return $next($request);
    }
}
