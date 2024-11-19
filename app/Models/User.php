<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $primaryKey = 'user_id';
    protected $table = 'users';
    protected $fillable = [
        'email',
        'password',
        'username',
        'otp',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

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
