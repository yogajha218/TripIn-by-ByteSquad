<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SelectSeatController extends Controller
{
    public function index()
    {
        // Your logic to display the select seat page
        return Inertia::render('SelectSeat');
    }
}
