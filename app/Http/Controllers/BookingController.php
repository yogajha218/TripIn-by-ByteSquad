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
        $seatLimit = session('bookingData.seatsValue');
        $plate = session('setRoute');

        return Inertia::render('Booking/SelectSeat', ['plate' => $plate, 'seatLimit' => $seatLimit]);
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

    public function busScheduleIndex()
    {
        $city = session('bookingData.cityValue');

        // Fetch locations with associated vehicles and pivot data
        $routes = Location::with(['vehicles' => function($query) {
                $query->withPivot('price', 'route_id', 'departure_time', 'arrival_time'); 
            }])
            ->where('city', $city)
            ->where("name", '!=', session('bookingData.origin'))
            ->get();

       

        // Return the filtered data to the Inertia frontend
        return Inertia::render('Booking/BusSchedule', [
            'booking' => session('bookingData'),
            'routes' => $routes,
        ]);
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
            'selectedRoute' => 'required',
            'selectedRoute.routeId' => 'required',
            'selectedRoute.plate' => 'required'
        ]);

        session(['setRoute' => $route]);
    }

    public function seatStore(Request $request, $plate) {
        // Find the vehicle by its ID
        $vehicle = Vehicle::where('license_plate', $plate)->first();

        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }

        // Log incoming request data for debugging
        FacadesLog::info('Plate : ' . $vehicle->license_plate);
        FacadesLog::info('Total Seats : ' . $vehicle->seats);
        FacadesLog::info('Seats received : ' . json_encode($request->input('seats')));
        FacadesLog::info('Request Data: ' . json_encode($request->all()));

        // Validate the incoming request
        $validated = $request->validate([
            'seats' => 'required|array|min:1',
            'seats.*' => 'integer|min:1|max:' . $vehicle->seats,
        ]);

        // Log validated data
        FacadesLog::info('Validated : ' . json_encode($validated));

        // Get the booked seats from the vehicle
        $bookedSeats = $vehicle->booked_seats ?? [];

        // Check for already booked seats
        $alreadyBookedSeats = array_intersect($validated['seats'], $bookedSeats);

        if (!empty($alreadyBookedSeats)) {
            return response()->json(['message' => 'The following seats are already booked: ' . implode(', ', $alreadyBookedSeats)], 400);
        }

        // If all selected seats are available, proceed to book them
        $vehicle->booked_seats = array_merge($bookedSeats, $validated['seats']);
        $vehicle->save();

        return response()->json(['message' => 'Seats successfully booked']);
    }

    public function fetchBookedSeats($licensePlate) {
        // Find the vehicle by its license plate
        $vehicle = Vehicle::where('license_plate', $licensePlate)->first();

        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found'], 404);
        }

        // Return the booked seats
        return response()->json(['booked_seats' => $vehicle->booked_seats]);
    }
}
