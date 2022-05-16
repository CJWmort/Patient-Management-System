<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Home</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/main.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    <div class="grid-container">
        <a class="griditem view-charts" href="#"><img class="chart" src="{{URL::asset('public/images/chart.png')}}" alt="chart"><br>View Charts</a>
        <a class="griditem view-reports" href="#"><img class="view" src="{{URL::asset('public/images/reports.png')}}" alt="view"><br>View Reports</a>
        <a class="griditem customise" href="{{route('ehor')}}"><img class="setting" src="{{URL::asset('public/images/setting.png')}}" alt="setting"><br>Customise EHOR</a>
        <a class="griditem manage-users" href="user"><img class="manage" src="{{URL::asset('public/images/group.png')}}" alt="manage"><br>Manage Users</a>
    </div>
</body>
</html>