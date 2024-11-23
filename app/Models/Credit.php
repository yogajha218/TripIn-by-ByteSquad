<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    protected $primaryKey = 'credit_id';
    protected $table = 'credits';
    protected $fillable =[
        'credit_amount',
        'user_id',
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
