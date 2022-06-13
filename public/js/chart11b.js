$('#myChart').hide(); //Hide default chart
var selectedDate = $('#date').val();
var lastYear;
var selectedYear;
var lastYearData;
var selectedYearData;
var lastyrSeverityList;
var lastyrInjuryList;
var lastyrInjuryData;
var selectedyrInjuryList;
var selectedyrInjuryData;
//Store calculated percentage 
formatChartTitle();
drawChart();
fetchData();

function fetchData(){
    lastyrMinorCount = 0;
    lastyrModerateCount = 0;
    lastyrMajorCount = 0;
    lastyrTotalCount = 0;
    lastyrInjuryList = [];
    lastyrInjuryData = [];

    selectedyrMinorCount = 0;
    selectedyrModerateCount = 0;
    selectedyrMajorCount = 0;
    selectedyrTotalCount = 0;
    selectedyrInjuryList = [];
    selectedyrInjuryData = [];

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
        }
        if(data.l_hpo_outcome == 'Moderate'){
            lastyrModerateCount += data.severity_count;
        }
        if(data.l_hpo_outcome == 'Major'){
            lastyrMajorCount += data.severity_count;                   
        }
        filtered = data.f_fall_injury_type.replace(/_/g, ' ').replace(/,/g, ' / ');
        lastyrInjuryList.push(filtered);
    });
    selectedYearData.forEach(data => {
        selectedyrTotalCount += data.severity_count;
        if(data.l_hpo_outcome == 'Minor'){
            selectedyrMinorCount += data.severity_count;
        }
        if(data.l_hpo_outcome == 'Moderate'){
            selectedyrModerateCount += data.severity_count;
        }
        if(data.l_hpo_outcome == 'Major'){
            selectedyrMajorCount += data.severity_count;
        }
        filtered = data.f_fall_injury_type.replace(/_/g, ' ').replace(/,/g, ' / ');
        selectedyrInjuryList.push(filtered);
    });
    //Get all injury type from last year
    lastyrInjuryList = lastyrInjuryList.filter((item,index) => lastyrInjuryList.indexOf(item) === index)
    //Get all injury type from selected year
    selectedyrInjuryList = selectedyrInjuryList.filter((item,index) => selectedyrInjuryList.indexOf(item) === index)
    lastyrInjuryList.forEach(data => {
        lastyrInjuryData.push(0); //Default 0 value for each injury type
    });
    selectedyrInjuryList.forEach(data => {
        selectedyrInjuryData.push(0); //Default 0 value for each injury type
    });
    lastYearData.forEach(data => { //Get severity count of each injury type from last year
        filtered = data.f_fall_injury_type.replace(/_/g, ' ').replace(/,/g, ' / ');
        index = lastyrInjuryList.indexOf(filtered);
        lastyrInjuryData[index] += data.severity_count;
    });
    selectedYearData.forEach(data => { //Get severity count of each injury type from selected year
        filtered = data.f_fall_injury_type.replace(/_/g, ' ').replace(/,/g, ' / ');
        index = selectedyrInjuryList.indexOf(filtered);
        selectedyrInjuryData[index] += data.severity_count;
    });
    lastyrInjuryData.forEach((data, index) => { //Get percentage of each injury type from last year
        percentage = Math.round(( data / lastyrTotalCount ) * 100);
        lastyrInjuryData[index] = percentage;
    });
    selectedyrInjuryData.forEach((data, index) => { //Get percentage of each injury type from last year
        percentage = Math.round(( data / selectedyrTotalCount ) * 100);
        selectedyrInjuryData[index] = percentage;
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
        <canvas id="myChart1"></canvas>
        <canvas id="myChart2"></canvas>
        <canvas id="myChart3"></canvas>
        <canvas id="myChart4"></canvas>
    `);
}
$('#date').change(function() { //update chart on change input type month-year
    formatChartTitle();
    fetchData();
    myChart1.options.plugins.title.text = lastYear;
    myChart1.data.datasets[0].data = [Math.round(lastYearMajor), Math.round(lastYearModerate), Math.round(lastYearMinor)];
    myChart2.options.plugins.title.text = selectedYear;
    myChart2.data.datasets[0].data = [Math.round(selectedYearMajor), Math.round(selectedYearModerate), Math.round(selectedYearMinor)];
    myChart3.options.plugins.title.text = lastYear;
    myChart3.data.labels = [...lastyrInjuryList];
    myChart3.data.datasets[0].data = [...lastyrInjuryData];
    myChart4.options.plugins.title.text = selectedYear;
    myChart4.data.labels = [...selectedyrInjuryList];
    myChart4.data.datasets[0].data = [...selectedyrInjuryData];
    myChart1.update();  
    myChart2.update();  
    myChart3.update();  
    myChart4.update();  
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
            ...lastyrInjuryList
        ],
        datasets: [{
            data: [...lastyrInjuryData],
            backgroundColor: [
                'rgb(255, 99, 132)',
            ],
            hoverOffset: 4,
          },
        ],
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

var ctx = document.getElementById("myChart4");
var myChart4 = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
            ...selectedyrInjuryList
        ],
        datasets: [{
            data: [...selectedyrInjuryData],
            backgroundColor: [
                'rgb(255, 99, 132)',
            ],
            hoverOffset: 4,
          },
        ],
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
$('#text').append(`
<span><b>Minor</b> - Resulted in application of a dressing, ice, cleaning of a wound, limb elevation, topical medication, bruise or abrasion</span><br><br>
<span><b>Moderate</b> - Resulted in suturing, application of steri-strip/skin glue, splinting, or muscle/joint strain</span><br><br>
<span><b>Major</b> - Resulted in surgery, casting, traction, required consultation for neurological (basilar skull fracture, small subdural hematoma) or internal injury (rib fracture, small liver laceration) or patients with coagulopathy who receive blood products as a result of the fall</span><br><br>
<span><b>Death</b> - Patient died as a result of injuries sustained from the fall (not from physiological event causing the fall)</span><br><br>
<span>% of injury = </span><sup>Type of injury </sup>&frasl;<sub> Total Fall with injury</sub>
`);