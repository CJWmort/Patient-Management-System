<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\hors_chart;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\chart11a_data;
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
        $chart11a_data = DB::table('chart11a_datas')->orderBy('a_inccidentDate', 'asc')->get();

        return view('chart',compact('data', 'chartdata', 'chart11a_data', 'selectedChart'));
    }
    //Function to perform an UpdateOrCreate on chart11a_data Table
    public function editData(Request $req){
        //Update all the fields in chart11a          
        for($i = 0; $i < count($req->input('date')); $i++) {
            $chart11a_data = chart11a_data::find($req->input('date')[$i]);
            if($chart11a_data == true){ //if data exists, update.
                $chart11a_data->a_inccidentDate = $req->input('date')[$i];
                $chart11a_data->past_yr_avg = $req->input('avg')[$i];
                $chart11a_data->target_rate = $req->input('rate')[$i];
                $chart11a_data->rate_per_1000_patient_days = $req->input('patient')[$i];
            }
            else{ //if data doesn't exist, create.
                $chart11a_data = new chart11a_data;
                $chart11a_data->a_inccidentDate = $req->input('date')[$i];
                $chart11a_data->past_yr_avg = $req->input('avg')[$i];
                $chart11a_data->target_rate = $req->input('rate')[$i];
                $chart11a_data->rate_per_1000_patient_days = $req->input('patient')[$i];
            }
            $result = $chart11a_data->save();
        }
        if($result){
            return redirect ('chart11a')->with('msg', 'All fall-related data from ' . date('M - Y', strtotime($req->input('date')[0])) . ' to ' . date('M - Y', strtotime($req->input('date')[11])) . ' has been updated.');
        }
        else{
            return redirect ('chart11a')->with('msg', 'Failed to update the fall-related data.');
        }
    }
}
