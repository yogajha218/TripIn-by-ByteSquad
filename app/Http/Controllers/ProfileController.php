<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

class ProfileController extends Controller
{

    // Menampilkan halaman profil user
    public function profileIndex(){
        return Inertia::render('Profile/Profile', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'flash' => [
                'success' => session('success'),
            ]
        ]);
    }

    // Menampilkan halaman edit profile
    public function profileEditIndex(){
        $user = Auth::user();
        return Inertia::render('Profile/ProfileEdit',  [
            'email' => $user->email,
            'username' => $user->username,
            'phone_number' => $user->phone_number,
            'gender' => $user->gender,
        ]);
    }

    // Menampilkan halaman edit password baru
    public function profileUpdatePasswordIndex(){
        $user = Auth::user();
        return Inertia::render('Profile/ProfileNewPassword', ['email' => $user->email]);
    }

    // Menampilkan halaman otp
    public function profileOtpPasswordIndex(){
        return Inertia::render('Profile/ProfileOtpVerify');
    }


    // Fungsi untuk memperbarui profile
    public function profileEdit(Request $request)
    {
        $request->validate([
            'username' =>  'required|max:20',
            'phone_number' => 'required|numeric|digits_between:1,15',
            'gender' => 'required',
        ], [
            'phone_number.numeric'=> 'Please enter a number',
            'phone_number.digits_between'=> 'Phone number must be less than 15 digit',
            'username.max' => 'Username must be less than 20 letter',
        ]);

        try{
            $user = User::where('email', Auth::user()->email)->first();
            if(!$user){
                return redirect()->back()->withErrors('User not authenticated');
            } else {
                $user->update([
                    'username' => $request->username,
                    'phone_number' => $request->phone_number,
                    'gender' => $request->gender,
                ]);;

                $user->save();

                return redirect()->route('profile')->with('success', 'Profile updated successfully');
            }

        } catch (\Exception $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    // Fungsi untuk kirim email otp
    public function sendEmailOtp(){
        try {
            $user = Auth::user();

            if (!$user) {
                return redirect()->back()->withErrors('User  not authenticated');
            }

            $otpCode = random_int(1111, 9999);
            Mail::raw("Your OTP code is: $otpCode", function($message) use ($user) {
                $message->to($user->email)->subject('Your OTP Code');
            });

            UserOtp::where('email', $user->email)->delete();
            UserOtp::create([
                'email' => $user->email,
                'otp' => $otpCode,
                'otp_expires_at' => now()->addMinutes(10),
            ]);

            Session::put('otp_initiated', true);
            return redirect()->route('profile.edit.otp');

        } catch (\Exception $e) {
            FacadesLog::info("Error on send otp: " . $e->getMessage());
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    // Fungsi untuk verifikasi otp yang telah dikirim ke email
    public function verifyEmailOtp(Request $request){
        $request->validate([
            'otp' => 'required',
        ]);

        $user = Auth::user();
        $otpRecord = UserOtp::where('email', $user->email)->first();

        if (!$otpRecord) {
            FacadesLog::error('OTP record not found for email: ' . $user->email);
            return response()->json(['message' => 'OTP record not found.'], 404);
        } else if ($request->otp != $otpRecord->otp) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 422);
        }

        $otpRecord->delete();
        Session::forget('otp_initiated');

        return response()->json(['message' => 'OTP verified successfully.']);
    }


    // Fungsi untuk memperbarui password
    public function updatePassword(Request $request) {
        $user = User::where('email', Auth::user()->email)->first(); // Get the authenticated user
        if (!$user) {
            return redirect()->back()->withErrors('User  Not Found');
        }

        $request->validate([
            'password' => [
                'required',
                'min:8',
                'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/',
                function ($attribute, $value, $fail) use ($user) {
                    // Check if the new password is the same as the current password
                    if (Hash::check($value, $user->password)) {
                        $fail('The new password cannot be the same as the old password.');
                    }
                },
            ],
            'confirmPassword' => 'required|same:password',
        ], [
            'password.min' => 'Your password must be at least 8 characters.',
            'password.regex' => 'Password must contain both letters and numbers.',
            'confirmPassword.same' => 'The password confirmation does not match.',
        ]);

        try {
            $user->update([
                'password' => Hash::make($request->password),
            ]);

            return redirect()->route('profile.edit')->with('success', 'Password updated successfully.');
        } catch (\Exception $e) {
            FacadesLog::error('Error updating password: ' . $e->getMessage());
            return redirect()->back()->withErrors('Error Updating Password');
        }
    }
}
