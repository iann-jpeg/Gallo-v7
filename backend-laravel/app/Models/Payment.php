<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';
    protected $fillable = ['user_id','amount','currency','method','status','reference','metadata'];
    protected $casts = ['metadata' => 'array'];
}
