<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\isLogin;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rute untuk login dan registrasi
route::group(['prefix' => '/', 'middleware' => 'isGuest'], function(){  
    route::get('/', [AuthController::class, 'index'])->name('auth');
    route::post('/login', [AuthController::class, 'login']);
    route::post('/register', [AuthController::class, 'register']);

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
    route::get('/', function(){
        return inertia::render('LandingPage');
    })->name('home');

});



