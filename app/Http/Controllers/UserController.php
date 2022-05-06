<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Session;

class UserController extends Controller
{
    public function login()
    {
        return view('login');
    }
    public function loginUser(Request $request)
    {
        $user = User::where('login_id', '=', $request->login_id)->first();
        if($user){
            //check for correct password
            $userPass = $user->password; //$userPass is user input password
            $databasePass = $request->password; //$databasePass is password of user in database
            if($databasePass == $userPass){
                $request->session()->put('loginId', $user->id);
                return redirect('main');
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
            return redirect ('login');
        }
    }
}
