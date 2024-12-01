<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $primaryKey = 'location_id';
    protected $table = 'locations';

    protected $fillable = [
        'name', 
        'address',
        'type',
        'city',
    ];

    public function vehicles()
    {
        return $this->belongsToMany(Vehicle::class, 'location_vehicle', 'location_id', 'vehicle_id')
                    ->withPivot('price', 'departure_time', 'arrival_time');
    }
}
