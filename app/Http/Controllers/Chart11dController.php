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
        $chartdata = DB::table('hors_charts')->select('a_inccidentDate', 'wardNo', 'WingLevel')->join('beds', 'beds.wardwing', '=', 'hors_charts.d_occurWardWing')->where('hors_charts.f_occurType', '=', 'fall')->groupBy('hors_charts.id','beds.wardwing')->orderBy('a_inccidentDate', 'asc')->get();        

        //get all Ward Number that exists in the database currently
        $fielddata = DB::table('hors_charts')->select(DB::raw('year(a_inccidentDate) as year'), 'wardNo')->join('beds', 'beds.ward', '=', 'hors_charts.d_occurWard')->where('hors_charts.f_occurType', '=', 'fall')->groupBy(DB::raw('year(a_inccidentDate)'),'beds.wardNo')->orderBy('WingLevel', 'asc')->get();
        
        $subfielddata = DB::table('hors_charts')->select(DB::raw('year(a_inccidentDate) as year'), 'wardNo', 'WingLevel')->join('beds', 'beds.ward', '=', 'hors_charts.d_occurWard')->where('hors_charts.f_occurType', '=', 'fall')->groupBy(DB::raw('year(a_inccidentDate)'),'beds.WingLevel')->orderBy('WingLevel', 'asc')->get();

        return view('chart',compact('data', 'chartdata', 'fielddata', 'subfielddata', 'selectedChart'));
    }
}