<?php

use App\Http\Controllers\ProfileController;
use illuminate\Support\Facades\Route;

// Rute group untuk profille
route::group(['prefix' => 'profile'], function(){
    route::get('/', [ProfileController::class, 'profileIndex'])->name('profile');
    route::get('/edit', [ProfileController::class, 'profileEditIndex'])->name('profile.edit');
    route::post('/edit/send', [ProfileController::class, 'profileEdit'])->name('profile.edit.send');
    route::get('/password/otp', [ProfileController::class, 'profileOtpPasswordIndex'])->name('profile.edit.otp');
    route::post('/edit/password/otp/send', [ProfileController::class, 'sendEmailOtp'])->name('profile.edit.otp.send');
    route::post('/edit/password/otp/verify', [ProfileController::class, 'verifyEmailOtp'])->name('profile.edit.otp.verify');
    route::get('/edit/password', [ProfileController::class, 'profileUpdatePasswordIndex'])->name('profile.edit.password');
    route::post('/edit/password/send', [ProfileController::class, 'updatePassword'])->name('profile.edit.password.send');
});