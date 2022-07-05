<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\hors_chart;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Session;

class Chart11aController extends Controller
{
    //Function to get all data required for chart11a and send it back to chart view
    public function chart11a()
    {
        $selectedChart = 5;
        $data = array(); 
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        //get all data required for chart11a
        $chartdata = DB::table('hors_charts')->select('a_inccidentDate', 'f_occurType', 'f_fall_injury', DB::raw('COUNT(f_occurType) as fall_count'))->where('f_occurType', '=', 'fall')->groupBy('a_inccidentDate','f_fall_injury')->get();

        //get all data from the table "chart11a_data"
        $chart11a_data = DB::table('chart11a_data')->orderBy('a_inccidentDate', 'asc')->get();

        return view('chart',compact('data', 'chartdata', 'chart11a_data', 'selectedChart'));
    }
}
