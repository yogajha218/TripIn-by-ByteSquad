<?php

use Inertia\Inertia;
use App\Http\Middleware\isLogin;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\SelectSeatController;

// Rute untuk logout
route::post('/logout', [AuthController::class, 'logout']) -> name('logout');

// Route untuk auth
route::group(['prefix' => '/', 'middleware' => 'isGuest'], function(){
    route::get('/', [AuthController::class, 'welcomeIndex'])->name('welcome');
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

//Rute jika sudah masuk ke aplikasi
route::group(['prefix' => 'home', 'middleware' => 'isLogin'], function(){
    route::get('/', [HomeController::class, 'homeIndex'])->name('home');

    // Rute group untuk profille
    route::group(['prefix' => 'profile'], function(){
        route::get('/', [ProfileController::class, 'profileIndex'])->name('profile');
        route::get('/edit', [ProfileController::class, 'profileEditIndex'])->name('profile.edit');
        route::post('/edit/send', [ProfileController::class, 'profileEdit'])->name('profile.edit.send');
        route::get('/password/otp', [ProfileController::class, 'profileOtpPasswordIndex'])->name('profile.edit.otp')->middleware('check.otp:profile');
        route::post('/edit/password/otp/send', [ProfileController::class, 'sendEmailOtp'])->name('profile.edit.otp.send');
        route::post('/edit/password/otp/verify', [ProfileController::class, 'verifyEmailOtp'])->name('profile.edit.otp.verify');
        route::get('/edit/password', [ProfileController::class, 'profileUpdatePasswordIndex'])->name('profile.edit.password');
        route::post('/edit/password/send', [ProfileController::class, 'updatePassword'])->name('profile.edit.password.send');
    });
});

route::get('/privacy-policy', [AuthController::class, 'privacyIndex']);
route::get('/terms-condition', [AuthController::class, 'termsIndex']);
route::get('/seat', [SeatController::class, 'seatIndex'])->name('seat.index');
route::post('/seat/store/{vehicle_id}', [SeatController::class, 'seatStore'])->name('seat.store');
route::get('/faq', [ProfileController::class, 'faqIndex']);



