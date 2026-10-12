<?php

namespace App\Http\Middleware\Pos;

use Closure;
use Illuminate\Session\Middleware\StartSession;

class StartSessionUnlessPosApi extends StartSession
{
    public function handle($request, Closure $next)
    {
        return $request->is('api/pos/v1/*') ? $next($request) : parent::handle($request, $next);
    }
}
