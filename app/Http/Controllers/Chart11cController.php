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
        $selectedChart = 1;
        $data = array(); 
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        return view('chart',compact('data', 'selectedChart'));
    }
}
