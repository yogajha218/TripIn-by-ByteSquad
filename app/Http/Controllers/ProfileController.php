<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Mail;
use Inertia\Response;

class ProfileController extends Controller
{

    public function profileIndex(){
        return Inertia::render('ProfilePage', [
            'auth' => [
                'user' => Auth::user(),
            ],
            // Explicitly pass any flash messages
            'flash' => [
                'success' => session('success'),
                // Add other flash message types as needed
            ]
        ]);
    }

    public function profileUpdatePasswordIndex(){
        $user = Auth::user();
        return Inertia::render('EditProfilePassword', ['email' => $user->email]);
    }

    public function faqIndex(){
        return Inertia::render('Faq');
    }

    public function profileEditIndex(){
        $user = Auth::user();
        return Inertia::render('EditProfilePage',  [
            'email' => $user->email,
            'username' => $user->username,
            'phone_number' => $user->phone_number,
            'gender' => $user->gender,
        ]);
    }

    public function profileOtpPasswordIndex(){
        return Inertia::render('OtpProfilePassword');
    }

    public function profileEdit(Request $request)
    {
        $request->validate([
            'username' =>  'required',
            'phone_number' => 'required|numeric',
            'gender' => 'required',
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

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function sendEmailOtp(){
        $user = Auth::user();

        if (!$user) {
            return redirect()->back()->withErrors('User  not authenticated');
        }

        try {
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

            return redirect()->route('profile.edit.otp');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

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

        return response()->json(['message' => 'OTP verified successfully.']);
    }

    public function updatePassword(Request $request){
        $request->validate([
            'password' => 'required|min:8|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/',
            'confirmPassword' => 'required|same:password',

        ], [
            'password.min' => 'Your password must be at least 8 characters.',
            'password.regex' => 'Password must contain both letters and numbers.',
            'confirmPassword.same' => 'The password confirmation does not match.',
        ]);

        $user = User::where('email', Auth::user()->email);
        if (!$user->exists()) {
            return redirect()->back()->withErrors('User Not Found');
        }

        try{
            $user->update([
                'password' => Hash::make($request->password),
            ]);

            return redirect()->route('profile.edit');
        } catch (\Exception $e){
            FacadesLog::error('Error updating password: ' . $e->getMessage());
            return redirect()->back()->withErrors('Error Updating Password');
        }
    }
}
