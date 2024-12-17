<?php

namespace App\Http\Controllers;

use App\Jobs\DeleteNotificationJob;
use App\Jobs\UpdateDayExpired;
use App\Models\Booking;
use App\Models\Driver;
use App\Models\Location;
use App\Models\OnHoldSeat;
use App\Models\Payment;
use App\Models\Schedule;
use App\Models\SeatBooking;
use App\Models\Trip;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Session;
use Midtrans\Config;
use Midtrans\Snap;
use Inertia\Inertia;
use App\Notifications\paymentCompleted;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class BookingController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = env("MIDTRANS_SERVER_KEY");
        Config::$clientKey = env("MIDTRANS_CLIENT_KEY");
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function bookingIndex()
    {
        $user = Auth::user();
        $currentDate = now()->format("Y-m-d");
        $locations = Location::all();
        // $locations = Location::select('city')->distinct()->get();
        $todayBookings = Booking::with([
            "user",
            "trips.schedule.vehicle",
            "trips.schedule.location",
        ])
            ->where("user_id", $user->user_id) // Assuming you want bookings for the authenticated user
            ->whereHas("trips", function ($query) use ($currentDate) {
                $query->where("selected_day", $currentDate);
            })
            ->get();

        return Inertia::render("Booking/Booking", [
            "todays" => $todayBookings,
            "locations" => $locations,
        ]);
    }

    // Menampilkan halaman Detail Order
    public function OrderDetailsIndex()
    {
        $routeId = session("setRoute.selectedRoute.routeId");
        $user = Auth::user();
        $seatNumber = session("seatNumber");
        $data = Location::whereHas("vehicles", function ($query) use (
            $routeId
        ) {
            $query->where("route_id", $routeId);
        })
            ->with([
                "vehicles" => function ($query) use ($routeId) {
                    $query->withPivot("route_id")->where("route_id", $routeId);
                },
            ])
            ->get();

        return Inertia::render("Booking/OrderDetails", [
            "routeData" => $data,
            "bookingData" => session("bookingData"),
            "user" => $user,
            "seatNumber" => $seatNumber,
            "seatCount" => session("seatCount"),
            "credit" => $user->credit->credit_amount,
        ]);
    }

    public function seatIndex()
    {
        $seatLimit = session("bookingData.seatsValue");
        $plate = session("setRoute");

        return Inertia::render("Booking/SelectSeat", [
            "plate" => $plate,
            "seatLimit" => $seatLimit,
        ]);
    }

    public function paymentStatusIndex()
    {
        $user = Auth::user();
        $booking = Booking::where(
            "booking_code",
            session("bookingCode")
        )->first();

        return Inertia::render("Booking/PaymentStatus", [
            "user" => $user,
            "booking" => $booking,
        ]);
    }

    public function paymentTermsIndex()
    {
        return Inertia::render("Booking/PaymentTerms");
    }

    public function dummyIndex()
    {
        return Inertia::render("Booking/Dummy");
    }

    public function busScheduleIndex()
    {
        $city = session("bookingData.cityValue");
        $origin = session("bookingData.origin");

        // Fetch routes with associated vehicles
        $routes = Location::with(['vehicles' => function ($query) {
            $query->withPivot('price', 'route_id', 'departure_time', 'arrival_time');
        }])
        ->where('city', $city)
        ->where('name', '!=', $origin)
        ->get();

        // Fetch seat bookings for each vehicle using subqueries
        foreach ($routes as $route) {
            foreach ($route->vehicles as $vehicle) {
                $vehicle->seat_booking = SeatBooking::where('vehicle_id', $vehicle->vehicle_id)
                    ->where('route_id', $vehicle->pivot->route_id)
                    ->where('departure_date', session('bookingData.selectedDay'))
                    ->get();
            }
        }

        // Return the data to the Inertia frontend
        return Inertia::render("Booking/BusSchedule", [
            "booking" => session("bookingData"),
            "routes" => $routes,
        ]);
    }

    public function destinationIndex()
    {
        return Inertia::render("Booking/Destination");
    }

    public function originIndex()
    {
        return Inertia::render("Booking/Origin");
    }

    public function bookingStore(Request $request)
    {
        $bookingData = $request->validate([
            "cityValue" => "required",
            "origin" => "required",
            "selectedDay" => "required",
            "seatsValue" => "required",
        ]);

        session(["bookingData" => $bookingData]);
        Session::put("booking_done", true);

        return redirect()->route('schedule', $bookingData["cityValue"]);
    }

    public function routeStore(Request $request)
    {
        $route = $request->validate([
            "selectedRoute" => "required",
            "selectedRoute.routeId" => "required",
            "selectedRoute.plate" => "required",
            "selectedRoute.departure" => "required",
        ]);

        // Session::forget('booking_done');
        Session::put("schedule_done", true);
        session(["setRoute" => $route]);

        return response()->json(["message" => "Route stored successfully"]);
    }

    public function fetchBookedSeats($licensePlate)
    {
        $date = session("bookingData.selectedDay");
        $formattedDate = date("Y-m-d", strtotime($date)); // Format to Y-m-d if necessary

        // Find the vehicle by its license plate
        $vehicle = Vehicle::where("license_plate", $licensePlate)->first();

        $departureTime = session("setRoute.selectedRoute.departure");

        if (!$vehicle) {
            return response()->json(["message" => "Vehicle not found"], 404);
        }

        try {
            $bookedSeats = SeatBooking::where(
                "vehicle_id",
                $vehicle->vehicle_id
            )
                ->where("departure_time", $departureTime) // Optional: Filter by departure time if needed
                ->where("departure_date", $formattedDate)
                ->pluck("seat_number") // Get the seat_number column
                ->toArray();

            $flattenedBookedSeats = [];
            foreach ($bookedSeats as $seats) {
                $flattenedBookedSeats = array_merge(
                    $flattenedBookedSeats,
                    $seats
                );
            }
            // Return the booked seats
            return response()->json(["booked_seats" => $flattenedBookedSeats]);
        } catch (\Exception $e) {
            FacadesLog::info("Error on try block : " . $e->getMessage());

            return response()->json([
                "message" => "An error occurred. Please try again later",
            ]);
        }
    }

    public function storeData(Request $request)
    {
        try {
            $routeId = session("setRoute.selectedRoute.routeId");
            $vehicle = session("vehicle");

            $location = Location::whereHas("vehicles", function ($query) use (
                $routeId
            ) {
                $query->where("route_id", $routeId);
            })
                ->with([
                    "vehicles" => function ($query) use ($routeId) {
                        $query
                            ->withPivot("route_id")
                            ->where("route_id", $routeId);
                    },
                ])
                ->first();

            $user = Auth::user();

            $transaction_details = [
                "order_id" => uniqid(),
                "gross_amount" => $request->amount,
            ];

            FacadesLog::info('Total Price: ' . $request->amount);

            $item_details = [
                [
                    "id" => $location->vehicles[0]->pivot->route_id,
                    "price" => $location->vehicles[0]->pivot->price,
                    "quantity" => session("seatCount"),
                    "name" => "Gopay Payment",
                ],
            ];

            $billing_address = [
                "first_name" => $user->username,
                "phone" => $user->phone_number,
                "country_code" => "IDN",
            ];

            $customer_details = [
                "first_name" => $user->username,
                "email" => $user->email,
                "phone" => $user->phone_number,
                "biling_address" => $billing_address,
            ];

            $transaction_data = [
                "transaction_details" => $transaction_details,
                "item_details" => $item_details,
                "customer_details" => $customer_details,
                "callbacks" => [
                    "finish" => route("order.dummy"), // Route where you want to redirect the user
                ],
            ];

            $snap_token = Snap::getSnapToken($transaction_data);

            session([
                "temp_booking" => [
                    "amount" => $request->amount,
                    "user_id" => $user->user_id,
                    "seat_count" => session("seatCount"),
                    "vehicle_id" => $vehicle->vehicle_id,
                    "location_id" => $location->location_id,
                    "departure_time" => session(
                        "setRoute.selectedRoute.departure"
                    ),
                    "departure_date" => date(
                        "Y-m-d",
                        strtotime(session("bookingData.selectedDay"))
                    ),
                    "seat_number" => session("seatNumber"),
                    "route_id" => $routeId,
                    "origin" => session("bookingData.origin"),
                    "selected_day" => session("bookingData.selectedDay"),
                    "city" => session("bookingData.cityValue"),
                    "credit" => [
                        "amount" => $request->credit,
                        "status" => $request->credit_status,
                    ],
                    "driver" => $vehicle->driver->name,
                ],
            ]);

            // Session::forget('seat_done');
            Session::put("order_done", true);

            return response()->json(["snap_token" => $snap_token]);
        } catch (\Exception $e) {
            FacadesLog::info(
                "Error Inserting on Store Data : " . $e->getMessage()
            );
            return response()->json([
                "message",
                "Something wrong, please try again later",
            ]);
        }
    }

    public function finishPayment(Request $request)
    {
        $tempBooking = session("temp_booking");
        $user = Auth::user();

        $criteria = [
            "vehicle_id" => $tempBooking["vehicle_id"],
            "location_id" => $tempBooking["location_id"],
            "departure_time" => $tempBooking["departure_time"],
            "departure_date" => $tempBooking["departure_date"],
        ];

        $existingBooking = SeatBooking::where($criteria)
            ->lockForUpdate()
            ->first();

        try {
            DB::beginTransaction();

            if ($tempBooking["credit"]["status"] == true) {
                $user->credit->credit_amount -= $user->credit->credit_amount;
            }
            $user->credit->credit_amount += $tempBooking["credit"]["amount"];
            $user->credit->save();

            $booking = Booking::create([
                "seat_total" => $tempBooking["seat_count"],
                "seat_number" => json_decode($tempBooking["seat_number"]),
                "booking_time" => now(),
                "status" => "Valid",
                "price" => $tempBooking["amount"],
                "user_id" => $tempBooking["user_id"],
                "booking_code" => $this->generateBookingCode(),
            ]);

            session(["bookingCode" => $booking->booking_code]);

            $trip = Trip::create([
                "origin" => $tempBooking["origin"],
                "city" => $tempBooking["city"],
                "booking_id" => $booking->booking_id,
                "route_id" => $tempBooking["route_id"],
                "driver" => $tempBooking["driver"],
                "selected_day" => date(
                    "Y-m-d",
                    strtotime($tempBooking["selected_day"])
                ),
            ]);

            if ($existingBooking) {
                // If there is an existing booking, merge the new seat numbers
                $existingSeats = $existingBooking->seat_number;
                $newSeats = array_merge(
                    $existingSeats,
                    json_decode($tempBooking["seat_number"])
                );
                $existingBooking->seat_number = $newSeats;
                $existingBooking->seat_available -= session('bookingData.seatsValue');
                $existingBooking->save();
            } else {
                $totalSeats = 19;
                $availableSeats = $totalSeats - session('bookingData.seatsValue');
                // If no existing booking, create a new seat booking
                SeatBooking::create(
                    array_merge($criteria, [
                        "seat_number" => json_decode(
                            $tempBooking["seat_number"]
                        ),
                        "seat_available" => $availableSeats,
                        "trip_id" => $trip->trip_id,
                        'route_id' => $tempBooking['route_id'],
                    ])
                );
            }

            Payment::create([
                "amount" => $tempBooking["amount"],
                "payment_time" => now(),
                "booking_id" => $booking->booking_id,
                "user_id" => $tempBooking["user_id"],
            ]);

            DB::table("on_hold_seats")->delete();

            $ticketDetails = [
                "ticket_id" => $tempBooking["route_id"],
                "amount" => $tempBooking["amount"],
            ];

            Notification::send($user, new paymentCompleted($ticketDetails));
            $notification = $user->notifications
                ->sortByDesc("created_at")
                ->first();
            if ($notification) {
                // Dispatch the delete job
                DeleteNotificationJob::dispatch($notification->id)->delay(
                    now()->addMinutes(5)
                );
            }

            UpdateDayExpired::dispatch();

            session()->forget([
                "setCount",
                "setRoute",
                "bookingData",
                "seatNumber",
                "temp_booking",
                "onHold",
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            FacadesLog::info(
                "Error Inserting on Finish Payment : " . $e->getMessage()
            );
        }

        return response()->json(["redirect" => route("home")]);
    }

    public function generateBookingCode($length = 8)
    {
        // Define the characters to use
        $characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        $bookingCode = "";

        // Generate the booking code
        for ($i = 0; $i < $length; $i++) {
            $randomIndex = random_int(0, strlen($characters) - 1);
            $bookingCode .= $characters[$randomIndex];
        }

        return $bookingCode;
    }
}
