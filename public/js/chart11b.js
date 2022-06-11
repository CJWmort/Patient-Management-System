$('#myChart').hide(); //Hide default chart
var selectedDate = $('#date').val();
var lastYear;
var selectedYear;
var lastYearData;
var selectedYearData;
//Store calculated percentage 
formatChartTitle();
drawChart();
drawTable();
fetchData();

function fetchData(){
    majorList = [];
    moderateList = [];
    minorList = [];
    lastyrMinorCount = 0;
    lastyrModerateCount = 0;
    lastyrMajorCount = 0;
    lastyrTotalCount = 0;

    selectedyrMinorCount = 0;
    selectedyrModerateCount = 0;
    selectedyrMajorCount = 0;
    selectedyrTotalCount = 0;

    lastYearData = chartdata.filter( //Get all data from last year of selected month-year
        d => d.a_inccidentDate.includes(lastYear, 0)
    );
    selectedYearData = chartdata.filter( //Get all data from selected month-year to end of selected year
        d => d.a_inccidentDate <= selectedDate + 1 &&
        d.a_inccidentDate >= selectedYear + '-01-01'
    );
    lastYearData.forEach(data => {
        lastyrTotalCount += data.severity_count;
        if(data.l_hpo_outcome == 'Minor'){
            lastyrMinorCount += data.severity_count;
            filtered = data.f_fall_injury_type.replace(/_/g, ' ').replace(/,/g, ' / ');
            minorList.push(filtered);
        }
        if(data.l_hpo_outcome == 'Moderate'){
            lastyrModerateCount += data.severity_count;
            filtered = data.f_fall_injury_type.replace(/_/g, ' ').replace(/,/g, ' / ');
            moderateList.push(filtered);
        }
        if(data.l_hpo_outcome == 'Major'){
            lastyrMajorCount += data.severity_count;
            filtered = data.f_fall_injury_type.replace(/_/g, ' ').replace(/,/g, ' / ');
            majorList.push(filtered);
            
        }
    });
    selectedYearData.forEach(data => {
        selectedyrTotalCount += data.severity_count;
        if(data.l_hpo_outcome == 'Minor'){
            selectedyrMinorCount += data.severity_count;
            filtered = data.f_fall_injury_type.replace(/_/g, ' ').replace(/,/g, ' / ');
            minorList.push(filtered);
        }
        if(data.l_hpo_outcome == 'Moderate'){
            selectedyrModerateCount += data.severity_count;
            filtered = data.f_fall_injury_type.replace(/_/g, ' ').replace(/,/g, ' / ');
            moderateList.push(filtered);
        }
        if(data.l_hpo_outcome == 'Major'){
            selectedyrMajorCount += data.severity_count;
            filtered = data.f_fall_injury_type.replace(/_/g, ' ').replace(/,/g, ' / ');
            majorList.push(filtered);
        }
    });
    //Remove duplicate fields before adding to table
    majorList = majorList.filter((item,index) => majorList.indexOf(item) === index)
    moderateList = moderateList.filter((item,index) => moderateList.indexOf(item) === index)
    minorList = minorList.filter((item,index) => minorList.indexOf(item) === index)
    id = 1;
    majorList.forEach(data => {
        $('#tableBody1').append(`<tr id="major${id}"><td class="align-left">${data}</td></tr>`);
        id++;
    });
    id = 1;
    moderateList.forEach(data => {
        $('#tableBody2').append(`<tr id="moderate${id}"><td class="align-left">${data}</td></tr>`);
        id++;
    });
    id = 1;
    minorList.forEach(data => {
        $('#tableBody3').append(`<tr id="minor${id}"><td class="align-left">${data}</td></tr>`);
        id++;
    });

    lastYearMinor = ( lastyrMinorCount / lastyrTotalCount ) * 100
    lastYearModerate = ( lastyrModerateCount / lastyrTotalCount ) * 100
    lastYearMajor = ( lastyrMajorCount / lastyrTotalCount ) * 100
    selectedYearMinor = ( selectedyrMinorCount / selectedyrTotalCount ) * 100
    selectedYearModerate = ( selectedyrModerateCount / selectedyrTotalCount ) * 100
    selectedYearMajor = ( selectedyrMajorCount / selectedyrTotalCount ) * 100
}
function formatChartTitle(){ //Change chart title based on selected month-year
    selectedDate = $('#date').val();
    var d = new Date(selectedDate);
    lastYear = d.getFullYear()-1; //Get last year of selected month-year
    selectedYear = d.getFullYear();
    $('.chartsubtitle').html('(' + lastYear + ' - ' + formatdate(selectedDate) + ')');
}
function formatdate(date){ //format date to correct format 
    var selectedDate = new Date(date);
    var options = {year: 'numeric', month: 'short'};
    var formattedDate = selectedDate.toLocaleDateString("en-US", options);
    formattedDate = formattedDate.replace(' ', '-');
    return formattedDate;
};
function drawChart(){
    //Create 4 new chart because we need to display 4 doughnut charts
    $('.doughnut').append(` 
        <div class="chart-grid">
            <canvas id="myChart1"></canvas>
            <canvas id="myChart2"></canvas>
            <canvas id="myChart3"></canvas>
            <canvas id="myChart4"></canvas>
        </div>
        <table class="chart11b">

        </table>
    `);
}
function drawTable(){
    $('.chart11b').empty();
    $('.chart11b').append(`
        <thead>
            <th class="align-left">Major Injury</th>
            <th>${lastYear}</th>
            <th>${selectedYear}</th>
        </thead>
        <tbody id="tableBody1">
    
        </tbody>
        <thead>
            <th class="align-left">Moderate Injury</th>
            <th>${lastYear}</th>
            <th>${selectedYear}</th>
        </thead>
        <tbody id="tableBody2">
    
        </tbody>
        <thead>
            <th class="align-left">Minor Injury</th>
            <th>${lastYear}</th>
            <th>${selectedYear}</th>
        </thead>
        <tbody id="tableBody3">
    
        </tbody>
    `);
};
$('#date').change(function() { //update chart on change input type month-year
    formatChartTitle();
    fetchData();
    drawTable();
    fetchData();
    myChart1.options.plugins.title.text = lastYear;
    myChart1.data.datasets[0].data = [Math.round(lastYearMajor), Math.round(lastYearModerate), Math.round(lastYearMinor)];
    myChart2.options.plugins.title.text = selectedYear;
    myChart2.data.datasets[0].data = [Math.round(selectedYearMajor), Math.round(selectedYearModerate), Math.round(selectedYearMinor)];
    myChart1.update();  
    myChart2.update();  

});
var ctx = document.getElementById("myChart1");
var myChart1 = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
            'Major', 'Moderate', 'Minor'
        ],
        datasets: [{
            data: [Math.round(lastYearMajor), Math.round(lastYearModerate), Math.round(lastYearMinor)],
            backgroundColor: [
              '#4f81bd',
              '#c0504d',
              '#9bbb59'
            ],
            hoverOffset: 4,
          }],
    },
    plugins: [ChartDataLabels],
    options: {
        layout: {
            padding: {
                left: 60,
                right: 60,
                top: 20,
                bottom: 20
            },
        },
        plugins: {
            title: {
                display: true,
                position: "bottom",
                text: lastYear,
                font: {
                    size: 22,
                },
                color: 'black'
            },
            legend: {
                labels: {
                    color: "black",
                    boxWidth: 12
                },
                display: true,
                position: "bottom",
            },
            datalabels: {
                formatter: function( value, context){
                    return [context.chart.data.labels[context.dataIndex], value + '%'] 
                },
                labels: {
                    value: {
                        color: 'black'
                    },
                },
            },
        },
    }
});

var ctx = document.getElementById("myChart2");
var myChart2 = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
            'Major', 'Moderate', 'Minor'
        ],
        datasets: [{
            data: [Math.round(selectedYearMajor), Math.round(selectedYearModerate), Math.round(selectedYearMinor)],
            backgroundColor: [
              '#4f81bd',
              '#c0504d',
              '#9bbb59'
            ],
            hoverOffset: 4,
          }],
    },
    plugins: [ChartDataLabels],
    options: {
        layout: {
            padding: {
                left: 60,
                right: 60,
                top: 20,
                bottom: 20
            },
        },
        plugins: {
            title: {
                display: true,
                position: "bottom",
                text: selectedYear,
                font: {
                    size: 22,
                },
                color: 'black'
            },
            legend: {
                labels: {
                    color: "black",
                    boxWidth: 12
                },
                display: true,
                position: "bottom",
            },
            datalabels: {
                formatter: function( value, context){
                    return [context.chart.data.labels[context.dataIndex], value + '%'] 
                },
                labels: {
                    value: {
                        color: 'black'
                    },
                },
            },
        },
    }
});

var ctx = document.getElementById("myChart3");
var myChart3 = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }],
    },
    plugins: [ChartDataLabels],
    options: {
        layout: {
            padding: {
                left: 60,
                right: 60,
                top: 20,
                bottom: 20
            },
        },
    }
});

var ctx = document.getElementById("myChart4");
var myChart4 = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }],
    },
    plugins: [ChartDataLabels],
    options: {
        layout: {
            padding: {
                left: 60,
                right: 60,
                top: 20,
                bottom: 20
            },
        },
    }
});