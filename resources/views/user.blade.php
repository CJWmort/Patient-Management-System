<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Manage Users</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/user.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    @if(session()->has('msg'))
    <div class="alert">
        <div class="alert-title">User Removed Successfully</div>
        <div class="alert-msg">{{ session()->get('msg') }}</div>
    </div>
    @endif
    <table class="users">
        <th colspan="7" class="table-title">THKH EHOR USERS</th>
        <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>LOGIN ID</th>
            <th>PHONE NO.</th>
            <th>ROLE</th>
            <th>EDIT</th>
            <th>DELETE</th>
        </tr>     
        @foreach ($allusers as $user)
        <tr>
            <td>{{$user->name}}</td>
            <td>{{$user->email}}</td>
            <td>{{$user->login_id}}</td>
            <td>{{$user->phone_number}}</td>
            <td>{{$user->role}}</td>
            <td id="edit"><a href="edit/{{$user}}" class="edit">Edit</a></td>
            <td id="delete"><a href="delete/{{$user->id}}" class="delete">Delete</a></td>
        </tr>
        @endforeach
    </table>
</body>
</html>