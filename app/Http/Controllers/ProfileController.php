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
use Inertia\Response;

class ProfileController extends Controller
{    

    public function profileIndex(){
        return Inertia::render('ProfilePage');
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

    public function profileEdit(Request $request)
    {
        $request->validate([
            'username' =>  'required',
            'phone_number' => 'required',
            'gender' => 'required',
        ]);
        
        try{
            $user = User::where('email', Auth::user()->email);
            if(!$user){
                return redirect()->back()->withErrors('User not authenticated');
            } else {
                $user->update([
                    'username' => $request->username,
                    'phone_number' => $request->phone_number,
                    'gender' => $request->gender,
                ]);;

                $user->save();

                return redirect()->back()->with('success', 'succesfully updating the data');
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
}
