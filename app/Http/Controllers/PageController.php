<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\occur_location;
use App\Models\occur_site;
use App\Models\occur_type;
use Session;

class PageController extends Controller
{
    public function profile()
    {
        $data = array();
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        return view('profile', compact('data'));
    }
    public function editprofile($id)
    {
        $data = array();
        $edituser = array();
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
            $edituser = User::find($id);
        }
        return view('edit_profile', compact('data', 'edituser'));
    }
    public function password()
    {
        $data = array();
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        return view('password', compact('data'));
    }
    public function manageuser()
    {
        $data = array();
        $allusers = array();
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
            $allusers = User::all();
        }
        return view('user', compact('data', 'allusers'));
    }
    public function ehor()
    {
        $data = array();
        $allLocations = array();
        $allSites = array();
        $allTypes = array();
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
            $allLocations = occur_location::all();
            $allSites = occur_site::all();
            $allTypes = occur_type::all(); //get all the current ehor fields
        }
        return view('ehor', compact('data', 'allLocations', 'allSites', 'allTypes'));
    }
    public function chart()
    {
        $selectedChart = 2;
        $data = array(); 
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        //Stores med error num for each month from oct 2020 to sep 2021
        $dates = DB::select('select a_inccidentDate, count(j_ph_index) as "med_error_num" from hors_charts WHERE (a_inccidentDate BETWEEN "2020-10-1" AND "2021-09-1") AND (j_ph_index = "A" or j_ph_index = "B") group by a_inccidentDate');
        //Seperate date(x-axis) and med error num(y-axis)
        foreach($dates as $row){
            $date_x_axis[] = $row->a_inccidentDate;
            $med_error_y_axis[] = $row->med_error_num;
        }
        //Convert all dates to match the format on the chart
        //example: "2021-03-1" to "Mar-21"
        $formattedDate = array_map(function ($date_x_axis) {
            return date('M-y', strtotime($date_x_axis));
        }, $date_x_axis);

        $chartData = array_combine($formattedDate, $med_error_y_axis);
        $list = array();
        for($i = 0; $i<sizeof($chartData); $i++) {
            array_push($list, (Object)["x" => $formattedDate[$i], "y" => $med_error_y_axis[$i]]);
        }

        return view('chart',compact('data', 'list', 'selectedChart'));
    }
}
