<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $primaryKey = 'booking_id';
    protected $table = 'bookings';
    public $timestamps = false;
    protected $fillable = [
        'seat_total',
        'booking_time', 
        'status', 
        'user_id',
        'price',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'booking_id');
    }

    public function trips()
    {
        return $this->hasMany(Trip::class, 'booking_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'booking_id');
    }
}
