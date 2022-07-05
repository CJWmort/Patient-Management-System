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
        <div class="alert-msg">{{ session()->get('msg') }}</div>
    </div>
    @endif
    <div class = "btn">
        <button class="toggleBtn" onclick="openForm();">View Location Of Occurence</button>
        <button class="toggleBtn" onclick="openForm();">View Site Of Occurence</button>    
        <button class="toggleBtn type" onclick="toggleTypeOccurence();">View Type Of Occurence</button> 
    </div>


    <div id="displaytable" style="visibility: none">
        <table class="typeTable" cellspacing="0">
            <tr class="tablehead">
                <th><input type="text" name="name[]" placeholder="Add New Type Occurence"></th>
                <th>
                    <select name="type" required>
                        <option value="" disabled selected>Select Occurrence Type</option>
                        <option value="Fall Related">Fall Related</option>
                        <option value="Medication Related">Medication Related</option>
                        <option value="Other Incidents">Other Incidents</option>
                    </select>
                </th>
                <th colspan = "2"><a href="" class="add">Add</a></th>
            </tr>
            <form class="location-title filter" action="{{route('filtertype')}}" method="POST">
            @csrf
                <tr class="tablehead">
                    <th colspan="4">
                        <input type="radio" name="type" value="fall">
                        <label>Fall Related</label>
                        <input type="radio" name="type" value="medic">
                        <label>Medication Related</label>
                        <input type="radio" name="type" value="other">
                        <label>Other Incidents</label>
                        <input type="radio" name="type" value="all" checked="checked">
                        <label>All Types</label>
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
            <tr class="tablerow">
                <td><input type="text" name="name[]" value="{{$types->name}}" required></td>
                    <td>
                        <select name="type" required>
                            <option {{$types->type == 'Fall Related' ? 'selected' : ''}} value="Fall Related">Fall Related</option>
                            <option {{$types->type == 'Medication Related' ? 'selected' : ''}} value="Medication Related">Medication Related</option>
                            <option {{$types->type == 'Other Incidents' ? 'selected' : ''}} value="Other Incidents">Other Incidents</option>
                        </select>
                    </td>      
                <td><a href="" class="update">Update</a></td>
                <td><a href="" class="delete" onclick="return confirm('Are you sure that you want to delete the field {{$types->name}} ({{$types->type}}) ?')" alt="delete">Delete</a>
            </tr>
            @endforeach
        </table>
    </div>


    
    <script>
        function toggleTypeOccurence(){
            if (document.getElementById("displaytable").style.display === "none")
                document.getElementById("displaytable").style.display="block";
            else
                document.getElementById("displaytable").style.display="none";
        }
    </script>
    





    <div class="ehortitle">EDIT EHOR FIELDS</div>
    <!-- Form for location of occurrence -->
    <form class="location-title" action="{{route('addlocation')}}" method="POST">
    @csrf
        <span class="addfield">
            Location of Occurrence
            <button class="addBtn" type="submit"><img src="{{URL::asset('public/images/add.png')}}" alt="add"></button>
            <input class="newlocation" type="text" name="location" placeholder="enter new location" required>  
        </span> 
        <span class="alert-msg">{{ session()->get('msg') }}</span>
    </form>
    <form class="location" action="{{route('updatelocation')}}" method="POST">
    @csrf
        <div class="location-grid">
            @foreach($allLocations as $locations)
            <div>
                <a class="deleteBtn" href="{{route('deletelocation', ['id'=>$locations->id])}}"><img src="{{URL::asset('public/images/minus.png')}}" onclick="return confirm('Are you sure that you want to delete the field {{$locations->location}} ?')" alt="delete"></a><input type="text" name="location[]" value="{{$locations->location}}" required>
                <input type="hidden" name="locationid[]" value="{{$locations->id}}">                 
            </div>
            @endforeach
        </div>
        <input class="update" type="submit" value="Update Location of Occurrence Fields">
    </form>

    
    <!-- Form for site of occurrence -->
    <form class="location-title site" action="{{route('addsite')}}" method="POST">
    @csrf
        <span class="addfield">
            Site of Occurrence
            <button class="addBtn" type="submit"><img src="{{URL::asset('public/images/add.png')}}" alt="add"></button>
            <input class="newlocation" type="text" name="site" placeholder="enter new site" required>  
        </span> 
        <span class="alert-msg">{{ session()->get('msg2') }}</span>
    </form>
    <form class="location" action="{{route('updatesite')}}" method="POST">
    @csrf
        <div class="location-grid">
            @foreach($allSites as $sites)
            <div>
                <a class="deleteBtn" href="{{route('deletesite', ['id'=>$sites->id])}}"><img src="{{URL::asset('public/images/minus.png')}}" onclick="return confirm('Are you sure that you want to delete the field {{$sites->site}} ?')" alt="delete"></a><input type="text" name="site[]" value="{{$sites->site}}" required>
                <input type="hidden" name="siteid[]" value="{{$sites->id}}">                 
            </div>
            @endforeach
        </div>
        <input class="update" type="submit" value="Update Site of Occurrence Fields">
    </form>

    <!-- Form for type of occurrence -->
    <form class="location-title type" action="{{route('addtype')}}" method="POST">
    @csrf
        <span class="addfield">
            Type of Occurrence
            <button class="addBtn" type="submit"><img src="{{URL::asset('public/images/add.png')}}" alt="add"></button>
            <input class="newlocation" type="text" name="name" placeholder="enter new type" required>  
            <select name="type" required>
                <option value="" disabled selected>Select Occurrence Type</option>
                <option value="Fall Related">Fall Related</option>
                <option value="Medication Related">Medication Related</option>
                <option value="Other Incidents">Other Incidents</option>
            </select>
            <span class="alert-msg">{{ session()->get('msg3') }}</span>
        </span> 
    </form>
    <form class="location-title filter" action="{{route('filtertype')}}" method="POST">
    @csrf
        <div class="selectType">
            <input type="radio" name="type" value="fall">
            <label>Fall Related</label>
            <input type="radio" name="type" value="medic">
            <label>Medication Related</label>
            <input type="radio" name="type" value="other">
            <label>Other Incidents</label>
            <input type="radio" name="type" value="all" checked="checked">
            <label>All Types</label>
            <input type="submit" class="filterBtn" value="Filter By Type">
        </div>
    </form>
    <form class="location" action="{{route('updatetype')}}" method="POST">
    @csrf
        <div class="location-grid">
            @foreach($allTypes as $types)
            <div>
                <div class="typeinfo">{{$types->type}}</div>
                <a class="deleteBtn" href="{{route('deletetype', ['id'=>$types->id])}}"><img src="{{URL::asset('public/images/minus.png')}}" onclick="return confirm('Are you sure that you want to delete the field {{$types->name}} ({{$types->type}}) ?')" alt="delete"></a><input type="text" name="name[]" value="{{$types->name}}" required>
                <input type="hidden" name="typeid[]" value="{{$types->id}}">                 
            </div>
            @endforeach
        </div>
        <input class="update" type="submit" value="Update Type of Occurrence Fields">
    </form>
    <br><br>
</body>
<script>

</script>
</html>