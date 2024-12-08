<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Location;
use App\Models\Schedule;
use App\Models\User;
use App\Models\UserOtp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function notificationIndex(){
        return Inertia::render('Home/Notification');
    }

    // Menampilkan halaman home
    public function homeIndex(){
        session()->forget('bookingCode');
        $user = Auth::user();  
        $currentDate = now()->format('Y-m-d');
        Session::forget([
            'booking_done',
            'schedule_done',
            'seat_done',
            'order_done',
        ]);

        $todayBookings = Booking::with(['user', 'trips.schedule.vehicle', 'trips.schedule.location'])
            ->where('user_id', $user->user_id) // Assuming you want bookings for the authenticated user
            ->whereHas('trips', function($query) use ($currentDate){
                $query->where('selected_day', $currentDate);
            })
            ->get(); 

        $upcomingBookings = Booking::with(['user', 'trips.schedule.vehicle', 'trips.schedule.location'])
            ->where('user_id', $user->user_id) // Assuming you want bookings for the authenticated user
            ->whereHas('trips', function($query) use ($currentDate){
                $query->where('selected_day', '>' , $currentDate);
            })
            ->get();

        FacadesLog::info('Today Bookings: ' . $todayBookings);
        FacadesLog::info('Upcoming Bookings: ' . $upcomingBookings);
        FacadesLog::info(now()->format('Y-m-d'));
        
        return Inertia::render('Home/Home', [
            'credit' => $user->credit->credit_amount, 
            'username' => $user->username,
            'user_id' => $user->user_id,
            'booking' => [
                'upcomings' => $upcomingBookings,
                'todays' => $todayBookings,
            ]
        ]);
    }

    public function ticketIndex(){
        $user = Auth::user();

        try{

            $bookings = Booking::with(['user', 'trips.schedule.vehicle', 'trips.schedule.location'])
                ->where('user_id', $user->user_id) // Assuming you want bookings for the authenticated user
                ->get();          
   
            FacadesLog::info('User : ' . $user);
            FacadesLog::info('Booking : ' . $bookings);
        } catch(\Exception $e){
            FacadesLog::error('Error : ' . $e->getMessage());
        }
    
        return Inertia::render('Home/MyTicket', ['bookings' => $bookings]);
    }

    
    public function boardingTicketIndex($bookingId){
        $user = Auth::user();
        FacadesLog::info('passed booking_id : ' . $bookingId);
        try{
            $bookings = Booking::with(['user', 'trips.schedule.vehicle.seat_booking', 'trips.schedule.location'])
                ->where('user_id', $user->user_id)
                ->where('booking_id', $bookingId) // Assuming you want bookings for the authenticated user
                ->first();

            FacadesLog::info('Selected Booking : ' . $bookings);    
        }catch(\Exception $e){
            FacadesLog::error('Error : ' . $e->getMessage());
        }
        
        return Inertia::render('Booking/BoardingTicket', ['booking' => $bookings, 'user' => $user->username]);
    }

}
