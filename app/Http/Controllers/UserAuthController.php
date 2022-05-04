<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Models\User;

class UserAuthController extends Controller
{
    public function login(){
        return view("login");
    }
    public function loginUser(Request $request){
        $request->validate([
            'login_id'=>'required',
            'password'=>'required'
        ]);
        $user = User::where('login_id', '=', $request->login_id)->first();
        if($user){

        }
        else{
            return back(a);
        }
    }
}
