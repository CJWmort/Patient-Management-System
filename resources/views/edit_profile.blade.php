<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Edit Profile</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/edit_profile.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    <div class="profile">
        <p>Name: {{$edituser->name}}</p>
        <p>Email: {{$edituser->email}}</p>
        <p>Login ID: {{$edituser->login_id}}</p>
        <p>Phone Number: {{$edituser->phone_number}}</p>
        <p>Role: {{$edituser->role}}</p>
        <a class="edit-profile" href="edit-profile">Edit Profile</a>
        <a class="change-password" href="password">Change Password</a>
    </div>
</body>
</html>