<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.0.0/chartjs-plugin-datalabels.min.js" integrity="sha512-R/QOHLpV1Ggq22vfDAWYOaMd5RopHrJNMxi8/lJu8Oihwi4Ho4BRFeiMiCefn9rasajKjnx9/fTQ/xkWnkDACg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <title>THKH - Charts</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/chart.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    <div class="side-nav">
        <!-- Highlight Chart Navigation Link To Show Which Chart Is Currently Being Selected -->
        <a @if($selectedChart == 1)class="selected"@endif href="{{route('chart8')}}">8. Serious Reportable Event</a><br>
        <a @if($selectedChart == 2)class="selected"@endif href="{{route('chart10a')}}">10a. Medication Error (Monthly)</a><br>
        <a @if($selectedChart == 3)class="selected"@endif href="{{route('chart10b')}}">10b. Medication Error (Current Month)</a><br>
        <a @if($selectedChart == 4)class="selected"@endif href="{{route('chart10c')}}">10c. Type of Medication Error (Current Year)</a><br>
        <a @if($selectedChart == 5)class="selected"@endif href="{{route('chart11a')}}">11a. Fall Related by Injury/Non-Injury (Monthly)</a><br>
        <a @if($selectedChart == 6)class="selected"@endif href="{{route('chart11b')}}">11b. Falls Reported by Severity (In-Hospital)</a><br>
        <a @if($selectedChart == 7)class="selected"@endif href="{{route('chart11c')}}">11c. Falls Reported by Ward Wing (In-Hospital)</a><br>
        <a @if($selectedChart == 8)class="selected"@endif href="{{route('chart11d')}}">11d. Falls Reported table by Ward Wing (In-Hospital)</a><br>
    </div>
    <div class="chart">
        <canvas id="myChart"></canvas>
    </div>
</body>
<!-- Display different charts based on user selection -->
@if ($selectedChart == 2)
<script>
    const chartdataAnB = {!! json_encode($listAnB) !!}
    const chartdataC = {!! json_encode($listC) !!}
    const chartdataD = {!! json_encode($listD) !!}
</script>
<script src="{{URL::asset('public/js/chart10a.js?v=').time()}}"></script>
@endif
</html>