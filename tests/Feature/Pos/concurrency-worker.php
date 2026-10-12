<?php

// Separate PHP processes exercise real InnoDB locking, not mocked locks.
require __DIR__.'/../../../vendor/autoload.php';
$app = require __DIR__.'/../../../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
config(['pos.enabled' => true, 'pos.offline_enabled' => true, 'database.default' => 'mysql',
    'database.connections.mysql.host' => getenv('DB_HOST'), 'database.connections.mysql.port' => getenv('DB_PORT'),
    'database.connections.mysql.database' => getenv('DB_DATABASE'), 'database.connections.mysql.username' => getenv('DB_USERNAME'),
    'database.connections.mysql.password' => getenv('DB_PASSWORD'), 'database.connections.mysql.unix_socket' => '']);
\Illuminate\Support\Facades\DB::purge();
$input = json_decode(file_get_contents($argv[1]), true, 512, JSON_THROW_ON_ERROR);
config(['pos.signing_key_path' => $input['signing_key_path']]);
if (!str_starts_with($input['database'], 'rewashop_pos_test_')) { throw new RuntimeException('A disposable POS test schema is required.'); }
config(['database.connections.mysql.database' => $input['database']]);
\Illuminate\Support\Facades\DB::purge();
$user = \App\Models\User::findOrFail($input['owner']);
$device = isset($input['device_id']) ? \App\Models\Pos\Device::findOrFail($input['device_id']) : null;
$context = app(\App\Pos\Services\AuthorizationService::class)->context($user, $device);
try {
    $result = $input['type'] === 'allocation'
        ? app(\App\Pos\Services\AllocationService::class)->request($context, $input['key'], $input['payload'])
        : app(\App\Pos\Services\SalePostingService::class)->post($context, $input['key'], $input['payload']);
    echo json_encode(['success' => true, 'result' => $result], JSON_THROW_ON_ERROR);
} catch (\App\Pos\Exceptions\PosException $e) {
    echo json_encode(['success' => false, 'error_code' => $e->errorCode], JSON_THROW_ON_ERROR);
}
