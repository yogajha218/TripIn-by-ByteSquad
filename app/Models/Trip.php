<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    protected $primaryKey = 'trip_id';
    protected $table = 'trips';
    public $timestamps = false;
    protected $fillable = [
        'origin', 
        'booking_id', 
        'route_id',
        'selected_day',
        'city',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }

    public function schedule(){
        return $this->belongsTo(Schedule::class, 'route_id');
    }
}
