<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Location;
use App\Models\Schedule;
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
        $seatLimit = session('bookingData.seatsValue');
        return Inertia::render('Booking/SelectSeat', ['plate' => $vehicle->license_plate, 'seatLimit' => $seatLimit]);
    }

    public function paymentStatusIndex(){
        return Inertia::render('Booking/PaymentStatus');
    }

    public function paymentTermsIndex(){
        return Inertia::render('Booking/PaymentTerms');
    }

    public function boardingTicketIndex(){
        return Inertia::render('Booking/BoardingTicket');
    }

    public function busScheduleIndex(){
        $city = session('bookingData.cityValue');
        $routes = Location::with(['vehicles' => function($query) {
            $query->withPivot('price', 'route_id');  // Make sure to load the pivot data (price)
        }])->where("city", $city)->get();     
        
        return Inertia::render('Booking/BusSchedule', ['booking' => session('bookingData'), 'routes' => $routes]);
    }

    public function destinationIndex(){
        return Inertia::render('Booking/Destination');
    }

    public function bookingIndex(){
        $location = Location::all();
        $driver = Driver::where('driver_id', 1)->with('vehicle')->first();
        $routes = Vehicle::with('locations')->where('vehicle_id', 1)->first();
        
        return Inertia::render('Booking/Booking', ['location' => $location, 'driver' => $driver, 'routes' => $routes]);
    }

    public function originIndex(){

        return Inertia::render('Booking/Origin');
    }

    public function bookingStore(Request $request){
        $bookingData = $request->validate([
            'cityValue' => 'required',
            'origin' => 'required',
            'selectedDay' => 'required',
            'seatsValue' => 'required'
        ]);

        session(['bookingData' => $bookingData]);
    }

    public function routeStore(Request $request){
        $route = $request->validate([
            'selectedRoute' => 'required'
        ]);

        session(['setRoute' => $route]);
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
