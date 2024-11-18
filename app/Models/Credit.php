<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    protected $primaryKey = 'credit_id';
    protected $table = 'credits';


    public function payment()
    {
        return $this->belongsTo(Payment::class, 'payment_id');
    }
}
