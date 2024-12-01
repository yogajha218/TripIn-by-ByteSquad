<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $primaryKey = 'vehicle_id';
    protected $table = 'vehicles';
    protected $fillable = [
        'license_plate',
        'seats', 
        'status',
        'booked_seats',
    ];
    protected $casts = [
        'booked_seats' => 'array',
    ];

    protected $attributes = [
        'booked_seats' => '[]',
    ];

    public function driver()
    {
        return $this->hasOne(Driver::class, 'vehicle_id');
    }

    public function locations()
    {
        return $this->belongsToMany(Location::class, 'location_vehicle', 'vehicle_id', 'location_id')
                    ->withPivot('price', 'departure_time', 'arrival_time', 'route_id');
    }
}
