<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class occurTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seed Default Type Of Occurrence Fields To Database
        //Run command "php artisan db:seed --class=occurTypesTableSeeder"
        DB::table('occur_types')->insert([
            'type'=>1,
            'name'=>'Fracture'
        ]);
        DB::table('occur_types')->insert([
            'type'=>1,
            'name'=>'Abrasion'
        ]);
        DB::table('occur_types')->insert([
            'type'=>1,
            'name'=>'Head Injury'
        ]);
        DB::table('occur_types')->insert([
            'type'=>1,
            'name'=>'Bruise/Swelling'
        ]);
        DB::table('occur_types')->insert([
            'type'=>1,
            'name'=>'Laceration'
        ]);
        DB::table('occur_types')->insert([
            'type'=>1,
            'name'=>'Hematoma'
        ]);
        DB::table('occur_types')->insert([
            'type'=>1,
            'name'=>'Others'
        ]);
        DB::table('occur_types')->insert([
            'type'=>2,
            'name'=>'Wrong Patient'
        ]);
        DB::table('occur_types')->insert([
            'type'=>2,
            'name'=>'Wrong Drug'
        ]);
        DB::table('occur_types')->insert([
            'type'=>2,
            'name'=>'Wrong Strength/Dose'
        ]);
        DB::table('occur_types')->insert([
            'type'=>2,
            'name'=>'Wrong Time'
        ]);
        DB::table('occur_types')->insert([
            'type'=>2,
            'name'=>'Wrong Route'
        ]);
        DB::table('occur_types')->insert([
            'type'=>2,
            'name'=>'Others'
        ]);
        DB::table('occur_types')->insert([
            'type'=>3,
            'name'=>'Injury unrelated to fall'
        ]);
        DB::table('occur_types')->insert([
            'type'=>3,
            'name'=>'Treatment related'
        ]);
        DB::table('occur_types')->insert([
            'type'=>3,
            'name'=>'Diagnostic related'
        ]);
        DB::table('occur_types')->insert([
            'type'=>3,
            'name'=>'Abuse'
        ]);
        DB::table('occur_types')->insert([
            'type'=>3,
            'name'=>'Assaults'
        ]);
        DB::table('occur_types')->insert([
            'type'=>3,
            'name'=>'Needle-stick Injury'
        ]);
        DB::table('occur_types')->insert([
            'type'=>3,
            'name'=>'Others'
        ]);
    }
}
