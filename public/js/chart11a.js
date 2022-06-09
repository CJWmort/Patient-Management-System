var selectedDate = $('#date').val();
var firstmonth;
var lastmonth;
getPast12Months();
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
$('#date').change(function() { //update chart on change input type month
    getPast12Months();
    formatChartTitle();
    myChart.data.labels = monthList;
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
                label: 'Med error (Cat C to I) per monthly HOR',
                data: [
                    
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
                    
                ],
                backgroundColor: [
                    "#4f81bd"
                ],  
                
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
                    drawTicks: true
                },
                ticks: {
                    color: 'black'
                }
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