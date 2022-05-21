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
    <div class="ehortitle">EDIT EHOR FIELDS</div>
    <!-- Form for location of occurrence -->
    <form class="location-title" action="{{route('addlocation')}}" method="POST">
        <span class="addfield">
            Location of Occurrence
            <button class="addBtn" type="submit"><img src="{{URL::asset('public/images/add.png')}}" alt="add"></button>
            <input class="newlocation" type="text" name="location" placeholder="enter new location" required>  
        </span> 
        <span class="alert-msg">{{ session()->get('msg') }}</span>
    </form>
    <form class="location" action="{{route('updatelocation')}}" method="POST">
        <div class="location-grid">
            @foreach($allLocations as $locations)
            <div>
                <a class="deleteBtn" href="{{route('deletelocation', ['id'=>$locations->id])}}"><img src="{{URL::asset('public/images/minus.png')}}" alt="delete"></a><input type="text" name="location[]" value="{{$locations->location}}" required>
                <input type="hidden" name="locationid[]" value="{{$locations->id}}">                 
            </div>
            @endforeach
        </div>
        <input class="update" type="submit" value="Update Location of Occurrence Fields">
    </form>
    <!-- Form for site of occurrence -->
    <form class="location-title site" action="{{route('addsite')}}" method="POST">
        <span class="addfield">
            Site of Occurrence
            <button class="addBtn" type="submit"><img src="{{URL::asset('public/images/add.png')}}" alt="add"></button>
            <input class="newlocation" type="text" name="site" placeholder="enter new site" required>  
        </span> 
        <span class="alert-msg">{{ session()->get('msg2') }}</span>
    </form>
    <form class="location" action="{{route('updatesite')}}" method="POST">
        <div class="location-grid">
            @foreach($allSites as $sites)
            <div>
                <a class="deleteBtn" href="{{route('deletesite', ['id'=>$sites->id])}}"><img src="{{URL::asset('public/images/minus.png')}}" alt="delete"></a><input type="text" name="site[]" value="{{$sites->site}}" required>
                <input type="hidden" name="siteid[]" value="{{$sites->id}}">                 
            </div>
            @endforeach
        </div>
        <input class="update" type="submit" value="Update Site of Occurrence Fields">
    </form>
</body>
<script>

</script>
</html>