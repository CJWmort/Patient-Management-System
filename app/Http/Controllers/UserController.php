<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Session;
use Hash;
use Auth;

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
                //Create session for user
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
    public function delete($id)
    {
        //function to delete user
        $user = User::find($id);
        $result = $user->delete();
        if ($result)
        {
            return redirect ('api/user')->with('msg', $user->name . ' (' . $user->role .') Has Been Removed From The Records.');
        }
        else
        {
            return redirect ('api/user')->withErrors(['msg' => ['Failed To Remove User From The Records.']]);
        }
    }
    public function add(Request $req)
    {
        //function to add user
        $newuser = new User;
        $newuser->name=$req->name;
        $newuser->email=$req->email;
        $newuser->login_id=$req->login_id;
        $newuser->phone_number=$req->phone_number;
        $password = $req->password;
        $cfm_password = $req->cfm_password; //store confirm password value into variable $cfm_password
        $newuser->role=$req->role;
        if ($cfm_password == $password) //if password and confirm password is same
        {
            $newuser->password = Hash::make($req->password);
            $result = $newuser->save();
            if($result){
                return redirect ('api/user')->with('msg', $newuser->name . ' (' . $newuser->role .') Has Been Added To The Records.');
            }
            else{
                return redirect ('api/user')->withErrors(['msg' => ['Failed To Add User To The Records.']]);
            }
        }
        else
        {
            return redirect ('api/user')->withErrors(['msg' => ['Incorrect Password. Please ensure password and confirm password are the same.']]);
        }
    }
    public function update(Request $req){
        $updateuser = User::find($req->userid);
        $updateuser->name=$req->name;
        $updateuser->email=$req->email;
        $updateuser->login_id=$req->login_id;
        $updateuser->phone_number=$req->phone_number;
        $updateuser->role=$req->role;
        if ($req->password != '' && $req->cfm_password == $req->password){
            $updateuser->password = Hash::make($req->password);
            $result = $updateuser->save();
            if($result){
                return redirect('api/user')->with('msg', $updateuser->name . ' (' . $updateuser->role .') Has Been Updated In The Records.');
            }
            else{
                return back()->withErrors(['msg' => ['Failed To Update User In The Records.']]);
            }
        }
        $updateuser->save();
        return back()->with('msg', $updateuser->name . ' (' . $updateuser->role .') Has Been Updated In The Records.');
    }
    
    public function search(Request $request)
    {
        //search database users table for name and login_id that matches the search input
        $input = $request->finduser;
        $data = array();
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
        }
        $allusers = array();
        $allusers = User::where('name','like','%'.$input.'%')->orWhere('login_id','like','%'.$input.'%')->get();
        return view('user', compact('data','allusers','input'));
    }
}
