<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $primaryKey = 'user_id';
    protected $table = 'users';

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'user_id');
    }

    public function trips()
    {
        return $this->hasMany(Trip::class, 'user_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'user_id');
    }
}
