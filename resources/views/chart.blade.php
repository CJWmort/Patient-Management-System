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
        <a @if($selectedChart == 4)class="selected"@endif href="#">10c. Type of Medication Error (Current Year)</a><br>
        <a @if($selectedChart == 5)class="selected"@endif href="#">11a. Fall Related by Injury/Non-Injury (Monthly)</a><br>
        <a @if($selectedChart == 6)class="selected"@endif href="#">11b. Falls Reported by Severity (In-Hospital)</a><br>
        <a @if($selectedChart == 7)class="selected"@endif href="#}">11c. Falls Reported by Ward Wing (In-Hospital)</a><br>
        <a @if($selectedChart == 8)class="selected"@endif href="#">11d. Falls Reported table by Ward Wing (In-Hospital)</a><br>
    </div>
    <div class="chart">
        <canvas id="myChart"></canvas>
    </div>
    <div id="filter"></div>
</body>
<script src="{{URL::asset('public/js/jquery.min.js?v=').time()}}"></script>
<!-- Display different charts based on user selection -->
@if ($selectedChart == 1)
<script>
    
</script>
<script src="{{URL::asset('public/js/chart8.js?v=').time()}}"></script>
@endif
@if ($selectedChart == 2)
<script>
    var chartdataAnB = {!! json_encode($listAnB) !!}
    var chartdataC = {!! json_encode($listC) !!}
    var chartdataD = {!! json_encode($listD) !!}
</script>
<script src="{{URL::asset('public/js/chart10a.js?v=').time()}}"></script>
@endif
@if ($selectedChart == 3)
<script>
    $('#filter').append(`<label>Sort By Month - Year:</label>
    <input type="month" name="selectedDate" value="2021-03" id="date">`);
    var selectedDate = $('#date').val();
    function formatdate(date){ //format date to correct format 
        var selectedDate = new Date(date);
        var options = {year: '2-digit', month: 'short'};
        var formattedDate = selectedDate.toLocaleDateString("en-US", options);
        return formattedDate;
    };
    $('#date').change(function() { //update chart label on change input type month
        myChart.data.labels[0] = formatdate($('#date').val());
        myChart.update();   
    });

    // var selectedDate = new Date($('#date').val());
    // var options = {year: '2-digit', month: 'short'};
    // var formattedDate = selectedDate.toLocaleDateString("en-US", options);
</script>
<script src="{{URL::asset('public/js/chart10b.js?v=').time()}}"></script>
@endif
<!-- @if ($selectedChart == 7)
<script>
    
</script>
<script src="{{URL::asset('public/js/chart11c.js?v=').time()}}"></script>
@endif -->

</html>