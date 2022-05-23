<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
    <title>THKH - Charts</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/chart.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    <div class="side-nav">
        <a href="#">8. Serious Reportable Event</a><br>
        <a href="#">10a. Medication Error (Monthly)</a><br>
        <a href="#">10b. Medication Error (Current Month)</a><br>
        <a href="#">10c. Type of Medication Error (Current Year)</a><br>
        <a href="#">11a. Fall Related by Injury/Non-Injury<br>(Monthly)</a><br>
        <a href="#">11b. Falls Reported by Severity (In-Hospital)</a><br>
        <a href="#">11c. Falls Reported by Ward Wing (In-Hospital)</a><br>
        <a href="#">11d. Falls Reported table by Ward Wing (In-Hospital)</a><br>
    </div>
    <h1>Chart goes here</h1>
</body>
</html>