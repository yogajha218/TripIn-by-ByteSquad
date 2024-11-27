<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


route::group(['prefix' => '/', 'middleware' => 'isGuest'], function(){
    route::get('/', [AuthController::class, 'welcomeIndex'])->name('welcome');
    route::get('/auth', [AuthController::class, 'authIndex'])->name('auth');
    route::post('/login', [AuthController::class, 'login']);
    route::post('/register', [AuthController::class, 'register']);
    route::get('/register/otp', [AuthController::class, 'otpRegisterIndex'])->name('otp.form')->middleware('check.otp:auth');
    route::post('/register/otp/verify', [AuthController::class, 'verify'])->name('otp.verify');
});
