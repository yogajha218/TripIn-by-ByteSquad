<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeatBooking extends Model
{
    protected $table = 'seat_bookings';
    protected $primaryKey = 'seat_booking_id';
    public $timestamps = false;
    protected $fillable = [
        'vehicle_id',
        'location_id',
        'trip_id',
        'seat_number',
        'departure_time',
        'departure_date',
    ];

    protected $casts = [
        'seat_number' => 'array',
    ];

    protected $attributes = [
        'seat_number' => '[]',
    ];
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

}
