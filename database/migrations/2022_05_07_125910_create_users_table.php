<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Create Users Table in your "thkh" database
        //Run command "php artisan migrate"
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('login_id');
            $table->string('password');
            $table->string('phone_number', 8);
            $table->string('profile_pic');
            $table->enum('role', ['Reporting Staff', 'Supervisor', 'Doctor', 'Pharmacy', 'Head of Department', 'Admin', 'Director']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
