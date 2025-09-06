<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutsourcingRequestsTable extends Migration
{
    public function up()
    {
        Schema::create('outsourcing_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('organization_name')->nullable();
            $table->text('core_functions')->nullable();
            $table->string('location')->nullable();
            $table->text('address')->nullable();
            $table->string('email')->nullable();
            $table->text('services')->nullable();
            $table->string('nature_of_outsourcing')->nullable();
            $table->string('budget_range')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('outsourcing_requests');
    }
}
