<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\hors_chart;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Session;

class Chart11dController extends Controller
{
    //Function to get all data required for chart11d and send it back to chart view
    public function chart11d()
    {
        $selectedChart = 8;
        $data = array(); 
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        //get all data required for chart11d
        $chartdata = DB::table('hors_charts')->select('a_inccidentDate', 'WingLevel', 'f_occurType', DB::raw('COUNT(f_occurType) as fall_count'))->join('beds', 'beds.ward', '=', 'hors_charts.d_occurWard')->where('hors_charts.f_occurType', '=', 'fall')->groupBy('hors_charts.a_inccidentDate','beds.WingLevel')->get();

        //get all Wing Level that exists in the database currently
        $fielddata = DB::table('beds')->select('WingLevel')->groupBy('WingLevel')->get();

        return view('chart',compact('data', 'chartdata', 'fielddata', 'selectedChart'));
    }
}
