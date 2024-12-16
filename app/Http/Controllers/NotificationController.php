<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log as FacadesLog;

class NotificationController extends Controller
{
    public function notification(){
        $notification = Auth::user()->notifications;

        return Inertia::render('Home/Notification');
    }

    public function markAllAsRead()
    {
        $user = Auth::user();

        try{
            $user->unreadNotifications->markAsRead();
        } catch(\Exception $e){
            FacadesLog::info('Notification Error : ' . $e->getMessage());
        }

        return response()->json(['message' => 'All notification marked as read']);
    }
}
