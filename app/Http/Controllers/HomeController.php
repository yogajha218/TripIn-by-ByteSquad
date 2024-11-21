<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function homeIndex(){
        $users = User::with('credit')->get();

        return Inertia::render('HomePage', [
            'users' => $users,
        ]);
    }
}
