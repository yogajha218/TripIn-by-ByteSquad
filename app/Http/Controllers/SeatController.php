<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\SeatBooking;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log as FacadesLog;
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

        try {
            // Define the criteria for finding an existing record
            $criteria = [
                'vehicle_id' => $vehicle->vehicle_id,
                'location_id' => $location->location_id,
                'departure_time' => session('setRoute.selectedRoute.departure'),
                'departure_date' => $formattedDate,
            ];

            // Check if a record already exists
            $existingBooking = SeatBooking::where($criteria)->first();

            if ($existingBooking) {
                // If it exists, merge the new seats with existing ones
                $existingSeats = $existingBooking->seat_number; // Decode existing seats
                $newSeats = array_merge($existingSeats, $validated['seats']); // Merge new seats
                $existingBooking->seat_number = array_unique($newSeats); // Remove duplicates and encode back to JSON
                $existingBooking->save(); // Save the updated record
            } else {
                // If it doesn't exist, create a new record
                SeatBooking::create(array_merge($criteria, [
                    'seat_number' => $validated['seats'],
                ]));
            }
        } catch (\Exception $e) {
            FacadesLog::info('Error saving seats : ' . $e->getMessage());
        }

        return response()->json(['message' => 'Seats successfully booked']); 
    }
}
