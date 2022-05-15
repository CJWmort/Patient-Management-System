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
    @if($errors->any())
    <div class="alert">
        <div class="alert-title error">Alert Message</div>
        <div class="alert-msg error">{{$errors->first()}}</div>
    </div>
    @endif
    @if(session()->has('msg'))
    <div class="alert">
        <div class="alert-title">Alert Message</div>
        <div class="alert-msg">{{ session()->get('msg') }}</div>
    </div>
    @endif
    <div class="createuser">
        <div class="flex-row">
            <button class="toggleBtn" onclick="openForm();">Create New User</button>
            <form action="{{route('search')}}" method="GET">
                <input type="text" name="finduser" class="search-field" placeholder="Search Users By Name / Login ID ...">
                <input type="submit" class="findBtn" value="Find User">
            </form>
        </div>
        <form class="hide-form" action="{{route('add')}}" method="POST">
            <label>Name:</label>
            <input type="text" name="name" title="Enter user's name" placeholder="Name" required><br>
            <label>Email:</label>
            <input type="email" name="email" title="Enter user's email" placeholder="Email" required><br>
            <label>Login ID:</label>
            <input type="text" name="login_id" title="Enter user's login id" placeholder="Login ID" required><br>
            <label>Phone Number:</label>
            <input type="tel" name="phone_number" title="Enter user's phone number (8 Digits, starting with 6, 8 or 9)" placeholder="Phone No."  pattern="[6|8|9]{1}[0-9]{7}" required><br>
            <label>Password:</label>
            <input type="password" id="password" onkeyup='check();' name="password" title="Enter user's password" placeholder="Password" required><br>
            <label>Confirm Password:</label>
            <input type="password" id="cpassword" onkeyup='check();' name="cfm_password" title="Confirm user's password" placeholder="Confirm Password" required><span id="message"></span><br>
            <label>Role:</label>
            <select name="role" required>
                <option value="" disabled selected>Select a role</option>
                <option value="Reporting Staff">Reporting Staff</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Doctor">Doctor</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Head of Department">Head of Department</option>
                <option value="Admin">Admin</option>
                <option value="Director">Director</option>
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
            <td id="edit"><a href="{{route('edit-profile', ['id'=>$user->id])}}" class="edit">Edit</a></td>
            <td id="delete"><a href="{{route('delete', ['id'=>$user->id])}}" class="delete" 
            onclick="return confirm('Are you sure that you want to delete {{$user->name}} ({{$user->role}}) ?')">Delete</a></td>
        </tr>
        @endforeach
        @if ($allusers->count() == 0)
        <tr class="tablerow">
            <th colspan="7" class="noUser">There Are No Users Found Matching Your Search : "{{$input}}"</th>
        </tr>
        @endif
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
    var check = function(){
        if (document.getElementById('password').value ==
        document.getElementById('cpassword').value){
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').innerHTML = 'matching';
        }
        else{
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = 'not matching';
        }
    }
</script>
</html>