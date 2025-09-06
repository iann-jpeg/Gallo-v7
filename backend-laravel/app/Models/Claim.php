<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    protected $table = 'claims';
    protected $fillable = ['user_id','policy_number','claim_type','incident_date','estimated_loss','description','status','submitter_email','submitter_name','submitter_phone','documents'];
    protected $casts = ['documents' => 'array'];
}
