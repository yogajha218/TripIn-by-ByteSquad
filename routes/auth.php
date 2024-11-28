<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Route;

// Route untuk auth
Route::group(['prefix' => '/', 'middleware' => 'isGuest'], function(){
    Route::get('/welcome', [BaseController::class, 'welcomeIndex'])->name('welcome');
    Route::get('/auth', [AuthController::class, 'authIndex'])->name('auth');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/register/otp', [AuthController::class, 'otpRegisterIndex'])->name('otp.form')->middleware('check.otp:auth');
    Route::post('/register/otp/verify', [AuthController::class, 'verify'])->name('otp.verify');
});

// Rute untuk lupa password
Route::group(['prefix' => '/forgot-password'], function(){
    Route::get('/', [AuthController::class, 'forgotPasswordIndex'])->name('password.index');
    Route::get('/email', [AuthController::class, 'forgotPasswordEmailIndex']);
    Route::get('/otp', [AuthController::class, 'otpPasswordIndex'])->name('password.otp')->middleware('check.otp:auth');
    Route::post('/otp/send', [AuthController::class, 'sendEmailPassword']);
    Route::post('/otp/verify', [AuthController::class, 'verifyEmailPassword'])->name('password.otp.verify');
    Route::post('/new-password', [AuthController::class, 'updatePassword']);
});
