<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Profile</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/profile.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    <div class="profile">
        <label>Name:</label><span>{{$data->name}}</span><br>
        <label>Email:</label><span>{{$data->email}}</span><br>
        <label>Login ID:</label><span>{{$data->login_id}}</span><br>
        <label>Phone Number:</label><span>{{$data->phone_number}}</span><br>
        <label>Role:</label><span>{{$data->role}}</span><br>
        <a class="edit-profile" href="{{route('edit-profile', ['id'=>$data->id])}}">Edit Profile</a>
    </div>
</body>
</html>