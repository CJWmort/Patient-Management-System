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
        //Stores med error num for each month from oct 2020 to sep 2021 for category A and B
        $datesAnB = DB::select('select a_inccidentDate, count(j_ph_index) as "med_error_num" from hors_charts WHERE (a_inccidentDate BETWEEN "2020-10-1" AND "2021-09-1") AND (j_ph_index = "A" or j_ph_index = "B") group by a_inccidentDate');
        //Seperate date(x-axis) and med error num(y-axis)
        foreach($datesAnB as $row){
            $date_x_axis[] = $row->a_inccidentDate;
            $med_error_y_axis[] = $row->med_error_num;
        }
        //Convert all dates to match the format on the chart
        //example: "2021-03-1" to "Mar-21"
        $formattedDate = array_map(function ($date) {
            return date('M-y', strtotime($date));
        }, $date_x_axis);

        $chartData = array_combine($formattedDate, $med_error_y_axis);
        $listAnB = array();
        for($i = 0; $i<sizeof($chartData); $i++) {
            array_push($listAnB, (Object)["x" => $formattedDate[$i], "y" => $med_error_y_axis[$i]]);
        }
        
        return view('chart',compact('data', 'listAnB', 'selectedChart'));
    }
}
