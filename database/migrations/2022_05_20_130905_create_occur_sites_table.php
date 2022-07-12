<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOccurSitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    //Create occur_sites Table in your "thkh" database
    //Run command "php artisan migrate"
    public function up()
    {
        Schema::create('occur_sites', function (Blueprint $table) {
            $table->increments('id');
            $table->string('site');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('occur_sites');
    }
}
