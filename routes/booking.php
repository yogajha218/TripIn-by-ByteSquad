<?php

use App\Http\Controllers\BookingController;
use Illuminate\Support\Facades\Route;

Route::get('/order-detail', [BookingController::class, 'orderDetailsIndex']);
Route::get('/payment-status', [BookingController::class, 'paymentStatusIndex']);

Route::get('/seat', [BookingController::class, 'seatIndex'])->name('seat.index');
Route::post('/seat/store/{vehicle_id}', [BookingController::class, 'seatStore'])->name('seat.store');