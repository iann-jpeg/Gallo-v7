<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDocumentsColumns extends Migration
{
    public function up()
    {
        Schema::table('claims', function (Blueprint $table) {
            $table->text('documents')->nullable();
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->text('documents')->nullable();
        });

        Schema::table('consultations', function (Blueprint $table) {
            $table->text('documents')->nullable();
        });
    }

    public function down()
    {
        Schema::table('claims', function (Blueprint $table) {
            $table->dropColumn('documents');
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->dropColumn('documents');
        });

        Schema::table('consultations', function (Blueprint $table) {
            $table->dropColumn('documents');
        });
    }
}
