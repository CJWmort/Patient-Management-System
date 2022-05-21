<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\occur_location;
use App\Models\occur_site;
use App\Models\occur_type;

class EhorController extends Controller
{
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
}
