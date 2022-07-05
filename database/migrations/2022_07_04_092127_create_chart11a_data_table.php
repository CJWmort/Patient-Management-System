<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChart11aDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    //Create chart11a_data Table in your "thkh" database
    //Run command "php artisan migrate"
    public function up()
    {
        Schema::create('chart11a_data', function (Blueprint $table) {
            $table->id();
            $table->string('a_inccidentDate');
            $table->double('past_yr_avg', 8, 2);
            $table->double('target_rate', 8, 2);
            $table->double('rate_per_1000_patient_days', 8, 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chart11a_data');
    }
}
