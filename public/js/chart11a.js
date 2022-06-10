$('#text').hide(); //Do not need text in this chart
var selectedDate = $('#date').val();
var firstmonth;
var lastmonth;
chartdata.forEach(element => { //format all a_inccidentDate fields to the correct format e.g(2021-09-01 to Sep-21)
    element.a_inccidentDate = formatdate(element.a_inccidentDate)
});
var injuryData = chartdata.filter( //Get data where fall resulted in injury
    d => d.f_fall_injury == 'yes'
);
var nonInjuryData = chartdata.filter( //Get data where fall did not result in injury
    d => d.f_fall_injury == 'no'
);
getPast12Months();
getPast12MonthsData();
formatChartTitle();
loadTable();
loadField();
loadData();

function formatdate(date){ //format date to correct format 
    var selectedDate = new Date(date);
    var options = {year: '2-digit', month: 'short'};
    var formattedDate = selectedDate.toLocaleDateString("en-US", options);
    formattedDate = formattedDate.replace(' ', '-');
    return formattedDate;
};
function getPast12Months(){ //get past 12 months based on selected starting month
    monthList = [];
    selectedDate = $('#date').val();
    var d = new Date(selectedDate);
    var monthName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    d.setDate(1);
    for (i=0; i<=11; i++) {
        var year = d.getFullYear();
        monthList.unshift(monthName[d.getMonth()] + '-' + year.toString().substring(2,4));
        d.setMonth(d.getMonth() - 1);
    }
};
function formatChartTitle(){ //format the date for chart title example(Oct 20 - Sep 21)
    titleMonthList = [];
    selectedDate = $('#date').val();
    var d = new Date(selectedDate);
    var monthName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    d.setDate(1);
    for (i=0; i<=11; i++) {
        var year = d.getFullYear().toString().substring(2,4);
        titleMonthList.unshift(monthName[d.getMonth()] + ' ' + year);
        d.setMonth(d.getMonth() - 1);
    }
    firstmonth = titleMonthList[0];
    lastmonth = titleMonthList[11];
};
function createDataSet(data, filtereddate, filtereddata){
    //Check if month is within filtered month-year range, push respective month and fall count if true
    data.forEach(element => {
        if(monthList.includes(element.a_inccidentDate)){
            filtereddate.push(element.a_inccidentDate);
            filtereddata.push(element.fall_count);
        };
    });
};
function getPast12MonthsData(){ //get data for the past 12 months based on selected month-year
    injuryFilteredDate = [];
    injuryFilteredData = [];
    nonInjuryFilteredDate = [];
    nonInjuryFilteredData = [];
    createDataSet(injuryData, injuryFilteredDate, injuryFilteredData)
    createDataSet(nonInjuryData, nonInjuryFilteredDate, nonInjuryFilteredData)
    //map array data with x(month) and y(fall count) values
    injuryDataset = injuryFilteredDate.map( function(x, i){
        return {"x": x, "y": injuryFilteredData[i]}        
    }.bind(this));
    nonInjuryDataset = nonInjuryFilteredDate.map( function(x, i){
        return {"x": x, "y": nonInjuryFilteredData[i]}        
    }.bind(this));
};
$('#date').change(function() { //update chart on change input type month
    getPast12Months();
    getPast12MonthsData();
    formatChartTitle();
    loadTable();
    loadField();
    loadData();
    myChart.data.labels = monthList;
    myChart.data.datasets[3].data = [...nonInjuryDataset];
    myChart.data.datasets[4].data = [...injuryDataset];
    myChart.options.plugins.title.text = 'Falls (' + firstmonth + ' - ' + lastmonth + ')'
    myChart.update();  
});
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: monthList,
        datasets: [
            {
                label: 'Rate per 1000 patient days',
                data: [
                    
                ],
                type: 'line',
                backgroundColor: [
                    "#efc00c"
                ], 
                borderColor: ["#ffd032"],
                pointBorderColor: '#efc00c',
                borderWidth: 2,
                datalabels: {
                    display: false
                },
                pointStyle: 'rectRot',
                pointRadius: 4,
                yAxisID: 'rate',   
            },{
                label: 'Past year average',
                data: [
                    
                ],
                type: 'line',
                backgroundColor: [
                    "#d07f3c"
                ], 
                borderColor: ["#ffd032"],
                pointBorderColor: '#d07f3c',
                borderWidth: 2,
                pointStyle: 'rectRot',
                pointRadius: 4,
                datalabels: {
                    display: false
                },   
            },{
                label: 'Target rate',
                data: [
                    
                ],
                type: 'line',
                backgroundColor: [
                    "#89a2c8"
                ], 
                borderColor: ["#333"],
                pointBorderColor: '#89a2c8',
                pointStyle: 'cross',
                borderWidth: 2,
                pointRadius: 5,
                borderDash: [10, 5],
                datalabels: {
                    display: false
                },   
            },{
                label: 'Fall (Non-Injury)',
                data: [
                    ...nonInjuryDataset
                ],
                backgroundColor: [
                    "#04b1f0"
                ],  
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                },   
                barPercentage: 1.0
            },{
                label: 'Fall (Injury)',
                data: [
                    ...injuryDataset
                ],
                backgroundColor: [
                    "#c30505"
                ],  
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                }, 
                barPercentage: 1.0
            },
        ],
    },
    plugins: [ChartDataLabels],
    options: {
        layout: {
            padding: {
                left: 30,
                right: 30,
                top: 20,
                bottom: 20
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: "black",
                },
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: 'Falls (' + firstmonth + ' - ' + lastmonth + ')',
                font: {
                    size: 22
                },
                padding: {
                    bottom: 20
                },
            },
            datalabels: {
                formatter: ( val ) => {
                    return val.y
                },
                labels: {
                    value: {
                        color: 'black',
                        font: {
                            weight: '550',
                            size: 14
                        }
                    },
                },
            },
        },
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: true,
                    drawOnChartArea: false,
                    drawTicks: true
                },
                ticks: {
                    color: 'black'
                },
            },
            y: {
                ticks: {
                    stepSize: 1,   
                    color: 'black',          
                },      
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Falls',
                    color: 'black',
                    font: {
                        weight: '800',
                        size: 13
                    }  
                },
                position: 'left',
                grid: {
                    drawBorder: true,
                    drawTicks: true,
                    drawOnChartArea: false,
                }
            }, 
            rate: {
                ticks: {
                    stepSize: 0.2,     
                    color: 'black'           
                },
                beginAtZero: true,
                title: {
                    display: true,
                    color: 'black',
                },
                position: 'right',
                grid: {
                    drawBorder: true,
                    drawTicks: true,
                    drawOnChartArea: false,
                }
            }
        }
    }
});
function loadTable(){ //function to load and display the table
$('#table').empty(); 
$('#table').append(`
<table class="table11a">
    <thead>
        <tr>
            <th id="emptyCell"></th>
            <th>${monthList[0]}</th>
            <th>${monthList[1]}</th>
            <th>${monthList[2]}</th>
            <th>${monthList[3]}</th>
            <th>${monthList[4]}</th>
            <th>${monthList[5]}</th>
            <th>${monthList[6]}</th>
            <th>${monthList[7]}</th>
            <th>${monthList[8]}</th>
            <th>${monthList[9]}</th>
            <th>${monthList[10]}</th>
            <th>${monthList[11]}</th>
        </tr>
    </thead>
    <tbody id="tableBody">

    </tbody>
</table>
`);
}
function loadField(){ //Create td with unique id so that we can select individually
$('#tableBody').append(`
    <tr class="nonInjury">
        <td class="field">Fall (Non-Injury)</td>
        <td id="nonInjury${monthList[0]}">0</td>
        <td id="nonInjury${monthList[1]}">0</td>
        <td id="nonInjury${monthList[2]}">0</td>
        <td id="nonInjury${monthList[3]}">0</td>
        <td id="nonInjury${monthList[4]}">0</td>
        <td id="nonInjury${monthList[5]}">0</td>
        <td id="nonInjury${monthList[6]}">0</td>
        <td id="nonInjury${monthList[7]}">0</td>
        <td id="nonInjury${monthList[8]}">0</td>
        <td id="nonInjury${monthList[9]}">0</td>
        <td id="nonInjury${monthList[10]}">0</td>
        <td id="nonInjury${monthList[11]}">0</td>
    </tr>
    <tr class="injury">
        <td class="field">Fall (Injury)</td>
    </tr>
    <tr class="average">
        <td class="field">Past year average</td>
    </tr>
    <tr class="rate">
        <td class="field">Target rate</td>
    </tr>
    <tr class="patientDay">
        <td class="field">Rate per 1000 patient days</td>
    </tr>
`);        
};
function loadData(){
    nonInjuryData.forEach(data => {
        var myElement = document.getElementById('nonInjury' + data.a_inccidentDate);
        if(myElement){
            myElement.innerHTML = data.fall_count;
        }
    });
}
