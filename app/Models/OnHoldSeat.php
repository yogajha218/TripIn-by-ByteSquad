<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OnHoldSeat extends Model
{
    protected $primaryKey = 'on_hold_seat_id';
    protected $table = 'on_hold_seat';
    public $timestamps = false;

    protected $fillable = [
        'route_id',
        'seat_number',
    ];
    protected $casts = [
        'seat_number' => 'array',
    ];

    protected $attributes = [
        'seat_number' => '[]',
    ];

    public function schedule(){
        $this->belongsTo(Schedule::class, 'route_id');
    }
}
