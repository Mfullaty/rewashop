<?php
// Loopback-only disposable integration server. Never deploy this file.
if (!in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true)) { http_response_code(403); exit; }
$root = dirname(__DIR__, 2);
foreach (['APP_ENV'=>'testing', 'APP_DEBUG'=>'false', 'APP_KEY'=>'base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
    'DB_CONNECTION'=>'sqlite', 'DB_DATABASE'=>sys_get_temp_dir().'/rewashop-pos-desktop-test.sqlite',
    'POS_ENABLED'=>'true', 'POS_OFFLINE_ENABLED'=>'true', 'SESSION_DRIVER'=>'file', 'CACHE_DRIVER'=>'array', 'QUEUE_CONNECTION'=>'sync', 'DEMO_MODE'=>'Off'] as $key=>$value) { putenv($key.'='.$value); $_ENV[$key]=$value; }
require $root.'/vendor/autoload.php';
$app = require $root.'/bootstrap/app.php';
$request = Illuminate\Http\Request::capture(); $app->instance('request', $request);
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class); $kernel->bootstrap();
config(['pos.signing_key_path' => sys_get_temp_dir().'/rewashop-pos-desktop-test.key']);
$response = $kernel->handle($request); $response->send(); $kernel->terminate($request, $response);
