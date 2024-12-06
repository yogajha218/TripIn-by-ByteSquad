<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = "location_vehicle";
    protected $primaryKey = "route_id";
    protected $fillable = [
        'location_id',
        'vehicle_id',
        'price',
    ];

    public function trips(){
        return $this->hasMany(Trip::class, 'route_id');
    }

    public function vehicle(){
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function location(){
        return $this->belongsTo(Location::class, 'location_id');
    }
}
