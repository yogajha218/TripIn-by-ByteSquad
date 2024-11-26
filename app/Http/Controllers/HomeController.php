<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HomeController extends Controller
{
    // Menampilkan halaman home
    public function homeIndex(){
        $user = Auth::user();
        
        return Inertia::render('HomePage', [
            'credit' => $user->credit->credit_amount, 
            'username' => $user->username,
            'user_id' => $user->user_id
        ]);
    }

}
