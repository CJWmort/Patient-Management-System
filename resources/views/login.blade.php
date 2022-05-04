<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Login</title>
    <link rel="stylesheet" type="text/css" href="css/login.css">
</head>
<body>
    <div class="login_div">
        <form action="/main" method="POST">
        {{ csrf_field() }}
            <div>
                <p><img class="loginlogo" src="../images/thkh-logo.jpg" alt="logo"></p>
                <p class="logintitle">LOG IN</p>
                <p><input class="loginID" name="login_id" type="text" placeholder="Login ID" required></p>
                <p><input class="password" name="password" type="password" placeholder="Password" required></p>
                <p class="remember"><input class="logincheck" type="checkbox"><label>Remember Password</label></p>
                <p class="forgot"><a href="#">Forgot Password  ?</a></p>
                <p><input class="login_button" name="login" type="submit" value="Log In"></p>
            </div>
        </form>
    </div>
</body>
</html>