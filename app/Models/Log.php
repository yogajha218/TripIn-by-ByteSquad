<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $primaryKey = 'log_id';
    protected $table = 'logs';
    public $timestamps = false;

    protected $fillable = [
        'trip_id',
        'departure',
        'arrival',
        'departure_date',
        'delete_seat',
    ];
    
    public function trip()
    {
        return $this->belongsTo(Trip::class, 'trip_id');
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class, 'payment_id');
    }
}
