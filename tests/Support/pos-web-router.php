<?php
// Run only through the loopback-bound test server described in web-validation.md.
if (!in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true)) { http_response_code(403); exit; }
$root = dirname(__DIR__, 2);
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$assetPath = $root.'/public'.preg_replace('~^/public/~', '/', $path);
if ($path !== '/' && is_file($assetPath) && !str_contains($path, '..') && preg_match('/\.(js|css|svg|png|jpg|webp)$/', $path, $match)) {
    header('Content-Type: '.(['js'=>'text/javascript','css'=>'text/css','svg'=>'image/svg+xml','png'=>'image/png','jpg'=>'image/jpeg','webp'=>'image/webp'][$match[1]]));
    readfile($assetPath); exit;
}
foreach (['APP_ENV'=>'testing', 'APP_DEBUG'=>'false', 'APP_KEY'=>'base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
    'APP_URL'=>'http://127.0.0.1:8123', 'DB_CONNECTION'=>'sqlite', 'DB_DATABASE'=>sys_get_temp_dir().'/rewashop-pos-web-test.sqlite',
    'POS_ENABLED'=>'true', 'POS_OFFLINE_ENABLED'=>'false', 'POS_POLICY_KEY_PATH'=>sys_get_temp_dir().'/rewashop-pos-web-test.key',
    'SESSION_DRIVER'=>'file', 'CACHE_DRIVER'=>'array', 'QUEUE_CONNECTION'=>'sync', 'DEMO_MODE'=>'Off'] as $key=>$value) {putenv($key.'='.$value);$_ENV[$key]=$value;}
require $root.'/vendor/autoload.php';
$app = require $root.'/bootstrap/app.php';
$request = Illuminate\Http\Request::capture();
$app->instance('request', $request);
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class); $kernel->bootstrap();
config(['pos.signing_key_path' => sys_get_temp_dir().'/rewashop-pos-web-test.key']);
Illuminate\Support\Facades\Route::middleware('web')->get('/__pos_test/login/{id}', function (int $id) {
    abort_unless(in_array($id,[1,2,3],true),404);
    Illuminate\Support\Facades\Auth::loginUsingId($id); request()->session()->regenerate();
    return redirect($id===1?'/admin/rewa-pos':'/seller/rewa-pos');
});
$response = $kernel->handle($request);$response->send();$kernel->terminate($request,$response);
