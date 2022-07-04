<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\hors_chart;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Session;

class Chart10cController extends Controller
{
    //Function to get all data required for chart10c and send it back to chart view
    public function chart10c()
    {
        $selectedChart = 4;
        $data = array(); 
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        //get all data required for chart10c
        $chartdata = DB::table('hors_charts')->select('a_inccidentDate', 'f_medi_error', 'j_ph_phase', DB::raw('COUNT(j_ph_phase) as type_count'))->where([['f_medi_error', '!=', ""],['j_ph_phase', '!=', ""]])->groupBy('a_inccidentDate','f_medi_error', 'j_ph_phase')->get();

        //get all fields required for chart10c
        $fielddata = DB::table('hors_charts')->select(DB::raw('YEAR(a_inccidentDate) as year'), 'f_medi_error', 'j_ph_phase')->where([['f_medi_error', '!=', ""],['j_ph_phase', '!=', ""]])->groupBy('year','f_medi_error', 'j_ph_phase')->get();

        // send data to chart.blade
        return view('chart',compact('data', 'chartdata', 'fielddata', 'selectedChart'));
    }
}
