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
}
