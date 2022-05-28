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
        return view('chart',compact('data', 'selectedChart'));
    }
}
