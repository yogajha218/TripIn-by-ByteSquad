<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\SeatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/order-detail', [BookingController::class, 'orderDetailsIndex']);
Route::get('/payment-status', [BookingController::class, 'paymentStatusIndex']);
Route::get('/payment-terms', [BookingController::class, 'paymentTermsIndex']);
Route::get('/boarding-ticket', [BookingController::class, 'boardingTicketIndex']);
Route::get('/bus-schedule', [BookingController::class, 'busScheduleIndex'])->name('schedule');
Route::get('/destination', [BookingController::class, 'destinationIndex']);
Route::get('/origin', [BookingController::class, 'originIndex']);

Route::get('/seat', [BookingController::class, 'seatIndex'])->name('seat.index');
// Route::post('/seat/store/{vehicle_id}', [BookingController::class, 'seatStore'])->name('seat.store');
Route::post('/seat/store/{vehicle_id}', [SeatController::class, 'seatCheck'])->name('seat.store');
Route::get('/seat/booked-seat/{plate}', [BookingController::class, 'fetchBookedSeats'])->name('fetch.seat');

Route::get('/booking', [BookingController::class, 'bookingIndex']);
Route::post('/booking/store', [BookingController::class, 'bookingStore'])->name('booking.store');
Route::post('/booking/route/store', [BookingController::class, 'routeStore'])->name('route.store');
