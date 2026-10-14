<?php

use App\Http\Controllers\Api\Pos\V1\PosController;
use App\Http\Middleware\Pos\DeviceAuthentication;
use App\Http\Middleware\Pos\EnsurePosEnabled;
use Illuminate\Support\Facades\Route;

Route::get('receipts/verify/{token}', [\App\Http\Controllers\Api\Pos\V1\ReceiptVerificationController::class,'__invoke'])->where('token','[A-Za-z0-9_-]{43}')->middleware('throttle:pos-receipt-verification');

Route::get('receipts/check/{key}',[\App\Http\Controllers\Api\Pos\V1\ReceiptVerificationController::class,'signed'])->where('key','[a-f0-9]{32}')->middleware('throttle:pos-receipt-verification');
Route::get('health', [PosController::class, 'health']);
Route::middleware([EnsurePosEnabled::class, 'throttle:pos-pair'])->controller(PosController::class)->group(function () {
    Route::post('devices/pair/start', 'pairStart');
    Route::post('devices/pair/confirm', 'pairConfirm');
});
Route::middleware([EnsurePosEnabled::class, DeviceAuthentication::class, 'throttle:pos'])->group(function () {
    require __DIR__.'/pos_shared_operations.php';
    Route::controller(PosController::class)->group(function () {
        Route::post('devices/receipt-key','receiptKey');
        Route::get('inventory/allocations', 'allocations');
        Route::post('inventory/allocations/request', 'allocate');
        Route::post('inventory/allocations/reconcile', 'reconcile');
        Route::post('sync/push', 'push');
        Route::get('sync/status', 'status');
        Route::get('sync/pull', 'pull');
    });
});
