var selectedDate = $('#date').val();
var firstmonth;
var lastmonth;
chartdata.forEach(element => { //format all a_inccidentDate fields to the correct format e.g(2021-09-01 to Sep-21)
    element.a_inccidentDate = formatdate(element.a_inccidentDate)
});
var medicationData = chartdata.filter( 
    d => d.f_occurType == 'medication'
);
var fallData = chartdata.filter(
    d => d.f_occurType == 'fall'
);
getPast12Months();
getPast12MonthsData();
formatChartTitle();

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
}
function createDataSet(data, filtereddate, filtereddata){
    //Check if month is within filtered month-year range, push respective month and error count if true
    data.forEach(element => {
        if(monthList.includes(element.a_inccidentDate)){
            filtereddate.push(element.a_inccidentDate);
            filtereddata.push(element.serious_count);
        };
    });
}
function getPast12MonthsData(){ //get data for the past 12 months based on selected month-year
    medfilteredDate = [];
    medfilteredData = [];
    fallfilteredDate = [];
    fallfilteredData = [];
    createDataSet(medicationData, medfilteredDate, medfilteredData)
    createDataSet(fallData, fallfilteredDate, fallfilteredData)
    //map array data with x(month) and y(error count) values
    medEventDataset = medfilteredDate.map( function(x, i){
        return {"x": x, "y": medfilteredData[i]}        
    }.bind(this));
    fallEventDataset = fallfilteredDate.map( function(x, i){
        return {"x": x, "y": fallfilteredData[i]}        
    }.bind(this));
    var total = medfilteredData.concat(fallfilteredData); //Merge the count values for falls and medication events
    totalData = total.reduce((partialSum, a) => partialSum + a, 0); //Sum all values in total array
    $('#total').html('<b>Total: ' + totalData + '</b>')
}
$('#date').change(function() { //update chart on change input type month
    getPast12Months();
    getPast12MonthsData();
    formatChartTitle();
    myChart.data.labels = monthList;
    myChart.data.datasets[0].data = [...fallEventDataset];
    myChart.data.datasets[1].data = [...medEventDataset];
    myChart.options.plugins.title.text = 'SRE cases (' + firstmonth + ' - ' + lastmonth + ')'
    myChart.update();  
});
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: monthList,
        datasets: [
            {
                label: 'HOR-Falls',
                data: [
                    ...fallEventDataset
                ],
                backgroundColor: [
                    "#49a1ba"
                ],    
                barPercentage: 1.0      
            },{
                label: 'HOR-ME',
                data: [
                    ...medEventDataset
                ],
                backgroundColor: [
                    "#ee7d31"
                ],         
                barPercentage: 1.0 
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
            legend: {
                labels: {
                    color: "black",
                    boxWidth: 12
                },
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: 'SRE cases (' + firstmonth + ' - ' + lastmonth + ')',
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
                grid: {
                    display: true,
                    drawOnChartArea: false,
                    drawBorder: false,
                },
                ticks: {
                    color: 'black'
                }
            },
            y: {
                ticks: {
                    stepSize: 1,   
                    color: 'black'              
                },      
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'No. of SRE reported',
                    color: 'black'
                },
                position: 'left',

            }, 
        }
    }
});
$('#text').append(`
<span><b>Process owner</b>: HPO</span><br><br>
<span><b>Data Description</b>: KPI tracks the number of “serious reportable events” that occurred in AMKH each month.</span>
`);