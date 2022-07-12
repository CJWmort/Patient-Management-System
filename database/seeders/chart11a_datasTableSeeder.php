<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class chart11a_datasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Seed Default Site Of Occurrence Fields To Database
        //Run command "php artisan db:seed --class=chart11a_datasTableSeeder"
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2020-10-1',
            'past_yr_avg'=>1.15,
            'target_rate'=>0.99,
            'rate_per_1000_patient_days'=>0.12
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2020-11-1',
            'past_yr_avg'=>1.15,
            'target_rate'=>0.99,
            'rate_per_1000_patient_days'=>0.12
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2020-12-1',
            'past_yr_avg'=>1.15,
            'target_rate'=>0.99,
            'rate_per_1000_patient_days'=>0.12
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2021-01-1',
            'past_yr_avg'=>0.57,
            'target_rate'=>0.9,
            'rate_per_1000_patient_days'=>0.61
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2021-02-1',
            'past_yr_avg'=>0.57,
            'target_rate'=>0.9,
            'rate_per_1000_patient_days'=>0.41
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2021-03-1',
            'past_yr_avg'=>0.57,
            'target_rate'=>0.9,
            'rate_per_1000_patient_days'=>0.59
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2021-04-1',
            'past_yr_avg'=>0.57,
            'target_rate'=>0.9,
            'rate_per_1000_patient_days'=>0.98
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2021-05-1',
            'past_yr_avg'=>0.57,
            'target_rate'=>0.9,
            'rate_per_1000_patient_days'=>1.17
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2021-06-1',
            'past_yr_avg'=>0.57,
            'target_rate'=>0.9,
            'rate_per_1000_patient_days'=>0.76
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2021-07-1',
            'past_yr_avg'=>0.57,
            'target_rate'=>0.9,
            'rate_per_1000_patient_days'=>0.94
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2021-08-1',
            'past_yr_avg'=>0.57,
            'target_rate'=>0.9,
            'rate_per_1000_patient_days'=>0.54
        ]);
        DB::table('chart11a_datas')->insert([
            'a_inccidentDate'=>'2021-09-1',
            'past_yr_avg'=>0.57,
            'target_rate'=>0.9,
            'rate_per_1000_patient_days'=>1.26
        ]);
    }
}
