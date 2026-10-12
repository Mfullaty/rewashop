<?php

use App\Http\Controllers\Api\Pos\V1\PosController;
use App\Http\Middleware\Pos\DeviceAuthentication;
use App\Http\Middleware\Pos\EnsurePosEnabled;
use Illuminate\Support\Facades\Route;

Route::get('health', [PosController::class, 'health']);
Route::middleware([EnsurePosEnabled::class, 'throttle:pos-pair'])->controller(PosController::class)->group(function () {
    Route::post('devices/pair/start', 'pairStart');
    Route::post('devices/pair/confirm', 'pairConfirm');
});
Route::middleware([EnsurePosEnabled::class, DeviceAuthentication::class, 'throttle:pos'])->group(function () {
    require __DIR__.'/pos_shared_operations.php';
    Route::controller(PosController::class)->group(function () {
        Route::get('inventory/allocations', 'allocations');
        Route::post('inventory/allocations/request', 'allocate');
        Route::post('inventory/allocations/reconcile', 'reconcile');
        Route::post('sync/push', 'push');
        Route::get('sync/status', 'status');
        Route::get('sync/pull', 'pull');
    });
});
