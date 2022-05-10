<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Main</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/profile.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    <div class="edit-profile">
        <form action="#" method="#">
            {{ csrf_field() }}
            <label>Name: </label>
            <input type="text" value="{{$data->name}}" placeholder="Enter Your Name">

            <label>Email: </label>
            <input type="text" value="{{$data->email}}" placeholder="Enter Your Email">

            <label>Login ID: </label>
            <input type="text" value="{{$data->login_id}}" placeholder="Enter Your Login ID">

            <label>Phone Number: </label>
            <input type="text" value="{{$data->phone_number}}" placeholder="Enter Your Phone Number">

            <label>Role: </label>
            <input type="text" value="{{$data->role}}" placeholder="Enter Your Role">
        </form>
    </div>
</body>
</html>