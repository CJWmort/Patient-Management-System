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
    <div class="location-title">
        <div>
            <form action="{{route('addlocation')}}" method="POST">
                <span>
                    Location of Occurrence
                    <button class="addBtn" type="submit"><img src="{{URL::asset('public/images/add.png')}}" alt="add"></button>
                    <input class="newlocation" type="text" name="location" placeholder="enter new location">  
                </span> 
                <span class="alert-msg">{{ session()->get('msg') }}</span>
            </form>
        </div> 
    </div>
    <form class="location" action="#" method="#">
        <div class="location-grid">
            @foreach($allLocations as $locations)
            <div>
                <a class="deleteBtn" href="{{route('deletelocation', ['id'=>$locations->id])}}"><img src="{{URL::asset('public/images/minus.png')}}" alt="delete"></a><input type="text" value="{{$locations->location}}">                 
            </div>
            @endforeach
            <input class="update" type="submit" value="Update Location of Occurrence Fields">
        </div>
    </form>
</body>
<script>

</script>
</html>