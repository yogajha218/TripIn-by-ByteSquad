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
        'booked_seats' => 'array',
    ];
    protected $casts = [
        'booked_seats' => 'array',
    ];

    public function driver()
    {
        return $this->hasOne(Driver::class, 'vehicle_id');
    }

    public function trips()
    {
        return $this->hasMany(Trip::class, 'vehicle_id');
    }
}
