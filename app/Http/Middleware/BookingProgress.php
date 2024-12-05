<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class BookingProgress
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $step): Response
    {
        if ($step === 'schedule' && !Session::has('booking_done')) {
            return redirect()->route('booking.index');
        }

        if ($step === 'seat' && !Session::has('schedule_done')) {
            return redirect()->route('schedule');
        }

        if ($step === 'order' && !Session::has('seat_done')) {
            return redirect()->route('seat.index');
        }

        if ($step === 'status' && !Session::has('order_done')) {
            return redirect()->route('order.index');
        }
  
        return $next($request);
    }
}
