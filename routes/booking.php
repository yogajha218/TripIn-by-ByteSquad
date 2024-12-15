<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\MidtransController;
use App\Http\Controllers\SeatController;
use App\Http\Middleware\BookingProgress;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['prefix' => '/booking', 'middleware' => 'isLogin'], function(){
    Route::get('/', [BookingController::class, 'bookingIndex'])->name('booking.index');
    Route::post('/store', [BookingController::class, 'bookingStore'])->name('booking.store');
    Route::get('/destination', [BookingController::class, 'destinationIndex']);
    Route::get('/origin', [BookingController::class, 'originIndex']);
    
    Route::group(['middleware' => 'booking.progress:schedule'], function(){
        Route::get('/bus-schedule', [BookingController::class, 'busScheduleIndex'])->name('schedule');
        Route::post('/route/store', [BookingController::class, 'routeStore'])->name('route.store');
    });

    Route::group(['middleware' => 'booking.progress:seat'], function(){
        Route::get('/seat', [BookingController::class, 'seatIndex'])->name('seat.index');
        Route::post('/seat/store/{vehicle_id}', [SeatController::class, 'seatCheck'])->name('seat.store');
        Route::get('/seat/booked-seat/{plate}', [BookingController::class, 'fetchBookedSeats'])->name('fetch.seat');
    });

    Route::group(['middleware' => 'booking.progress:order'], function(){
        Route::post('/order-detail/store', [BookingController::class, 'storeData'])->name('order.store');
        Route::get('/order-detail', [BookingController::class, 'orderDetailsIndex'])->name('order.index');
    });

    Route::group(['middleware' => 'booking.progress:status'], function(){
        Route::get('/payment-status', [BookingController::class, 'paymentStatusIndex'])->name('order.status');
        Route::post('/order-detail/store/finish', [BookingController::class, 'finishPayment'])->name('order.finish');
    });

});
Route::get('/payment-terms', [BookingController::class, 'paymentTermsIndex']);
Route::get('/order-detail/store/dummy', [BookingController::class, 'dummyIndex'])->name('order.dummy');

