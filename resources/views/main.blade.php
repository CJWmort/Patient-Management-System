<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Main</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/main.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    <div class="grid-container">
        <a class="griditem view-charts" href="#">View Charts</a>
        <a class="griditem manage-users" href="#">Manage Users</a>
        <a class="griditem customise" href="#">Customise EHOR</a>
        <a class="griditem view-reports" href="#">View Reports</a>
    </div>
</body>
</html>