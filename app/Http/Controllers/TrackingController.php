<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrackingController extends Controller
{
    public function trackingIndex()
    {
        $user = Auth::user();

        $routes = Booking::with([
            "trips.schedule.location",
            "trips.schedule.vehicle",
        ])
        ->where("user_id", $user->user_id)
        ->whereHas("trips", function ($query) {
            $query->where("selected_day", Carbon::today());
        })
        ->whereHas("trips.schedule", function ($query) {
            $currentTime = now()->format("H:i:s");
            $query->where("departure_time", "<=", $currentTime)
                ->where("arrival_time", ">=", $currentTime);
        })
        ->first(); // Use get() to retrieve all matching records

        return Inertia::render("Tracking", ["routes" => $routes]);
    }
}
