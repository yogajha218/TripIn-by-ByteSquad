<?php

use App\Http\Middleware\BookingProgress;
use App\Http\Middleware\checkOtpAccess;
use App\Http\Middleware\isLogin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('web')
                ->group(__DIR__.'/../routes/auth.php');

            Route::middleware('web')
                ->group(__DIR__.'/../routes/profile.php');

            Route::middleware('web')
                ->group(__DIR__.'/../routes/home.php');

            Route::middleware('web')
                ->group(__DIR__.'/../routes/booking.php');
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'isLogin' => App\Http\Middleware\isLogin::class, // Untuk cek apakah user login atau tidak saat auth
            'isGuest' => App\Http\Middleware\isGuest::class, // Untuk cek apakah user sudah login saat di home
            'check.otp' => checkOtpAccess::class, // Untuk cek apakah user sudah mengirim email otp
            'booking.progress' => BookingProgress::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
