<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiasporaRequest extends Model
{
    protected $table = 'diaspora_requests';
    protected $fillable = ['user_id','name','email','phone','country','details','status'];
}
