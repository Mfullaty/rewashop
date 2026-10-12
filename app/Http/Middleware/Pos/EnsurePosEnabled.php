<?php

namespace App\Http\Middleware\Pos;

use App\Pos\Exceptions\PosException;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class EnsurePosEnabled
{
    public function handle(Request $request, Closure $next)
    {
        $request->headers->set('Accept', 'application/json');
        if (app()->isDownForMaintenance()) { throw new PosException('MAINTENANCE', 'POS requests are paused during maintenance.', 503); }
        if (!config('pos.enabled') || !Schema::hasTable('pos_settings')) {
            throw new PosException('POS_DISABLED', 'The shared POS backend is not enabled.', 503);
        }
        if (app()->environment('production') && !$request->secure()) {
            throw new PosException('HTTPS_REQUIRED', 'POS credentials and transactions require HTTPS.', 426);
        }
        if (strlen($request->getContent()) > config('pos.max_body_bytes')) {
            throw new PosException('PAYLOAD_TOO_LARGE', 'The POS request exceeds the body limit.', 413);
        }
        if (env('DEMO_MODE') === 'On' && !$request->isMethod('GET')) {
            throw new PosException('DEMO_READ_ONLY', 'POS writes are disabled in demo mode.', 403);
        }
        $response = $next($request);
        $response->headers->set('Cache-Control', 'private, no-store');
        return $response;
    }
}
