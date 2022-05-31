//" ... " is a spread syntax, similar to blade syntax
//spread syntax is used to include all objects in an array
var selectedDate = $('#date').val();
var formattedDate = formatdate(selectedDate);
var monthList = [];
function formatdate(date){ //format date to correct format 
    var selectedDate = new Date(date);
    var options = {year: '2-digit', month: 'short'};
    var formattedDate = selectedDate.toLocaleDateString("en-US", options);
    formattedDate = formattedDate.replace(' ', '-');
    return formattedDate;
};
function getPast12Months(){
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
$('#date').change(function() { //update chart on change input type month
    getPast12Months();
    myChart.data.labels = monthList;
    myChart.update();  
});
getPast12Months()
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
                
            },{
                label: 'Cat C',
                data: [
                    
                ],
                backgroundColor: [
                    "#c0504d"
                ],  
                  
            },{
                label: 'Cat D',
                data: [
                    
                ],
                backgroundColor: [
                    "#9bbb59"
                ],   
            },{
                label: 'Target Rate',
                data: [

                ],
                backgroundColor: [
                    "#fdeada"
                ], 
                borderColor: ["#4f81bd"],
                borderWidth: 1,        
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
                },
                display: true,
                position: "bottom",
                align: "start",

            },
            title: {
                display: true,
                text: 'Med Errors (Oct 2020 - Sep 2021)',
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
                    stepSize: 0.25,     
                    color: 'black'           
                },
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Medication error rate',
                    color: 'black',
                },
                position: 'right',
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
<span id="catD">Cat D:  </span>The error reached patient and required monitoring to confirm the result
`);