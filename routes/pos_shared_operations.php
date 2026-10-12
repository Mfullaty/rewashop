<?php

use App\Http\Controllers\Api\Pos\V1\PosController;
use Illuminate\Support\Facades\Route;

Route::controller(PosController::class)->group(function () {
    Route::get('capabilities', 'capabilities');
    Route::get('bootstrap', 'bootstrap');
    Route::get('catalog/search', 'search');
    Route::get('catalog/snapshot', 'snapshot');
    Route::get('catalog/changes', 'changes');
    Route::get('sales', 'sales');
    Route::post('sales', 'sale')->name('sale');
    Route::get('sales/{id}', 'saleShow')->whereNumber('id');
    Route::post('sales/{id}/returns', 'refund')->whereNumber('id');
    Route::post('sales/{id}/void', 'void')->whereNumber('id');
    Route::post('tenders/{id}/verify', 'verifyTender')->whereNumber('id');
    Route::post('refunds/{id}/verify', 'verifyRefund')->whereNumber('id');
    Route::get('receipts/{id}', 'receipt')->whereNumber('id');
    Route::post('receipts/{id}/reprint', 'reprint')->whereNumber('id');
    Route::post('shifts/open', 'shiftOpen');
    Route::post('shifts/{id}/close', 'shiftClose')->whereNumber('id');
    Route::post('shifts/{id}/cash', 'cash')->whereNumber('id');
    Route::get('registers', 'registers');
    Route::get('reports/summary', 'report');
});
