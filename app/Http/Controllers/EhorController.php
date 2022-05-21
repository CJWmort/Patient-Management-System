<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\occur_location;
use App\Models\occur_site;
use App\Models\occur_type;

class EhorController extends Controller
{
    //Below are the functions for add, delete and update LOCATIONS
    public function deletelocation($id)
    {
        //function to delete location field
        $field = occur_location::find($id);
        $result = $field->delete();
        if ($result)
        {
            return redirect ('api/ehor')->with('msg',  '"'.$field->location . '"' . ' field has been removed from Location of Occurrence section.');
        }
        else
        {
            return redirect ('api/ehor')->with('msg', 'Failed to remove location field from Location of Occurrence section.');
        }
    }
    public function addlocation(Request $req)
    {
        //function to add new location field
        $newLocation = new occur_location;
        $newLocation->location=$req->location;
        $result = $newLocation->save();
        if($result){
            return redirect ('api/ehor')->with('msg',  '"'. $newLocation->location . '"' . ' field has been added to Location of Occurrence section.');
        }
        else{
            return redirect ('api/ehor')->with('msg', 'Failed to add location field into Location of Occurrence section.');
        }
    }
    public function updatelocation(Request $req){
        //function to update all location fields
        for($i = 0; $i < count($req->input('locationid')); $i++) {
            $locations = occur_location::find($req->input('locationid')[$i]);
            $locations->location = $req->input('location')[$i];
            $result = $locations->save();
        }
        if($result){
            return redirect ('api/ehor')->with('msg', 'All Location of Occurrence fields have been updated.');
        }
        else{
            return redirect ('api/ehor')->with('msg', 'Failed to update Location of Occurrence fields.');
        }
    }

    //Below are the functions for add, delete and update SITES
    public function deletesite($id)
    {
        //function to delete site field
        $field = occur_site::find($id);
        $result = $field->delete();
        if ($result)
        {
            return redirect ('api/ehor')->with('msg2',  '"'.$field->site . '"' . ' site has been removed from Site of Occurrence section.');
        }
        else
        {
            return redirect ('api/ehor')->with('msg2', 'Failed to remove site field from Site of Occurrence section.');
        }
    }
    public function addsite(Request $req)
    {
        //function to add new site field
        $newSite = new occur_site;
        $newSite->site=$req->site;
        $result = $newSite->save();
        if($result){
            return redirect ('api/ehor')->with('msg2',  '"'. $newSite->site . '"' . ' field has been added to Site of Occurrence section.');
        }
        else{
            return redirect ('api/ehor')->with('msg2', 'Failed to add site field into Site of Occurrence section.');
        }
    }
    public function updatesite(Request $req){
        //function to update all site fields
        for($i = 0; $i < count($req->input('siteid')); $i++) {
            $sites = occur_site::find($req->input('siteid')[$i]);
            $sites->site = $req->input('site')[$i];
            $result = $sites->save();
        }
        if($result){
            return redirect ('api/ehor')->with('msg2', 'All Site of Occurrence fields have been updated.');
        }
        else{
            return redirect ('api/ehor')->with('msg2', 'Failed to update Site of Occurrence fields.');
        }
    }
}
