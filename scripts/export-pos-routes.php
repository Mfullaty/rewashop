<?php

require __DIR__.'/../vendor/autoload.php';
$app = require __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$out = [];
foreach (app('router')->getRoutes()->getRoutes() as $route) {
    if (str_starts_with($route->uri(), 'api/pos/v1/') || str_starts_with($route->uri(), 'pos/backend/')) {
        $out[] = ['uri' => $route->uri(), 'methods' => $route->methods(), 'action' => $route->getActionMethod(),
            'middleware' => $route->gatherMiddleware(),
            'rules' => array_map(fn ($rules) => array_map(fn ($rule) => (string) $rule,
                is_array($rules) ? $rules : explode('|', $rules)),
                \App\Pos\Support\Schemas::forAction($route->getActionMethod()))];
    }
}
$eventRules = [
    'sale.completed' => \App\Pos\Support\Schemas::sale(true),
    'shift.opened' => \App\Pos\Support\Schemas::shiftOpen(),
    'shift.closed' => \App\Pos\Support\Schemas::shiftClose() + ['client_shift_id' => 'required|uuid'],
    'cash.moved' => \App\Pos\Support\Schemas::cash() + ['client_shift_id' => 'required|uuid'],
    'refund.created' => array_replace(\App\Pos\Support\Schemas::refund(), ['shift_id' => 'prohibited'])
        + ['client_shift_id' => 'required|uuid', 'client_sale_id' => 'required|uuid'],
    'receipt.reprinted' => ['receipt_id' => 'required|integer|min:1', 'reason' => 'required|string|min:3|max:500'],
];
$eventRules = array_map(fn ($rules) => array_map(fn ($rule) => array_map(fn ($r) => (string) $r,
    is_array($rule) ? $rule : explode('|', $rule)), $rules), $eventRules);
echo json_encode(['routes' => $out, 'event_rules' => $eventRules], JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
