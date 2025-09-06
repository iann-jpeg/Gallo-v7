<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClaimsTable extends Migration
{
    public function up()
    {
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('policy_number')->nullable();
            $table->string('claim_type')->nullable();
            $table->date('incident_date')->nullable();
            $table->decimal('estimated_loss', 15, 2)->nullable();
            $table->text('description')->nullable();
            $table->string('status')->default('pending');
            $table->string('submitter_email')->nullable();
            $table->string('submitter_name')->nullable();
            $table->string('submitter_phone')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('claims');
    }
}
