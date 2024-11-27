<?php

namespace App\Http\Controllers;

use App\Mail\OTPMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OTPController extends Controller
{
   // Send OTP after registration
    public function sendOTP(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || $user->is_verified) {
            return redirect()->route('register')->withErrors(['email' => 'Invalid request or user already verified.']);
        }

        // Generate OTP and expiration time
        $otp = rand(100000, 999999);
        $user->otp = $otp;
        $user->otp_expires_at = Carbon::now()->addMinutes(5);
        $user->save();

        // Send OTP email
        Mail::to($user->email)->send(new OTPMail($otp));

        return view('auth.verify-otp', ['email' => $user->email]);
    }

    public function verifyOTP(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|numeric',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || $user->otp !== $request->otp || Carbon::now()->greaterThan($user->otp_expires_at)) {
            return back()->withErrors(['otp' => 'Invalid or expired OTP.']);
        }

        // Mark the user as verified
        $user->is_verified = true;
        $user->otp = null;
        $user->otp_expires_at = null;
        $user->save();

        // Log the user in

        /* Problem Delay */
        Auth::login($user);

        return redirect()->route('home')->with('status', 'Your account has been verified successfully!');
    }
}
