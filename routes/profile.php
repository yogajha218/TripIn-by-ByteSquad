<?php

use App\Http\Controllers\BaseController;
use App\Http\Controllers\ProfileController;
use illuminate\Support\Facades\Route;

// Rute group untuk profille
Route::group(['prefix' => 'profile'], function(){
    Route::get('/', [ProfileController::class, 'profileIndex'])->name('profile');
    Route::get('/history', [BaseController::class, 'historyIndex']);
    Route::get('/history/detail', [BaseController::class, 'historyDetailIndex']);
    Route::get('/edit', [ProfileController::class, 'profileEditIndex'])->name('profile.edit');
    Route::post('/edit/send', [ProfileController::class, 'profileEdit'])->name('profile.edit.send');
    Route::get('/password/otp', [ProfileController::class, 'profileOtpPasswordIndex'])->name('profile.edit.otp');
    Route::post('/edit/password/otp/send', [ProfileController::class, 'sendEmailOtp'])->name('profile.edit.otp.send');
    Route::post('/edit/password/otp/verify', [ProfileController::class, 'verifyEmailOtp'])->name('profile.edit.otp.verify');
    Route::get('/edit/password', [ProfileController::class, 'profileUpdatePasswordIndex'])->name('profile.edit.password');
    Route::post('/edit/password/send', [ProfileController::class, 'updatePassword'])->name('profile.edit.password.send');
});