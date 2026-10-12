<?php

use App\Http\Controllers\Api\Pos\V1\PosController;
use App\Http\Middleware\Pos\EnsurePosEnabled;
use App\Http\Middleware\Pos\WebAuthorization;
use Illuminate\Support\Facades\Route;

Route::prefix('pos/backend')->name('pos.backend.')->middleware([EnsurePosEnabled::class, 'auth', WebAuthorization::class, 'throttle:pos'])->group(function () {
    require __DIR__.'/pos_shared_operations.php';
    Route::controller(PosController::class)->group(function () {
        Route::post('devices/pair/approve', 'pairApprove');
        Route::get('devices', 'devices');
        Route::post('devices/{id}/revoke', 'revoke')->whereUuid('id');
        Route::post('registers', 'registerCreate');
        Route::put('staff', 'staff');
        Route::put('settings', 'settingsUpdate');
        Route::post('inventory/adjustments', 'adjust');
    });
});
