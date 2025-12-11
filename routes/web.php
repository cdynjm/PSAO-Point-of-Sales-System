<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\TransactionsController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/scan-barcode', [HomeController::class, 'scanBarcode'])->name('scan.barcode');
Route::post('/checkout-process', [HomeController::class, 'checkoutProcess'])->name('checkout.process');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/items', [ItemsController::class, 'index'])->name('items');
    Route::get('/items/{encrypted_id}', [ItemsController::class, 'viewItem'])->name('items.view');
    Route::post('/items', [ItemsController::class, 'store'])->name('items.store');
    Route::patch('/items', [ItemsController::class, 'update'])->name('items.update');
    Route::delete('/items', [ItemsController::class, 'destroy'])->name('items.destroy');

    Route::get('/transactions', [TransactionsController::class, 'index'])->name('transactions');
    Route::get('/transactions/{encrypted_id}', [TransactionsController::class, 'viewTransaction'])->name('transaction.view');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
