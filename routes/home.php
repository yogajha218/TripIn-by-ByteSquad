<?php

use illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TrackingController;
use App\Http\Controllers\NotificationController;

//Rute jika sudah masuk ke aplikasi
Route::group(['prefix' => 'home', 'middleware' => 'isLogin'], function(){
    Route::get('/', [HomeController::class, 'homeIndex'])->name('home');
});

Route::get('/ticket', [HomeController::class, 'ticketIndex']);
Route::get('/ticket/{ticket_id}/boarding-ticket', [HomeController::class, 'boardingTicketIndex'])->name('boarding');
Route::get('/notifications', [HomeController::class, 'notificationIndex'])->name('notification');
Route::post('/notifications/read', [NotificationController::class, 'markAllAsRead']);
Route::get('/tracking', [TrackingController::class, 'trackingIndex']);
