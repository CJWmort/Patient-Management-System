<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\hors_chart;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Session;


class Chart11cController extends Controller
{
    //Function to get all data required for chart11c and send it back to chart view
    public function chart11c()
    {
        $selectedChart = 7;
        $data = array(); 
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        //get all data required for chart11c
        $chartdata = DB::table('hors_charts')->select('a_inccidentDate', 'wardwing', 'WingLevel')->join('beds', 'beds.wardwing', '=', 'hors_charts.d_occurWardWing')->where('hors_charts.f_occurType', '=', 'fall')->groupBy('hors_charts.id','beds.wardwing')->get();

        //get all Wing Level that exists in the database currently
        $fielddata = DB::table('beds')->select('WingLevel')->groupBy('WingLevel')->get();

        return view('chart',compact('data', 'chartdata', 'fielddata', 'selectedChart'));
    }
}
