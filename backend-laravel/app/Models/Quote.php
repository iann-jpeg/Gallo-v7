<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $table = 'quotes';
    protected $fillable = ['user_id','name','email','phone','service_type','status','details','documents'];
    protected $casts = ['documents' => 'array'];
}
