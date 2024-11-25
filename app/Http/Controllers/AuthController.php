<?php

namespace App\Http\Controllers;

use App\Models\Credit;
use App\Models\Log;
use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Database\QueryException;

use function Illuminate\Log\log;

class AuthController extends Controller
{
    public function welcomeIndex(){
        return Inertia::render('LandingPage');
    }

    public function authIndex(){
        return Inertia::render('LoginPage');
    }

    public function forgotPasswordEmailIndex(){
        return Inertia::render('ForgotPass_Email');
    }

    public function forgotPasswordIndex(){
        $email = session('email');
        return Inertia::render('ForgotPass_NewPass', ['email' => $email]);
    }
    public function otpPasswordIndex(Request $request){
        $email = session('email');
        return Inertia::render('OtpPassword', ['email' => $email]);
    }
    public function otpRegisterIndex(){
        $email = session('email');
        return Inertia::render('Otp', ['email' => $email]);
    }

    public function privacyIndex(){
        return Inertia::render('PrivacyPolicy');
    }

    public function termsIndex(){
        return Inertia::render('TermsAndCondition');
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/',
            'confirmPassword' => 'required|same:password',
        ], [
            'email.unique' => 'Email is already Taken.',
            'password.min' => 'Your password must be at least 8 characters.',
            'password.regex' => 'Password must contain both letters and numbers.',
            'confirmPassword.same' => 'The password confirmation does not match.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::where('email', '=', $request->email)->first();

        try{
            if(!$user){
                if($userOtp = UserOtp::where('email', $request->email)){
                    $userOtp->delete();
                }
                $otpCode = rand(1000, 9999);

                Mail::raw("Your OTP code is : $otpCode", function($message) use ($request){
                    $message->to($request->email) -> subject('Your OTP Code');
                });

                UserOtp::Create([
                    'email' => $request->email,
                    'otp' => $otpCode,
                    'otp_expires_at' => now()->addMinutes(10),
                ]);

                session(['temp_password' => $request->password]);

                return redirect()->route('otp.form')->with('email', $request->email);

            }else{
                return redirect()->back()->withErrors(['emailTaken' => 'Email is already taken']);
            }

        } catch (\Exception $e){
            FacadesLog::error("Error creating OTP: " . $e->getMessage());
            return redirect()->back()->withErrors(['email' => 'An unexpected error occurred. Please try again later.'])->withInput();
        }
    }

    public function verify(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:4',
        ]);

        $otpRecord = UserOtp::where('email', $request->email)->first();

        if (!$otpRecord || $otpRecord->otp != $request->otp || now()->isAfter($otpRecord->otp_expires_at)) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }

        // OTP is valid, create user account
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make(session('temp_password')),
        ]);

        Credit::create([
            'user_id' => $user->user_id,
            'credit_amount' => 0,
        ]);

        // Delete the OTP
        $otpRecord->delete();
        session()->forget('temp_password');

        return redirect()->route('home')->with('success', 'Registration success!');
    }

    public function sendEmailPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'Email does not exist']);
        } else {
            $otpCode = rand(1000, 9999);

            Mail::raw("Your OTP code is : $otpCode", function ($message) use ($request) {
                $message->to($request->email)->subject('Your OTP Code');
            });

            UserOtp::where('email', $request->email)->delete();
            UserOtp::Create([
                'email' => $request->email,
                'otp' => $otpCode,
                'otp_expires_at' => now()->addMinutes(10),
            ]);

            session(['email' => $request->email]);
        
            return redirect()->route('password.otp')->with(['email' => $user->email]);
        }
    }

    public function verifyEmailPassword(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'otp' => 'required',
        ]);

        // Retrieve the OTP record for the email provided in the request
        $otpRecord = UserOtp::where('email', $request->email)->first();

        // Check if the OTP record exists
        if (!$otpRecord) {
            FacadesLog::error('OTP record not found for email: ' . $request->email);
            return response()->json(['message' => 'OTP record not found.'], 404);
        }

        // Check if the provided OTP matches the stored OTP
        if ($request->otp != $otpRecord->otp) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }

        session(['email'=>$request->email]);

        // Optionally delete the OTP record after successful verification
        $otpRecord->delete();

        return redirect()->route('password.index');
    }

    public function updatePassword(Request $request){
        $request->validate([
            'email' => 'required',
            'password' => 'required|min:8|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/',
            'confirmPassword' => 'required|same:password',

        ], [
            'password.min' => 'Your password must be at least 8 characters.',
            'password.regex' => 'Password must contain both letters and numbers.',
            'confirmPassword.same' => 'The password confirmation does not match.',
        ]);

        FacadesLog::info('new pass : ' . $request->password);
        FacadesLog::info('new confirm pass : ' . $request->confirmPassword);

        $user = User::where('email', $request->email)->first();
        if (!$user->exists()) {
            return redirect()->back()->withErrors('User Not Found');
        }

        try{
            $user->update([
                'password' => Hash::make($request->password)
            ]);

            session()->forget('email');

            return redirect()->route('auth');
        }catch (\Exception $e) {
            FacadesLog::error('Error updating password: ' . $e->getMessage());
            return redirect()->back()->withErrors('Error Updating Password');
        }
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ],[
            'email.required' => 'Email wajib diisi',
            'password.required' => 'Password wajib diisi',
        ]);

        try {
            if (Auth::attempt([
                'email' => $request->email,
                'password' => $request->password
            ])) {
                $request->session()->regenerate();

                // Redirect to the desired page
                return redirect()->route('home');
            }
                // If authentication fails, return back with an error
                return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
                ])->onlyInput('email');

        } catch (\Exception $e) {
            // Log the exception message for debugging
            FacadesLog::error("Login attempt failed: " . $e->getMessage());

            // Return back with a generic error message
            return back()->withErrors([
                    'email' => 'An error occurred while trying to log you in. Please try again later.',
            ])->onlyInput('email');
        }
    }
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth')->with('success', 'Logged out successfully!');
    }
}


