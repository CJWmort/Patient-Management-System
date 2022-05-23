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
@if($errors->any())
    <div class="alert">
        <div class="alert-title error">Alert Message</div>
        <div class="alert-msg">{{$errors->first()}}</div>
    </div>
    @endif
    @if(session()->has('msg'))
    <div class="alert">
        <div class="alert-title">Alert Message</div>
        <div class="alert-msg">{{ session()->get('msg') }}</div>
    </div>
    @endif
    <div class="profile">
        <img class="userlogo" src="{{URL::asset('public/images/user.png')}}" alt="user"><br>
        <h2>Edit Profile</h2>
        <form class="editform" action="{{route('update')}}" method="POST" onsubmit="return validateMyForm();">
        @csrf
            <div class="form-grid">
                <input type="hidden" name="userid" value="{{$edituser->id}}">
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value="{{$edituser->name}}" title="Enter user's name" placeholder="Name" required>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value="{{$edituser->email}}" title="Enter user's email" placeholder="Email" required>
                </div>
                <div>
                    <label>Login ID:</label>
                    <input type="text" name="login_id" value="{{$edituser->login_id}}" title="Enter user's login id" placeholder="Login ID" required>
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input type="tel" name="phone_number" value="{{$edituser->phone_number}}" title="Enter user's phone number (8 Digits, starting with 6, 8 or 9)" placeholder="Phone No."  pattern="[6|8|9]{1}[0-9]{7}" required>
                </div>
                <div>
                    <label>Role:</label>
                    <select name="role" required>
                        <option value="{{$edituser->role}}" selected>{{$edituser->role}}</option>
                        <option value="Reporting Staff">Reporting Staff</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Head of Department">Head of Department</option>
                        <option value="Admin">Admin</option>
                        <option value="Director">Director</option>
                    </select>
                </div>
                <div><button type="button" class="change-password" onclick="openField();">Change Password</button></div>
            </div>
            <div class="hide-field">
                <div>
                    <label>New Password:</label><br>
                    <input type="password" id="password" onkeyup='check();' name="password" title="Enter user's password" placeholder="Password">
                </div>
                <div>
                    <label>Confirm Password:</label><br>
                    <input type="password" id="cpassword" onkeyup='check();' name="cfm_password" title="Confirm user's password" placeholder="Confirm Password"><span id="message"></span>
                </div>
            </div>
            <a href="{{route('delete', ['id'=>$edituser->id])}}" class="delete" 
                onclick="return confirm('Are you sure that you want to delete {{$edituser->name}} ({{$edituser->role}}) ?')">Delete</a>
            <input type="submit" class="update" value="Update">
        </form>
    </div>
</body>
<script>
    function openField(){
        //toggle to hide or show change password field
        document.querySelector(".hide-field").classList.toggle('show-field');
        var buttontext = document.querySelector(".change-password");
        if(buttontext.innerHTML == "Change Password"){
            buttontext.innerHTML = "Close"
        }
        else{
            buttontext.innerHTML = "Change Password"
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
    function validateMyForm() //check if password is the same as confirm password
    {
        if(document.querySelector(".hide-field").classList.contains('show-field') &&
        document.getElementById('password').value != ''){
            if(document.getElementById('password').value !=
            document.getElementById('cpassword').value)
            { 
                alert("Password and Confirm Password does not match. Please try again.");
                return false;
            }
            else{
                return true;
            }
        }
        if(document.querySelector(".hide-field").classList.contains('show-field') &&
        document.getElementById('password').value == ''){
            alert("Please ensure Password and Confirm Password fields are filled up.");
            return false;
        }
    }
</script>
</html>