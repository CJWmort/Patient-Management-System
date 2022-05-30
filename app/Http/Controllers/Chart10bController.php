<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\hors_chart;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Session;


class Chart10bController extends Controller
{
    //Function to get all data required for chart10a and send it back to chart view
    public function chart10b()
    {
        //default display chart10a when admin enters chart page
        $selectedChart = 3;
        $data = array(); 
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        
        return view('chart',compact('data', 'selectedChart'));
    }
}
