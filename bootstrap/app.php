<?php

use App\Http\Middleware\checkOtpAccess;
use App\Http\Middleware\isLogin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
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
         ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
