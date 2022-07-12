<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - View Reports</title>
    <style>
        body{
            background-color: #9db1e3;
        }
        .reports_screen{
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    <!-- This is just to mimic the possible function of viewing reports which is outside of our project's scope-->
    <img class="reports_screen" src="{{URL::asset('public/images/reports_page.jpeg')}}" alt="reports_page">
</body>
</html>