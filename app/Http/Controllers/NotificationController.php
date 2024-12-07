<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function notification(){
        $notification = Auth::user()->notifications;

        return Inertia::render('Home/Notification');
    }

    public function markAsRead(Request $request, $id)
    {
        $notification = Auth::user()->notifications->find($id);

        if ($notification) {
            $notification->markAsRead();
        }

        return redirect()->back();
    }
}
