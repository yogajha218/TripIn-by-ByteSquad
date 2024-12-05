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
            return response()->json(['message' => 'vehicle not found']);
        }

        $validated = $request->validate([
            'seats' => 'required|array|min:1', // Ensure seats is an array
            'seats.*' => 'integer|min:1|max:' . $vehicle->seats,
        ]);

        // Check if the seats are already booked
        $alreadyBookedSeats = SeatBooking::where('vehicle_id', $vehicle->vehicle_id)
            ->where('departure_time', session('setRoute.selectedRoute.departure'))
            ->where('seat_number', json_encode($validated['seats'])) // Ensure JSON format
            ->get()
            ->toArray();

        if (!empty($alreadyBookedSeats)) {
            return response()->json([
                'message' => 'The following seats are already booked: ' . implode(', ', $alreadyBookedSeats),
            ]);
        }

        session([
            'seatNumber' => json_encode($validated['seats']), 
            'seatCount' => $request->seatCount,
            'vehicle' => $vehicle,
        ]);

        Session::forget('schedule_done');
        Session::put('seat_done', true);

        return response()->json(['message' => 'Seats successfully booked']); 
    }
}
