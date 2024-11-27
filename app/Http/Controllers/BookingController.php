<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function bookingIndex()
    {
        return Inertia::render('Booking');
    }

    public function originIndex()
    {
        // bisa get dengan location yang ada di database
        $locations = [
            [
                'city' => 'Jakarta',
                'station' => 'Stasiun Gambir'
            ],
            [
                'city' => 'Jakarta',
                'station' => 'Stasiun Pasar Senen'
            ],
            [
                'city' => 'Semarang',
                'station' => 'Stasiun Tawang'
            ],
            [
                'city' => 'Surabaya',
                'station' => 'Stasiun Pasar Turi'
            ],
        ];
        return Inertia::render('Booking/Origin', [
            'locations' => $locations
        ]);
    }

    public function destinationIndex()
    {
        // bisa get dengan location yang ada di database
        $locations = [
            [
                'city' => 'Jakarta',
                'station' => 'Stasiun Gambir'
            ],
            [
                'city' => 'Jakarta',
                'station' => 'Stasiun Pasar Senen'
            ],
            [
                'city' => 'Semarang',
                'station' => 'Stasiun Tawang'
            ],
            [
                'city' => 'Surabaya',
                'station' => 'Stasiun Pasar Turi'
            ],
        ];
        return Inertia::render('Booking/Destination', [
            'locations' => $locations
        ]);
    }
}
