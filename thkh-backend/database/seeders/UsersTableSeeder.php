<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seed Admin User To Database
        //Run command "php artisan db:seed --class=UsersTableSeeder"
        DB::table('users')->insert([
            'name'=>'John Smith',
            'email'=>'johnsmith@gmail.com',
            'login_id'=>'smith123',
            'password'=>Hash::make('123'),
            'phone_number'=>'87667653',
            'profile_pic'=>'',
            'role'=>6,
        ]);
        DB::table('users')->insert([
            'name'=>'Irene Goh',
            'email'=>'irenegoh@gmail.com',
            'login_id'=>'irene123',
            'password'=>Hash::make('1234'),
            'phone_number'=>'87347658',
            'profile_pic'=>'',
            'role'=>7,
        ]);
    }
}
