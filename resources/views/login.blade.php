<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Login</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/login.css?v=').time()}}">
</head>
<body>
    <div class="login_div">
        <form action="login-user" method="POST" id="loginForm">
        @csrf
            <div>
                <p><img class="loginlogo" src="{{URL::asset('public/images/thkh-logo.jpg')}}" alt="logo"></p>
                <p class="logintitle">LOG IN</p>
                <p><input class="loginID" title="Enter your login id" id="loginID" name="login_id" type="text" placeholder="Login ID" required></p>
                <p><input class="password" title="Enter your password" id="password" name="password" type="password" placeholder="Password" required></p>
                <p class="remember">
                    <input class="logincheck" id="rememberMe" name="remember" type="checkbox"><label>Remember Me</label>
                    @if($errors->any())
                        <b>{{$errors->first()}}</b>
                    @endif
                </p>
                <p class="forgot"><a href="#">Forgot Password  ?</a></p>
                <p><input class="login_button" name="login" type="submit" value="Log In"></p>
            </div>
        </form>
    </div>
</body>
<script src="{{URL::asset('public/js/jquery.min.js?v=').time()}}"></script>
<script>
    if(localStorage.getItem('loginID') != null){
        document.getElementById('loginID').value = localStorage.getItem('loginID');
    } else{
        document.getElementById('loginID').value = '';
    }
    if(localStorage.rememberMeChecked == 'on'){
        $('#rememberMe').attr('checked', true);
    } 
    $('#loginForm').on('submit', function() {
        if ($('#rememberMe').is(':checked')) {
            // save login_id and password
            localStorage.loginID = $('#loginID').val();
            localStorage.rememberMeChecked = $('#rememberMe').val();
        } else {
            localStorage.loginID = '';
            localStorage.rememberMeChecked = '';
        }
    });
</script>
</html>