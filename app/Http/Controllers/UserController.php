<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Session;
use Hash;

class UserController extends Controller
{
    public function login()
    {
        return view('login');
    }
    public function loginUser(Request $request)
    {
        //check for valid login id
        $user = User::where('login_id', '=', $request->login_id)->first();
        if($user){
            //check for correct password
            if(Hash::check($request->password, $user->password)){
                $request->session()->put('loginId', $user->id);
                return redirect('api/main');
            }
            else{
                return back()->withErrors(['msg' => ['Invaid Login Details']]);
            }
        }
        else{
            return back()->withErrors(['msg' => ['Invaid Login Details']]);
        }
    }
    public function main()
    {
        $data = array();
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        return view('main', compact('data'));
    }
    public function logout()
    {
        //Check if user has session loginId then if so,
        //pull the loginId and send them back to login page
        if(Session::has('loginId')){
            Session::pull('loginId');
            return redirect ('api/login');
        }
    }
}
