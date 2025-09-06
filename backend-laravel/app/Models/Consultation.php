<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $table = 'consultations';
    protected $fillable = ['user_id','name','email','phone','country','timezone','service_interest','service_type','scheduled_at','status','meeting_link','duration','notes','documents'];
    protected $casts = ['documents' => 'array'];
}
