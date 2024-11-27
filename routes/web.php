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

route::get('/faq', [ProfileController::class, 'faqIndex']);
route::get('/privacy-policy', [AuthController::class, 'privacyIndex']);
route::get('/terms-condition', [AuthController::class, 'termsIndex']);

route::get('/seat', [SeatController::class, 'seatIndex'])->name('seat.index');
route::post('/seat/store/{vehicle_id}', [SeatController::class, 'seatStore'])->name('seat.store');

// Rute untuk logout
route::post('/logout', [AuthController::class, 'logout']) -> name('logout');






