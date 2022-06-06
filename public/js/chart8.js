var selectedDate = $('#date').val();
var firstmonth;
var lastmonth;
getPast12Months();
formatChartTitle();
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
$('#date').change(function() { //update chart on change input type month
    getPast12Months();
    formatChartTitle();
    myChart.data.labels = monthList;
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
                    
                ],
                backgroundColor: [
                    "#49a1ba"
                ],          
            },{
                label: 'HOR-ME',
                data: [
                    
                ],
                backgroundColor: [
                    "#ee7d31"
                ],          
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
                stacked: true,
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
                max: 1,
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