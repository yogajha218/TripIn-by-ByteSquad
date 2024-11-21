<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function homeIndex(){
        $users = User::with('credit')->get();

        return Inertia::render('HomePage', [
            'users' => $users,
        ]);
    }

    


    public function verifyEmail(Request $request){
        $request->validate([
            'email' => 'required',
            'otp' => 'required',
        ]);

        $otpRecord = UserOtp::where('email', $request->email)->first();

        if (!$otpRecord || $otpRecord->otp != $request->otp || now()->isAfter($otpRecord->otp_expires_at)) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }

        return redirect()->route('forgotPassword'); //ubah ke halaman new password
    }
}
