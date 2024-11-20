<?php

use Inertia\Inertia;
use App\Http\Middleware\isLogin;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;

// Rute untuk login dan registrasi
route::group(['prefix' => '/', 'middleware' => 'isGuest'], function(){  
    route::get('/', [AuthController::class, 'index'])->name('auth');
    route::post('/login', [AuthController::class, 'login']);
    route::post('/register', [AuthController::class, 'register']);
    route::post('/register/otp/verify', [AuthController::class, 'verify'])->name('otp.verify');
    route::get('/register/otp', function(){
        $email = session('email');
        return Inertia::render('Otp', ['email' => $email]);
    })->name('otp.form');
    route::get('/privacy-policy', function(){
        return Inertia::render('PrivacyPolicy');
    });
    route::get('/terms-condition', function(){
        return Inertia::render('TermsAndCondition');
    });
});

route::post('/logout', [AuthController::class, 'logout']) -> name('logout');

//Rute jika sudah masuk ke aplikasi
route::group(['prefix' => 'home', 'middleware' => 'isLogin'], function(){
    route::get('/home', function(){
        return inertia::render('LandingPage');
    })->name('home');

});




