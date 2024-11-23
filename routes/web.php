<?php

use Inertia\Inertia;
use App\Http\Middleware\isLogin;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;

// Rute untuk login dan registrasi
route::group(['prefix' => '/', 'middleware' => 'isGuest'], function(){
    route::get('/', [AuthController::class, 'welcomeIndex'])->name('welcome');
    route::get('/auth', [AuthController::class, 'authIndex'])->name('auth');
    route::post('/login', [AuthController::class, 'login']);
    route::post('/register', [AuthController::class, 'register']);
    route::get('/register/otp', [AuthController::class, 'otpRegisterIndex'])->name('otp.form');
    route::post('/register/otp/verify', [AuthController::class, 'verify'])->name('otp.verify');
    route::get('/privacy-policy', [AuthController::class, 'privacyIndex']);
    route::get('/terms-condition', [AuthController::class, 'termsIndex']);
});

route::post('/logout', [AuthController::class, 'logout']) -> name('logout');
route::get('/forgot-password', [AuthController::class, 'forgotPasswordIndex'])->name('password.index');
route::get('/forgot-password/email', [AuthController::class, 'forgotPasswordEmailIndex']);
route::get('/forgot-password/otp', [AuthController::class, 'otpPasswordIndex'])->name('password.otp');
route::post('/forgot-password/otp/send', [AuthController::class, 'sendEmailPassword']);
route::post('/forgot-password/otp/verify', [AuthController::class, 'verifyEmailPassword']);
route::post('/forgot-password/new-password', [AuthController::class, 'updateNewPassword']);

//Rute jika sudah masuk ke aplikasi
route::group(['prefix' => 'home', 'middleware' => 'isLogin'], function(){
    route::get('/', [HomeController::class, 'homeIndex'])->name('home');
});




