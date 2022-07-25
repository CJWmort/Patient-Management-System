<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Customise EHOR</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/ehor.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    @if($errors->any())
    <div class="alert">
        <div class="alert-title error">Error Message</div>
        <div class="alert-msg">{{$errors->first()}}</div>
    </div>
    @endif
    @if(session()->has('msg'))
    <div class="alert">
        <div class="alert-title">Alert Message</div>
        <div class="alert-msg">{!! session()->get('msg') !!}</div>
    </div>
    @endif
    <div class = "btn">
        <button 
            onclick="window.location='{{ route('location') }}'" id="locationbtn" class="toggleBtn">Location of Occurrence
        </button>
        <button 
            onclick="window.location='{{ route('site') }}'" id="sitebtn" class="toggleBtn">Site of Occurrence
        </button>    
        <button 
            onclick="window.location='{{ route('type') }}'" id="typebtn" class="toggleBtn">Type of Occurrence
        </button> 
    </div>
    
    @if($selectedOccurrence == 'location')
    <!-- Location of Occurrence fields Table -->
    <div id="displaytable_location">
        <table class="typeTable" cellspacing="0">
            <tr class="tablehead">
                <form action="{{route('addlocation')}}" method="post">
                @csrf
                    <th><input type="text" name="location" placeholder="Add New Location" required></th>
                    <th colspan = "4"><input type="submit" class="add" value="Add"></th>
                </form>
            </tr>
            <tr class="tablehead">
                <th>LOCATION</th>
                <th>UPDATE</th>
                <th>DELETE</th>
            </tr>

            @foreach($allLocations as $locations)
            <form class="location-title location" action="{{route('updatelocation')}}" method="POST">
            @csrf
            <tr class="tablerow">
                <input type="hidden" name="locationid" value="{{$locations->id}}">
                <td><input type="text" name="name" value="{{$locations->location}}" required></td>
                <td><input type="submit" class="update updatebtn" value="Update"></td>
                <td><a href="{{route('deletelocation', ['id'=>$locations->id])}}" class="delete" onclick="return confirm('Are you sure that you want to delete the field {{$locations->location}} ?')" alt="delete">Delete</a></td>
            </tr>
            </form>
            @endforeach
        </table>
    </div>
    @endif
   
    <!-- Site of Occurrence fields Table -->
    @if($selectedOccurrence == 'site')
    <div id="displaytable_site">
        <table class="typeTable" cellspacing="0">
            <tr class="tablehead">
                <form action="{{route('addsite')}}" method="post">
                @csrf
                    <th><input type="text" name="site" placeholder="Add New Site" required></th>
                    <th colspan = "4"><input type="submit" class="add" value="Add"></th>
                </form>        
            </tr>
            <tr class="tablehead">
                <th>SITE</th>
                <th>UPDATE</th>
                <th>DELETE</th>
            </tr>
            @foreach($allSites as $sites)
            <form class="location-title site" action="{{route('updatesite')}}" method="POST">
            @csrf
                <tr class="tablerow">
                    <input type="hidden" name="siteid" value="{{$sites->id}}">
                    <td><input type="text" name="name" value="{{$sites->site}}" required></td>
                    <td><input type="submit" class="update updatebtn" value="Update"></td>
                    <td><a href="{{route('deletesite', ['id'=>$sites->id])}}" class="delete" onclick="return confirm('Are you sure that you want to delete the field {{$sites->site}} ?')"  alt="delete">Delete</a></td>
                </tr>
            </form>
            @endforeach
        </table>
    </div>
    @endif

    @if($selectedOccurrence == 'type')
    <!-- Type of Occurrence fields Table -->
    <div id="displaytable_type">
        <table class="typeTable" cellspacing="0">
            <tr class="tablehead">
                <form action="{{route('addtype')}}" method="post">
                @csrf
                    <th><input type="text" name="name" placeholder="Add New Type Occurence" required></th>
                    <th>
                        <select name="type" required>
                            <option value="" disabled selected>Select Occurrence Type</option>
                            <option value="Fall Related">Fall Related</option>
                            <option value="Medication Related">Medication Related</option>
                            <option value="Other Incidents">Other Incidents</option>
                        </select>
                    </th>
                    <th colspan = "2"><input type="submit" class="add" value="Add"></th>
                </form>
                
            </tr>
            <form class="location-title filter" action="{{route('filtertype')}}" method="POST">
            @csrf
                <tr class="tablehead">
                    <th colspan="4">
                        <input type="radio" name="type" value="fall">
                        <label class="spacing">Fall Related</label>
                        <input type="radio" name="type" value="medic">
                        <label class="spacing">Medication Related</label>
                        <input type="radio" name="type" value="other">
                        <label class="spacing">Other Incidents</label>
                        <input type="radio" name="type" value="all" checked="checked">
                        <label class="spacing">All Types</label>
                        <input type="submit" class="filterBtn" value="Filter By Type">
                    </th>
                </tr>
            </form>
            <tr class="tablehead">
                <th>NAME</th>
                <th>TYPE</th>
                <th>UPDATE</th>
                <th>DELETE</th>
            </tr>

            @foreach($allTypes as $types)
            <form class="location-title filter" action="{{route('updatetype')}}" method="POST">
            @csrf
                <tr class="tablerow">
                    <input type="hidden" name="typeid" value="{{$types->id}}">
                    <td><input type="text" name="name" value="{{$types->name}}" required></td>
                        <td>
                            <select name="type" required>
                                <option {{$types->type == 'Fall Related' ? 'selected' : ''}} value="Fall Related">Fall Related</option>
                                <option {{$types->type == 'Medication Related' ? 'selected' : ''}} value="Medication Related">Medication Related</option>
                                <option {{$types->type == 'Other Incidents' ? 'selected' : ''}} value="Other Incidents">Other Incidents</option>
                            </select>
                        </td>      
                    <td><input type="submit" class="update updatebtn" value="Update"></td>
                    <td><a href="{{route('deletetype', ['id'=>$types->id])}}" class="delete" onclick="return confirm('Are you sure that you want to delete the field {{$types->name}} ({{$types->type}}) ?')" alt="delete">Delete</a></td>
                </tr>
            </form>
            @endforeach
        </table>
        <br><br><br>
    </div>
    @endif
</body>
<script src="{{URL::asset('public/js/jquery.min.js?v=').time()}}"></script>
<script> //Highlight current occurrence that the admin is viewing
    @if($selectedOccurrence == 'type')
        $('#typebtn').css({backgroundColor: '#0D6E6B', color: 'whitesmoke'})
    @elseif($selectedOccurrence == 'site')
        $('#sitebtn').css({backgroundColor: '#0D6E6B', color: 'whitesmoke'})
    @elseif($selectedOccurrence == 'location')
        $('#locationbtn').css({backgroundColor: '#0D6E6B', color: 'whitesmoke'})
    @endif
</script>
