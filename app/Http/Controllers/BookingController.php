<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log as FacadesLog;
use Inertia\Inertia;

class BookingController extends Controller
{
    // Menampilkan halaman Detail Order
    public function OrderDetailsIndex(){
        return Inertia::render('Booking/OrderDetails');
    }

    public function seatIndex(){
        $vehicle = Vehicle::where('vehicle_id', 1)->first();
        return Inertia::render('Booking/SelectSeat', ['plate' => $vehicle->license_plate]);
    }

    public function paymentStatusIndex(){
        return Inertia::render('Booking/PaymentStatus');
    }

    public function seatStore(Request $request, $vehicleId){
        $vehicle = Vehicle::where('vehicle_id', $vehicleId)->first();
        FacadesLog::info('Plate : ' . $vehicle->license_plate);
        FacadesLog::info('Total Seats : ' . $vehicle->seats);
        FacadesLog::info('seats received : ' . json_encode($request->input('seats')));
        FacadesLog::info('Request Data: ' . json_encode($request->all()));

        $validated = $request->validate([
            'seats' => 'required|array|min:1',
            'seats.*' => 'integer|min:1|max:' . $vehicle->seats,
        ]);
            
            // Log validated data
        FacadesLog::info('Validated : ' . json_encode($validated));

        $bookedSeats = $vehicle->booked_seats ?? [];

        foreach($validated as $seat){
            if(in_array($seat, $bookedSeats)){
                return response()->json(['message' => "Seat {$seat} is already booked"], 400);
            }
        }

        $vehicle->booked_seats = array_merge($bookedSeats, $validated['seats']);
        $vehicle->save();

        return response()->json(['message' => 'Seats successfully booked']);
    }
}
