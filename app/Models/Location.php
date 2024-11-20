<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $primaryKey = 'location_id';
    protected $table = 'locations';

    public function trips()
    {
        return $this->hasMany(Trip::class, 'location_id');
    }
}
