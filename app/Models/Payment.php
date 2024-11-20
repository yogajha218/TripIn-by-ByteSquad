<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $primaryKey = 'payment_id';
    protected $table = 'payments';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }

    public function credit()
    {
        return $this->hasOne(Credit::class, 'payment_id');
    }

    public function logs()
    {
        return $this->hasMany(Log::class, 'payment_id');
    }
}
