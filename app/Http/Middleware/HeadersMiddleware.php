<?php

namespace App\Http\HeadersMiddleware;

use Closure;

class HeadersMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'self' https://tripin.site; style-src 'self';");
        $response->headers->set('Content-Security-Policy', "script-src 'self' https://app.sandbox.midtrans.com;");
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        $response->headers->set('X-Frame-Options', 'DENY');




        return $response;
    }
}
