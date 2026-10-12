<?php

use App\Http\Controllers\PosPro\WorkspaceController;
use App\Http\Middleware\PosPro\AddonActive;
use App\Http\Middleware\Pos\EnsurePosEnabled;
use App\Http\Middleware\Pos\WebAuthorization;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', AddonActive::class])->group(function () {
    Route::get('admin/rewa-pos', [WorkspaceController::class, 'admin'])->name('rewa-pos.admin.index');
    Route::get('seller/rewa-pos', [WorkspaceController::class, 'seller'])->name('rewa-pos.seller.index');
    Route::prefix('rewa-pos/web')->name('rewa-pos.web.')
        ->middleware([EnsurePosEnabled::class, WebAuthorization::class, 'throttle:pos'])
        ->controller(WorkspaceController::class)->group(function () {
            Route::get('workspace', 'workspace');
            Route::get('shifts', 'shifts');
            Route::get('staff', 'staff');
            Route::get('products', 'products');
            Route::put('products/{id}', 'productUpdate')->whereNumber('id');
            Route::get('drafts', 'drafts');
            Route::put('drafts/{id}', 'draftSave')->whereUuid('id');
            Route::delete('drafts/{id}', 'draftDelete')->whereUuid('id');
        });
});
