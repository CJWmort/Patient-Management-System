<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\hors_chart;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Session;


class Chart8Controller extends Controller
{
    //Function to get all data required for chart8 and send it back to chart view
    public function chart8()
    {
        $selectedChart = 1;
        $data = array(); 
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }

        //Store serious reported event for each month
        $datesSeriousFall = DB::select('');

        foreach($datesSeriousFall as $row){
            $date_x_axis[] = $row->a_inccidentDate;
            $srefall_y_axis[] = $row->sre_num;
        }

        $formattedDate = array_map(function ($date) {
            return date('M-y', strtotime($date));
        }, $date_x_axis);

        $chartData = array_combine($formattedDate, $srefall_y_axis);

        $listSREFall = array();
        for($i = 0; $i<sizeof($chartData); $i++) {
            array_push($listSREFall, (Object)["x" => $formattedDate[$i], "y" => $srefall_y_axis[$i]]);
        }

        //Store serious reported event for each month
        $datesSeriousMedicine = DB::select('');

        foreach($datesSeriousMedicine as $row){
            $date_x_axis[] = $row->a_inccidentDate;
            $sremedicine_y_axis[] = $row->sre_num;
        }

        $formattedDate = array_map(function ($date) {
            return date('M-y', strtotime($date));
        }, $date_x_axis);

        $chartData = array_combine($formattedDate, $sremedicine_y_axis);

        $listSREMedicine = array();
        for($i = 0; $i<sizeof($chartData); $i++) {
            array_push($listSREMedicine, (Object)["x" => $formattedDate[$i], "y" => $sremedicine_y_axis[$i]]);
        }
        
        return view('chart',compact('data', 'listSREFall', 'listSREMedicine', 'selectedChart'));
    }
}
