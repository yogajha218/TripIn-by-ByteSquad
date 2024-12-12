<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\Location;
use App\Models\OnHoldSeat;
use App\Models\SeatBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log as FacadesLog;

class SeatController extends Controller
{
    public function seatCheck(Request $request, $plate)
    {
        $vehicle = Vehicle::where('license_plate', $plate)->first();
        $date = session('bookingData.selectedDay');
        $formattedDate = date('Y-m-d', strtotime($date));

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

        try {
            DB::beginTransaction();

            // Validate incoming seat data
            $validated = $request->validate([
                'seats' => 'required|array|min:1',
                'seats.*' => 'integer|min:1|max:' . $vehicle->seats,
            ]);

            // Implement Redis lock
            $lockKey = 'seat_lock_' . $vehicle->vehicle_id . '_' . $formattedDate;
            $lock = Cache::lock($lockKey, 5); // Lock timeout of 10 seconds

            if ($lock->get()) {
                try {
                    // Check if seats are already booked
                    $alreadyBookedSeats = SeatBooking::where('vehicle_id', $vehicle->vehicle_id)
                        ->where('departure_time', session('setRoute.selectedRoute.departure'))
                        ->where('departure_date', $formattedDate)
                        ->whereIn('seat_number', $validated['seats'])
                        ->pluck('seat_number')
                        ->toArray();

                    if (!empty($alreadyBookedSeats)) {
                        return response()->json([
                            'message' => 'The following seats are already booked: ' . implode(', ', $alreadyBookedSeats),
                        ]);
                    }

                    // Create OnHoldSeat
                    $onHold = OnHoldSeat::create([
                        'route_id' => session('setRoute.selectedRoute.routeId'),
                        'seat_number' => json_encode($validated['seats']),
                    ]);

                    // Store seat numbers and related data in session
                    session([
                        'seatNumber' => json_encode($validated['seats']),
                        'seatCount' => $request->seatCount,
                        'vehicle' => $vehicle,
                        'onHold' => $onHold,
                    ]);

                    Session::put('seat_done', true);
                    DB::commit();

                    return response()->json(['message' => 'Seats successfully booked']);
                } finally {
                    $lock->release(); // Release the lock
                }
            } else {
                return response()->json(['message' => 'System is busy. Please try again.']);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            FacadesLog::info('Error saving Seat : ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while booking seats.']);
        }
    }
}
