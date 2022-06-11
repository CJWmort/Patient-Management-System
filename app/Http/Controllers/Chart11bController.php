<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\hors_chart;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Session;

class Chart11bController extends Controller
{
    //Function to get all data required for chart10c and send it back to chart view
    public function chart11b()
    {
        $selectedChart = 6;
        $data = array(); 
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        //get all data required for chart11b
        $chartdata = DB::table('hors_charts')->select('a_inccidentDate', 'f_occurType', 'f_fall_injury_type', 'l_hpo_outcome', DB::raw('COUNT(l_hpo_outcome) as severity_count'))->where([['f_occurType', '=', 'fall'],['f_fall_injury_type', '!=', '']])->whereNotNull('l_hpo_outcome')->groupBy('a_inccidentDate','f_occurType','f_fall_injury_type')->get();

        $fielddata = DB::table('hors_charts')->select(DB::raw('YEAR(a_inccidentDate) as year'), 'f_fall_injury_type', 'l_hpo_outcome')->where('f_fall_injury_type', '!=', '')->whereNotNull('l_hpo_outcome')->groupBy('year','f_fall_injury_type','l_hpo_outcome')->get();

        return view('chart',compact('data', 'chartdata', 'fielddata', 'selectedChart'));
    }
}
