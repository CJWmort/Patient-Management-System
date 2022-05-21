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
}
