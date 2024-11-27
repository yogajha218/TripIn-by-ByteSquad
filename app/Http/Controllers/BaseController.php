<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        return Inertia::render('Profile/History');
    }

    // Menampilkan halaman detail history
    public function historyDetailIndex(){
        return Inertia::render('Profile/HistoryDetail');
    }

    // Menampilkan halaman notifikasi
    public function notificationIndex(){
        return Inertia::render('Notification');
    }
}
