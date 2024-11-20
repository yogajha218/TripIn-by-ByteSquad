<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;

    protected $primaryKey = 'user_id';
    protected $table = 'users';
    protected $fillable = [
        'email',
        'password',
        'username',
        'otp',
        'otp_expires_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

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
