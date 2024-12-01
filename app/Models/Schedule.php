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
}
