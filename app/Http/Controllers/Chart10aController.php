<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\hors_chart;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Session;

class Chart10aController extends Controller
{
    //Function to get all data required for chart10a and send it back to chart view
    public function chart10a()
    {
        //default display chart10a when admin enters chart page
        $selectedChart = 2;
        $data = array(); 
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        //get all data required for chart10a
        $chartdata = DB::table('hors_charts')->select('a_inccidentDate', 'f_occurType', 'j_ph_index', DB::raw('COUNT(j_ph_index) as error_count'))->where([['j_ph_index', '!=', '""'],['f_occurType', '=', "medication"]])->groupBy('a_inccidentDate','j_ph_index')->get();

        return view('chart',compact('data', 'chartdata', 'selectedChart'));
    }
}
