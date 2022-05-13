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
        <div class="alert-title">Alert Message</div>
        <div class="alert-msg">{{ session()->get('msg') }}</div>
    </div>
    @endif
    <div class="createuser">
        <button class="toggleBtn" onclick="openForm();">Create New User</button>
        <form class="hide-form" action="#" method="#">
            <label>Name:</label>
            <input type="text" title="Enter user's name" placeholder="Name" required><br>
            <label>Email:</label>
            <input type="email" title="Enter user's email" placeholder="Email" required><br>
            <label>Login ID:</label>
            <input type="text" title="Enter user's login id" placeholder="Login ID" required><br>
            <label>Phone Number:</label>
            <input type="number" title="Enter user's phone number (Must be 8 digits)" placeholder="Phone No."  pattern="\d{8}" required><br>
            <label>Password:</label>
            <input type="password" title="Enter user's password" placeholder="Password" required><br>
            <label>Confirm Password:</label>
            <input type="password" title="Confirm user's password" placeholder="Confirm Password" required><br>
            <label>Role:</label>
            <select required>
                <option value="" disabled selected>Select a role</option>
                <option value="1">Reporting Staff</option>
                <option value="2">Supervisor</option>
                <option value="3">Doctor</option>
                <option value="4">Pharmacy</option>
                <option value="5">Head of Department</option>
                <option value="6">Admin</option>
                <option value="7">Director</option>
            </select><br>
            <input type="submit" class="createBtn" value="Create User">
        </form>
    </div>
    <table class="users" cellspacing="0">
        <th colspan="7" class="table-title">THKH EHOR USERS</th>
        <tr class="tablehead">
            <th>NAME</th>
            <th>ROLE</th>
            <th>EMAIL</th>
            <th>LOGIN ID</th>
            <th>PHONE NO.</th>
            <th>EDIT</th>
            <th>DELETE</th>
        </tr>     
        @foreach ($allusers as $user)
        <tr class="tablerow">
            <td>{{$user->name}}</td>
            <td>{{$user->role}}</td>
            <td>{{$user->email}}</td>
            <td>{{$user->login_id}}</td>
            <td>{{$user->phone_number}}</td>
            <td id="edit"><a href="edit-profile/{{$user->id}}" class="edit">Edit</a></td>
            <td id="delete"><a href="delete/{{$user->id}}" class="delete" 
            onclick="return confirm('Are you sure that you want to delete {{$user->name}} ({{$user->role}}) ?')">Delete</a></td>
        </tr>
        @endforeach
    </table>
</body>
<script>
    function openForm(){
        //toggle to hide or show form
        document.querySelector(".hide-form").classList.toggle('show-form');
        var buttontext = document.querySelector(".toggleBtn");
        if(buttontext.innerHTML == "Create New User"){
            buttontext.innerHTML = "Close"
        }
        else{
            buttontext.innerHTML = "Create New User"
        }
    }
</script>
</html>