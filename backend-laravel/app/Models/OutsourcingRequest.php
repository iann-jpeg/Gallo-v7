<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OutsourcingRequest extends Model
{
    protected $table = 'outsourcing_requests';
    protected $fillable = ['user_id','organization_name','core_functions','location','address','email','services','nature_of_outsourcing','budget_range','status'];

    protected $casts = [
        'services' => 'array'
    ];
}
