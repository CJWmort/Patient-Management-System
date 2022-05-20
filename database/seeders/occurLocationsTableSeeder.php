<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class occurLocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seed Default Location Of Occurrence Fields To Database
        //Run command "php artisan db:seed --class=occurLocationsTableSeeder"
        DB::table('occur_locations')->insert([
            'location'=>'In the ward'
        ]);
        DB::table('occur_locations')->insert([
            'location'=>'Outside the ward'
        ]);
        DB::table('occur_locations')->insert([
            'location'=>'Pharmacy'
        ]);
        DB::table('occur_locations')->insert([
            'location'=>'Outside the hospital'
        ]);
    }
}
