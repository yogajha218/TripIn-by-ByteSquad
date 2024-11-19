<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

use function Illuminate\Log\log;

class AuthController extends Controller
{
    public function index(){
        return Inertia::render('LoginPage');
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            FacadesLog::info("Validation failed", $validator->errors()->toArray()); // Log validation errors
            return redirect()->back()->withErrors($validator)->withInput();
        }

        try{
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),       
            ]);

            return Inertia::render("LoginPage");
        } catch (\Exception $e){
            FacadesLog::error("Error creating user: " . $e->getMessage());
            return redirect()->back()->withErrors(['email' => 'Failed to create user.'])->withInput();
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
