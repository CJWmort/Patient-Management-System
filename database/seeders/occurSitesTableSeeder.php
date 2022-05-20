<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class occurSitesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seed Default Site Of Occurrence Fields To Database
        //Run command "php artisan db:seed --class=occurSitesTableSeeder"
        DB::table('occur_sites')->insert([
            'site'=>'Bedside'
        ]);
        DB::table('occur_sites')->insert([
            'site'=>'Cubicle'
        ]);
        DB::table('occur_sites')->insert([
            'site'=>'Corridor'
        ]);
        DB::table('occur_sites')->insert([
            'site'=>'Toilet'
        ]);
        DB::table('occur_sites')->insert([
            'site'=>'Therapy Gym'
        ]);
        DB::table('occur_sites')->insert([
            'site'=>'Others'
        ]);
    }
}
