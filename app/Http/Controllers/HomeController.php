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

    public function sendEmail(Request $request){
        $validator = Validator::make(request()->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::where('email', '=', $request->email)->first();

        try{
            if(!$user){
                $otpCode = rand(1000, 9999);

                Mail::raw("Your OTP code is : $otpCode", function($message) use ($request){
                    $message->to($request->email) -> subject('Your OTP Code');
                });

                UserOtp::Create([
                    'email' => $request->email,
                    'otp' => $otpCode,
                    'otp_expires_at' => now()->addMinutes(10),
                ]);

                // session(['email' => $request->email]);

                return redirect();
            } else {
                return redirect()->back()->withErrors(['email' => 'Email does not found']);
            }
        } catch (\Exception $e) {
            FacadesLog::error('Error while sending email: ' . $e->getMessage());
            return redirect()->back()->withErrors(['email' => 'Email does not found']);
        }
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
