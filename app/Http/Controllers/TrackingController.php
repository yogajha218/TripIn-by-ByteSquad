<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackingController extends Controller
{
    public function trackingIndex(){
        return Inertia::render('Tracking');
    }
}
