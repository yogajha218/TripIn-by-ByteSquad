<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Inertia\Inertia;

class BaseController extends Controller
{
     // Menampikan halaman Privacy & Policy
    public function privacyIndex(){
        return Inertia::render('PrivacyPolicy');
    }

    // Menampilkan halaman Terms & Condition
    public function termsIndex(){
        return Inertia::render('TermsAndCondition');
    }

    // Menampilkan halaman welcome
    public function welcomeIndex(){
        return Inertia::render('LandingPage');
    }
    
    // Menampilkan halaman FAQ
    public function faqIndex(){
        return Inertia::render('Faq');
    }

    // Menampilkan halaman history
    public function historyIndex(){
        $logs = Log::with('trip.booking', 'trip.schedule')->get();

        return Inertia::render('Profile/History', ['logs' => $logs]);
    }

    // Menampilkan halaman detail history
    public function historyDetailIndex($log_id){
        $log = Log::with('trip.booking', 'trip.schedule.vehicle', 'trip.schedule.location')->where('log_id', $log_id)->first();
        return Inertia::render('Profile/HistoryDetail', ['log' => $log]);
    }

    // Menampilkan halaman notifikasi
    public function notificationIndex(){
        return Inertia::render('Home/Notification');
    }
}
