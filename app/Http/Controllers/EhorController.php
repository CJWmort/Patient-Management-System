<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\occur_location;
use App\Models\occur_site;
use App\Models\occur_type;
use Session;
use Redirect;

class EhorController extends Controller
{
    //Below are the functions for add, delete and update for LOCATION OF OCCURRENCE
    public function deletelocation($id)
    {
        //function to delete location field
        $field = occur_location::find($id);
        $oldOccurrence = $field->location;
        $result = $field->delete();
        if ($result)
        {
            return redirect ('location')->with('msg',  '<b>' . $oldOccurrence . '</b> field has been removed
            from Location of Occurrence.');
        }
        else
        {
            return redirect ('location')->withErrors('Failed to delete Location of Occurrence field.');
        }
    }
    public function addlocation(Request $req)
    {
        //function to add new location field
        $newLocation = new occur_location;
        $newOccurrence = $req->location;
        $newLocation->location=$req->location;
        $result = $newLocation->save();
        if($result){
            return redirect('location')->with('msg',  '<b>' . $newOccurrence 
            . '</b> has been addded as a new Location of Occurrence field.');
        }
        else{
            return redirect('location')->withErrors('Failed to add new Location of Occurrence field.');
        }
    }
    public function updatelocation(Request $req){
        $updatelocation = occur_location::find($req->locationid);
        $oldOccurrence = $updatelocation->location;
        $newOccurrence = $req->input('name');
        $updatelocation->location=$req->input('name');
        $result = $updatelocation->save();
        if($result){
            return redirect('location')->with('msg', 'Location of Occurrence field <b>' . $oldOccurrence 
            . '</b> has been updated to <b>' . $newOccurrence . '</b>.');                
        }
        else{
            return redirect('location')->withErrors('Failed to update Location of Occurrence field.');
        }
    }

    //Below are the functions for add, delete and update for SITE OF OCCURRENCE
    public function deletesite($id)
    {
        //function to delete site field
        $field = occur_site::find($id);
        $oldOccurrence = $field->site;
        $result = $field->delete();
        if ($result)
        {
            return redirect('site')->with('msg',  '<b>' . $oldOccurrence . '</b> field has been removed
            from Site of Occurrence.');
        }
        else
        {
            return redirect('site')->withErrors('Failed to delete Site of Occurrence field.');
        }
    }
    public function addsite(Request $req)
    {
        //function to add new site field
        $newSite = new occur_site;
        $newOccurrence = $req->site;
        $newSite->site=$req->site;
        $result = $newSite->save();
        if($result){
            return redirect('site')->with('msg',  '<b>' . $newOccurrence 
            . '</b> has been addded as a new Site of Occurrence field.');
        }
        else{
            return redirect('site')->withErrors('Failed to add new Site of Occurrence field.');
        }
    }
    public function updatesite(Request $req){
        $updatesite = occur_site::find($req->siteid);
        $oldOccurrence = $updatesite->site;
        $newOccurrence = $req->input('name');
        $updatesite->site=$req->input('name');
        $result = $updatesite->save();
        if($result){
            return redirect('site')->with('msg', 'Site of Occurrence field <b>' . $oldOccurrence 
            . '</b> has been updated to <b>' . $newOccurrence . '</b>.');                
        }
        else{
            return redirect('site')->withErrors('Failed to update Type of Occurrence field.');
        }
    }

    //Below are the functions for add, delete, filter and update for TYPE OF OCCURRENCE
    public function deletetype($id)
    {
        //function to delete type field
        $field = occur_type::find($id);
        $oldOccurrence = $field->name . ' (' . $field->type . ')';
        $result = $field->delete();
        if ($result)
        {
            return redirect('type')->with('msg',  '<b>' . $oldOccurrence . '</b> field has been removed
            from Type of Occurrence.');
        }
        else
        {
            return redirect('type')->withErrors('Failed to delete Type of Occurrence field.');
        }
    }
    public function addtype(Request $req)
    {
        //function to add new site field
        $newType = new occur_type;
        $newOccurrence = $req->name . ' (' . $req->type . ')';
        $newType->type=$req->type;
        $newType->name=$req->name;
        $result = $newType->save();
        if($result){
            return redirect('type')->with('msg',  '<b>' . $newOccurrence 
            . '</b> has been addded as a new Type of Occurrence field.');
        }
        else{
            return redirect('type')->withErrors('Failed to add new Type of Occurrence field.');
        }
    }
    public function updatetype(Request $req){
        $updatetype = occur_type::find($req->typeid);
        $oldOccurrence = $updatetype->name . ' (' . $updatetype->type . ')';
        $newOccurrence = $req->input('name') . ' (' . $req->type . ')';
        $updatetype->name=$req->input('name');
        $updatetype->type=$req->type;
        $result = $updatetype->save();
        if($result){
            return redirect('type')->with('msg', 'Type of Occurrence field <b>' . $oldOccurrence 
            . '</b> has been updated to <b>' . $newOccurrence . '</b>.');                
        }
        else{
            return redirect('type')->withErrors('Failed to update Type of Occurrence field.');
        }
    }
    public function filtertype(Request $req)
    {
        $selectedOccurrence = 'type';
        $data = array();
        $allLocations = array();
        $allSites = array();
        $allTypes = array();
        if (Session::has('loginId')){
            $data = User::where('id', '=', Session::get('loginId'))->first();
            $allLocations = occur_location::all();
            $allSites = occur_site::all();
            //Check the type to filter by
            if($req->type == "fall"){
                $allTypes = occur_type::where('type', '=', 'Fall Related')->get();
            }
            elseif($req->type == "medic"){
                $allTypes = occur_type::where('type', '=', 'Medication Related')->get();
            }
            elseif($req->type == "other"){
                $allTypes = occur_type::where('type', '=', 'Other Incidents')->get();
            }
            elseif($req->type == "all"){
                $allTypes = occur_type::all(); //get all the current ehor fields
            }
        }
        return view('ehor', compact('data', 'selectedOccurrence', 'allLocations', 'allSites', 'allTypes'));
    }
}
