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
    <div class="side-nav" id="side-nav">
        <!-- Highlight Chart Navigation Link To Show Which Chart Is Currently Being Selected -->
        <a @if($selectedChart == 1)class="selected"@endif href="{{route('chart8')}}">8. Serious Reportable Event</a><br>
        <a @if($selectedChart == 2)class="selected"@endif href="{{route('chart10a')}}">10a. Medication Error (Past 12 Months)</a><br>
        <a @if($selectedChart == 3)class="selected"@endif href="{{route('chart10b')}}">10b. Medication Error (Current Month)</a><br>
        <a @if($selectedChart == 4)class="selected"@endif href="{{route('chart10c')}}">10c. Type of Medication Error (Current Year)</a><br>
        <a @if($selectedChart == 5)class="selected"@endif href="{{route('chart11a')}}">11a. Fall Related by Injury/Non-Injury (Monthly)</a><br>
        <a @if($selectedChart == 6)class="selected"@endif href="{{route('chart11b')}}">11b. Falls Reported by Severity (In-Hospital)</a><br>
        <a @if($selectedChart == 7)class="selected"@endif href="{{route('chart11c')}}">11c. Falls Reported by Ward Wing (In-Hospital)</a><br>
        <a @if($selectedChart == 8)class="selected"@endif href="{{route('chart11d')}}">11d. Falls Reported table by Ward Wing (In-Hospital)</a><br>
    </div>
    <div class="chart-indicator">
        <!-- Display chart discription for each chart -->
        @if($selectedChart == 1)
        <span>Chart 8 - Serious Reportable Event</span>
        @endif
        @if($selectedChart == 2)
        <span>Chart 10a - Monthly Medication related error count by Cat A to I for past 12 months</span>
        @endif
        @if($selectedChart == 3)
        <span>Chart 10b - Medication related error count by Cat A to I for current month</span>
        @endif
        @if($selectedChart == 4)
        <span>Chart 10c - Type of Medication related error count for current year</span>
        @endif
        @if($selectedChart == 5)
        <span>Chart 11a - Monthly Fall-related count by Injury/Non-Injury for past 12 months</span>
        @endif
        @if($selectedChart == 6)
        <span>Chart 11b - Falls Reported (In-Hospital) by severity</span>
        @endif
        @if($selectedChart == 7)
        <span>Chart 11c - Falls Reported (In-Hospital) by ward wing</span>
        @endif
        @if($selectedChart == 8)
        <span>Chart 11d - Falls Reported (In-Hospital) table by ward wing</span>
        @endif
    </div>
    <div class="right" onclick="openMenu();"><img id='arrow' src="{{URL::asset('public/images/right.png')}}" alt="arrow"></div>
    <div class="chart">
        <canvas id="myChart" width="1200" height="500"></canvas>
    </div>
    <div class='center'>
        <div id="filter"></div>
        @if($selectedChart == 6)
         <div class="charttitle">Fall with injury %</div>
         <div class="chartsubtitle"></div><br>
         <div class="doughnut"></div>
        @endif
        <div id="table"></div>
        <div id="text"></div>
    </div>
</body>
<script src="{{URL::asset('public/js/jquery.min.js?v=').time()}}"></script>
<script>
    function getCurrentMonthYear(){
        //Get the current month and year then set it as the starting value for input type month
        var currentMonth = document.querySelector('input[type="month"]');
        var date= new Date()
        var month=("0" + (date.getMonth() + 1)).slice(-2)
        var year=date.getFullYear()
        currentMonth.value = `${year}-${month}`;
    }
    function openMenu(){
        //Open or Close Menu To Hide or Show Chart List
        document.querySelector(".side-nav").classList.toggle('showSideNav');
        document.querySelector(".right").classList.toggle('moveRight');
        if ($('#arrow').attr('src') == '{{URL::asset('public/images/right.png')}}') {
            $('#arrow').attr('src', "{{URL::asset('public/images/left.png')}}")
        } else {
            $('#arrow').attr('src', "{{URL::asset('public/images/right.png')}}")
        }
    }
</script>
<!-- Display different charts based on user selection -->
@if ($selectedChart == 1) 
<script> //Display Chart8
    $('#filter').append(`<label>Selected Month - Year:</label>
    <input type="month" name="selectedDate" id="date" onkeydown="return false" required>
    <span id="total"></span>`);
    getCurrentMonthYear(); //Set starting value for input type month to be current month-year
    var chartdata = {!! json_encode($chartdata) !!} //Get data from chart8Controller
</script>
<script src="{{URL::asset('public/js/chart8.js?v=').time()}}"></script>
@endif

@if ($selectedChart == 2)
<script> //Display Chart10a
    $('#filter').append(`<label>Selected Month - Year:</label>
    <input type="month" name="selectedDate" id="date" onkeydown="return false" required>
    <label class="rate">Target Rate (Prev Yr): </label><input type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" id="rate" step="0.1">`);
    getCurrentMonthYear(); //Set starting value for input type month to be current month-year
    var chartdata = {!! json_encode($chartdata) !!} //Get data from chart10aController
</script>
<script src="{{URL::asset('public/js/chart10a.js?v=').time()}}"></script>
@endif

@if ($selectedChart == 3)
<script> //Display Chart10b
    $('#filter').append(`<label>Sort By Month - Year:</label>
    <input type="month" name="selectedDate" id="date" onkeydown="return false" required>
    <span id="total"></span>`);
    getCurrentMonthYear(); //Set starting value for input type month to be current month-year
    var chartdata = {!! json_encode($chartdata) !!} //Get data from chart10bController
</script>
<script src="{{URL::asset('public/js/chart10b.js?v=').time()}}"></script>
@endif

@if ($selectedChart == 4)
<script> //Display Chart10c
    var currentYear= new Date().getFullYear(); //Get current year and set as default value in chart10c
    $('#filter').append(`
    <label>Enter Selected Year:</label>
    <input type="number" id="year" min="0" onchange='return true' value="${currentYear}" oninput="this.value = Math.abs(this.value)" required>`);
    var chartdata = {!! json_encode($chartdata) !!} //Get data from chart10cController
    var fielddata = {!! json_encode($fielddata) !!} //Get fields from chart10cController
</script>
<script src="{{URL::asset('public/js/chart10c.js?v=').time()}}"></script>
@endif

@if ($selectedChart == 5)
<script> //Display Chart11a
    $('#filter').append(`<label>Selected Month - Year:</label>
    <input type="month" name="selectedDate" value="2021-09" id="date" onkeydown="return false" required>`);
    //getCurrentMonthYear(); //Set starting value for input type month to be current month-year
    var chartdata = {!! json_encode($chartdata) !!} //Get data from chart11aController
    var chart11a_data = {!! json_encode($chart11a_data) !!} //Get data from chart11a_data table
</script>
<script src="{{URL::asset('public/js/chart11a.js?v=').time()}}"></script>
@endif

@if ($selectedChart == 6)
<script> //Display Chart11b
    $('#filter').append(`<label>Selected Month - Year:</label>
    <input type="month" name="selectedDate" id="date" value="2021-09" onkeydown="return false" required>`);
    var chartdata = {!! json_encode($chartdata) !!} //Get data from chart11bController
    var fielddata = {!! json_encode($fielddata) !!} //Get fields from chart11bController
</script>
<script src="{{URL::asset('public/js/chart11b.js?v=').time()}}"></script>
@endif

@if ($selectedChart == 7)
<script> //Display Chart11c
    $('#filter').append(`<label>Selected Month - Year:</label>
    <input type="month" name="selectedDate" id="date" value="2021-09" onkeydown="return false" required>
    <span id="total"></span>`);
    var chartdata = {!! json_encode($chartdata) !!} //Get data from chart11cController
    var fielddata = {!! json_encode($fielddata) !!} //Get fields from chart11cController
</script>
<script src="{{URL::asset('public/js/chart11c.js?v=').time()}}"></script>
@endif

@if ($selectedChart == 8)
<script> //Display Chart11d
    var currentYear= new Date().getFullYear(); //Get current year and set as default value in chart11d
    $('#filter').append(`<label>Enter Selected Year:</label>
    <input type="number" id="year" min="0" onchange='return true' value="${currentYear}" oninput="this.value = Math.abs(this.value)" required>`);
    var chartdata = {!! json_encode($chartdata) !!} //Get data from chart11dController
    var fielddata = {!! json_encode($fielddata) !!} //Get fields from chart11dController
</script>
<script src="{{URL::asset('public/js/chart11d.js?v=').time()}}"></script>
@endif

</html>