//" ... " is a spread syntax, similar to blade syntax
//spread syntax is used to include all objects in an array
var selectedDate = $('#date').val();
if(localStorage.getItem('targetRate') != null){ //Assign local storage value for targetRate if exists
    document.getElementById('rate').value = localStorage.getItem('targetRate');
} else{ //Default target rate value will be 1 if no target rate values in localStorage
    document.getElementById('rate').value = 1;
}
var firstmonth;
var lastmonth;
var medErrorRate;
var highestRate;
var targetRateList = [];
for (var i = 0; i < 12; i++){
    targetRateList.push($('#rate').val())
}
getPast12Months();
//Format all months to match x axis format
formatCategoryDate(chartdata)
var catAnBdata = chartdata.filter(
    d => d.j_ph_index == 'A' ||
    d.j_ph_index == 'B'
);
var catCdata = chartdata.filter(
    d => d.j_ph_index == 'C'
);
var catDdata = chartdata.filter(
    d => d.j_ph_index == 'D'
);
var catEdata = chartdata.filter(
    d => d.j_ph_index == 'E'
);
var catFdata = chartdata.filter(
    d => d.j_ph_index == 'F'
);
var catGdata = chartdata.filter(
    d => d.j_ph_index == 'G'
);
var catHdata = chartdata.filter(
    d => d.j_ph_index == 'H'
);
var catIdata = chartdata.filter(
    d => d.j_ph_index == 'I'
);
var medErrorData = chartdata.filter(
    d => d.j_ph_index != 'A' && 
    d.j_ph_index != 'B'
);
getPast12MonthsData();
formatChartTitle();
function formatCategoryDate(category){
    //change a_inccidentDate format to same format as month format on chart
    category.forEach(element => { 
        element.a_inccidentDate = formatdate(element.a_inccidentDate)
    });
}
function formatChartTitle(){ //format the date for chart title example(Oct 2020 - Sep 2021)
    titleMonthList = [];
    selectedDate = $('#date').val();
    var d = new Date(selectedDate);
    var monthName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    d.setDate(1);
    for (i=0; i<=11; i++) {
        var year = d.getFullYear();
        titleMonthList.unshift(monthName[d.getMonth()] + ' ' + year);
        d.setMonth(d.getMonth() - 1);
    }
    firstmonth = titleMonthList[0];
    lastmonth = titleMonthList[11];
}
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
}
function createDataSet(categorydata, filtereddate, filtereddata){
    //Check if month is within filtered month-year range, push respective month and error count if true
    categorydata.forEach(element => {
        if(monthList.includes(element.a_inccidentDate)){
            filtereddate.push(element.a_inccidentDate);
            filtereddata.push(element.error_count);
        }
    });
}
function getPast12MonthsData(){ //get data for the past 12 months based on selected month-year
    catAnBfilteredDate = [];
    catAnBfilteredData = [];
    catCfilteredDate = [];
    catCfilteredData = [];
    catDfilteredDate = [];
    catDfilteredData = [];
    catEfilteredDate = [];
    catEfilteredData = [];
    catFfilteredDate = [];
    catFfilteredData = [];
    catGfilteredDate = [];
    catGfilteredData = [];
    catHfilteredDate = [];
    catHfilteredData = [];
    catIfilteredDate = [];
    catIfilteredData = [];
    numMedErrorDate = [];
    numMedErrorData = [];
    totalMedErrorDate = [];
    totalMedErrorData = [];
    createDataSet(catAnBdata, catAnBfilteredDate, catAnBfilteredData);
    createDataSet(catCdata, catCfilteredDate, catCfilteredData);
    createDataSet(catDdata, catDfilteredDate, catDfilteredData);
    createDataSet(catEdata, catEfilteredDate, catEfilteredData);
    createDataSet(catFdata, catFfilteredDate, catFfilteredData);
    createDataSet(catGdata, catGfilteredDate, catGfilteredData);
    createDataSet(catHdata, catHfilteredDate, catHfilteredData);
    createDataSet(catIdata, catIfilteredDate, catIfilteredData);
    createDataSet(medErrorData, numMedErrorDate, numMedErrorData);
    createDataSet(chartdata, totalMedErrorDate, totalMedErrorData);
    //map array data with x(month) and y(error count) values
    catAnBdataset = catAnBfilteredDate.map( function(x, i){
        return {"x": x, "y": catAnBfilteredData[i]}        
    }.bind(this));
    catCdataset = catCfilteredDate.map( function(x, i){
        return {"x": x, "y": catCfilteredData[i]}        
    }.bind(this));
    catDdataset = catDfilteredDate.map( function(x, i){
        return {"x": x, "y": catDfilteredData[i]}        
    }.bind(this));
    catEdataset = catEfilteredDate.map( function(x, i){
        return {"x": x, "y": catEfilteredData[i]}        
    }.bind(this));
    catFdataset = catFfilteredDate.map( function(x, i){
        return {"x": x, "y": catFfilteredData[i]}        
    }.bind(this));
    catGdataset = catGfilteredDate.map( function(x, i){
        return {"x": x, "y": catGfilteredData[i]}        
    }.bind(this));
    catHdataset = catHfilteredDate.map( function(x, i){
        return {"x": x, "y": catHfilteredData[i]}        
    }.bind(this));
    catIdataset = catIfilteredDate.map( function(x, i){
        return {"x": x, "y": catIfilteredData[i]}        
    }.bind(this));
    //Sum all value if key has duplicate for number of med error (Cat C to I)
    numMedErrorDataSet = numMedErrorDate.map( function(x, i){
        return {"x": x, "y": numMedErrorData[i]}        
    }.bind(this));
    var holder = {};
    numMedErrorDataSet.forEach(function(d) {
        if (holder.hasOwnProperty(d.x)) {
            holder[d.x] = holder[d.x] + d.y;
        } else {
            holder[d.x] = d.y;
        }
    });
    numMedErrorDataSet = [];
    for (var prop in holder) {
        numMedErrorDataSet.push({ x: prop, y: holder[prop] });
    }
    //Sum all value if key has duplicate for all med error (Cat A to I)
    totalMedErrorDataSet = totalMedErrorDate.map( function(x, i){
        return {"x": x, "y": totalMedErrorData[i]}        
    }.bind(this));
    var holder = {};
    totalMedErrorDataSet.forEach(function(d) {
        if (holder.hasOwnProperty(d.x)) {
            holder[d.x] = holder[d.x] + d.y;
        } else {
            holder[d.x] = d.y;
        }
    });
    totalMedErrorDataSet = [];
    for (var prop in holder) {
        totalMedErrorDataSet.push({ x: prop, y: holder[prop] });
    }
    var numMedErrorList = []; //Store med error count for Cat C to I
    var totalMedErrorList = [];// Store med error count for all Category
    var monthWithData = [];//Store months that have data
    numMedErrorDataSet.forEach(data => {
        numMedErrorList.push(data.y);
        monthWithData.push(data.x);
    });
    totalMedErrorDataSet.forEach(data => {
        totalMedErrorList.push(data.y);
    });
    //Divide values in numMedErrorList with totalMedErrorList values this will return the med error rate values
    var medError = numMedErrorList.map(function(n, i) { return n / totalMedErrorList[i]; });
    //Create map array of x(months that have med error) and y(med error rate) values
    medError = monthWithData.map( function(x, i){
        return {"x": x, "y": medError[i]}        
    }.bind(this));
    //emptyDataSet will create an array of x(current 12 months selected) and y(start with value of 0) values
    emptyDataSet = monthList.map( function(x, i){
        return {"x": x, "y": 0}        
    }.bind(this));
    //Merge medError and emptyDataSet arrays together and replace objects based on the key
    medErrorRate = Object.values(
        [].concat(emptyDataSet, medError)
            .reduce((r, c) => (r[c.x] = Object.assign((r[c.x] || {}), c), r), {})
    );
    //Get the highest value for Med Error Rate
    highestRate = Math.max(...medErrorRate.map(o => o.y))
}

$('#date').change(function() { //update chart on change input type month
    getPast12Months();
    getPast12MonthsData();
    formatChartTitle();
    myChart.data.labels = monthList;
    myChart.data.datasets[0].data = [...medErrorRate];
    myChart.data.datasets[1].data = [...catAnBdataset];
    myChart.data.datasets[2].data = [...catCdataset];
    myChart.data.datasets[3].data = [...catDdataset];
    myChart.data.datasets[4].data = [...catEdataset];
    myChart.data.datasets[5].data = [...catFdataset];
    myChart.data.datasets[6].data = [...catGdataset];
    myChart.data.datasets[7].data = [...catHdataset];
    myChart.data.datasets[8].data = [...catIdataset];
    myChart.options.plugins.title.text = 'Med Errors (' + firstmonth + ' - ' + lastmonth + ')'
    myChart.update();  
});
$('#rate').change(function() { //update target rate on change input target rate
    targetRateList = [];
    targetRate = $('#rate').val(); //Get current target rate value
    localStorage.setItem('targetRate', targetRate) //Set current target rate value in localStorage
    targetRate = localStorage.getItem('targetRate')
    for (var i = 0; i < 12; i++){
        targetRateList.push(targetRate)
    }
    myChart.data.datasets[9].data = [...targetRateList];
    myChart.update();  
});
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: monthList,
        datasets: [
            {
                label: 'Med error (Cat C to I) per monthly HOR',
                data: [
                    ...medErrorRate
                ],
                type: 'line',
                backgroundColor: [
                    "#627331"
                ], 
                borderColor: ["#627331"],
                borderWidth: 3,
                datalabels: {
                    display: false
                },
                yAxisID: 'rate',   
            },{
                label: 'Cat A/B',
                data: [
                    ...catAnBdataset
                ],
                backgroundColor: [
                    "#4f81bd"
                ],  
                
            },{
                label: 'Cat C',
                data: [
                    ...catCdataset
                ],
                backgroundColor: [
                    "#c0504d"
                ],  
                  
            },{
                label: 'Cat D',
                data: [
                    ...catDdataset
                ],
                backgroundColor: [
                    "#9bbb59"
                ],   
            },{
                label: 'Cat E',
                data: [
                    ...catEdataset
                ],
                backgroundColor: [
                    "#8064a2"
                ],   
            },{
                label: 'Cat F',
                data: [
                    ...catFdataset
                ],
                backgroundColor: [
                    "#4bacc6"
                ],   
            },{
                label: 'Cat G',
                data: [
                    ...catGdataset
                ],
                backgroundColor: [
                    "#f79646"
                ],   
            },{
                label: 'Cat H',
                data: [
                    ...catHdataset
                ],
                backgroundColor: [
                    "#f79646"
                ],   
            },{
                label: 'Cat I',
                data: [
                    ...catIdataset
                ],
                backgroundColor: [
                    "#772c2a"
                ],   
            },{
                label: 'Target Rate',
                data: [
                    ...targetRateList
                ],
                fill: true,
                type: 'line',
                backgroundColor: [
                    "#fdeada"
                ], 
                borderColor: ["#4f81bd"],
                borderWidth: 2,   
                borderDash: [10, 5],
                datalabels: {
                    display: false,
                },
                pointRadius: 0,
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
                text: 'Med Errors (' + firstmonth + ' - ' + lastmonth + ')',
                font: {
                    size: 22
                }
            },
            datalabels: {
                formatter: ( val ) => {
                    return val.y
                },
                labels: {
                    value: {
                        color: 'black'
                    },
                },
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: true,
                    drawOnChartArea: false,
                    drawBorder: false,
                    drawTicks: true
                },
                ticks: {
                    color: 'black'
                }
            },
            y: {
                ticks: {
                    stepSize: 0.5,   
                    color: 'black'              
                },      
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'No of Medication Error',
                    color: 'black'
                },
                position: 'left',
                grid: {
                    drawBorder: false,
                }
            }, 
            rate: {
                ticks: {
                    stepSize: 0.5,     
                    color: 'black'           
                },
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Medication error rate',
                    color: 'black',
                },
                position: 'right',
                max: highestRate + 3,
                grid: {
                    drawOnChartArea: false,
                    drawBorder: false,
                    drawTicks: false
                }
            }
        }
    }
});
$('#text').append(`
<span id="catA">Cat A:  </span>The event that have the capacity to cause error <strong>(Near Misses)</strong><br>
<span id="catB">Cat B:  </span>The error did not reach patient <strong>(Near Misses)</strong><br>
<span id="catC">Cat C:  </span>The error reached patient but did not cause patient harm<br>
<span id="catD">Cat D:  </span>The error reached patient and required monitoring to confirm the result<br><br>
<span class="medError">Med error (C to I) rates: </span><sup>Number of Med error (C to I) </sup>&frasl;<sub> Total Med error HOR reported</sub><br><br>
<span id="targetRate">Target rate: Previous year's average of "<span class="medError">Med error (C to I) rates</span>"</span>
`);