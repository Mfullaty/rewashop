<?php

namespace App\Http\Middleware\Pos;

use Closure;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class ShareErrorsUnlessPosApi extends ShareErrorsFromSession
{
    public function handle($request, Closure $next)
    {
        return $request->is('api/pos/v1/*') ? $next($request) : parent::handle($request, $next);
    }
}
