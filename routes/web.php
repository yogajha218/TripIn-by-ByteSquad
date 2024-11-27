<?php

use Inertia\Inertia;
use App\Http\Middleware\isLogin;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SelectSeatController;
use App\Http\Controllers\TrackingController;

Route::get('/', function(){
    return redirect('/welcome');
});
Route::get('/faq', [BaseController::class, 'faqIndex']);
Route::get('/privacy-policy', [BaseController::class, 'privacyIndex']);
Route::get('/terms-condition', [BaseController::class, 'termsIndex']);
Route::get('/tracking', [TrackingController::class, 'trackingIndex']);
Route::get('/notification', [BaseController::class, 'notificationIndex']);



// Rute untuk logout
Route::post('/logout', [AuthController::class, 'logout']) -> name('logout');






