<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $primaryKey = 'user_id';
    protected $table = 'users';
    protected $fillable = [
        'email',
        'password',
        'username',
        'phone_number',
        'gender',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected static function booted()
    {
        static::creating(function ($user) {
            if (empty($user->username)) {
                $user->username = 'user' . $user->user_id;
            }
        });
    }

    public function isOtpValid($otp)
    {
        return $this->otp === $otp && !$this->isExpired();
    }

    public function isExpires(){
        return now()->greaterThan($this->otp_expires_at);
    }

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

    public function credit()
    {
        return $this->hasOne(Credit::class, 'credit_id');
    }
}
