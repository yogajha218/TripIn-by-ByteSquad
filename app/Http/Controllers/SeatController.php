<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\SeatBooking;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SeatController extends Controller
{
        public function seatCheck(Request $request, $plate)
    {
        $vehicle = Vehicle::where('license_plate', $plate)->first();
        $date = session('bookingData.selectedDay');
        $formattedDate = date('Y-m-d', strtotime($date)); // Format to Y-m-d if necessary

        try {
            $location = Location::whereHas('vehicles', function ($query) {
                $query->where('route_id', session('setRoute.selectedRoute.routeId'));
            })->first();
        } catch (\Exception $e) {
            FacadesLog::info('Error fetching location : ' . $e->getMessage());
        }

        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found']);
        }

        // Validate incoming seat data
        $validated = $request->validate([
            'seats' => 'required|array|min:1', // Ensure seats is an array
            'seats.*' => 'integer|min:1|max:' . $vehicle->seats, // Ensure seat numbers are within valid range
        ]);

        // Check if the seats are already booked using whereIn if seat_number is an array field
        $alreadyBookedSeats = SeatBooking::where('vehicle_id', $vehicle->vehicle_id)
            ->where('departure_time', session('setRoute.selectedRoute.departure'))
            ->whereRaw('seat_number::jsonb @> ?::jsonb', [json_encode($validated['seats'])])
            ->get()
            ->toArray();
        if (!empty($alreadyBookedSeats)) {
            return response()->json([
                'message' => 'The following seats are already booked: ' . implode(', ', $alreadyBookedSeats),
            ]);
        }

        // Store seat numbers and related data in session
        session([
            'seatNumber' => json_encode($validated['seats']), // Store selected seats in JSON format
            'seatCount' => $request->seatCount,
            'vehicle' => $vehicle,
        ]);

        // Clear and set appropriate session flags
        Session::forget('schedule_done');
        Session::put('seat_done', true);

        return response()->json(['message' => 'Seats successfully booked']);
    }

}
