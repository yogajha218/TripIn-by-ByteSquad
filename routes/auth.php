<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Route untuk auth
route::group(['prefix' => '/', 'middleware' => 'isGuest'], function(){
    route::get('/welcome', [AuthController::class, 'welcomeIndex'])->name('welcome');
    route::get('/auth', [AuthController::class, 'authIndex'])->name('auth');
    route::post('/login', [AuthController::class, 'login']);
    route::post('/register', [AuthController::class, 'register']);
    route::get('/register/otp', [AuthController::class, 'otpRegisterIndex'])->name('otp.form')->middleware('check.otp:auth');
    route::post('/register/otp/verify', [AuthController::class, 'verify'])->name('otp.verify');
});

// Rute untuk lupa password
route::group(['prefix' => '/forgot-password'], function(){
    route::get('/', [AuthController::class, 'forgotPasswordIndex'])->name('password.index');
    route::get('/email', [AuthController::class, 'forgotPasswordEmailIndex']);
    route::get('/otp', [AuthController::class, 'otpPasswordIndex'])->name('password.otp')->middleware('check.otp:auth');
    route::post('/otp/send', [AuthController::class, 'sendEmailPassword']);
    route::post('/otp/verify', [AuthController::class, 'verifyEmailPassword'])->name('password.otp.verify');
    route::post('/new-password', [AuthController::class, 'updatePassword']);
});
