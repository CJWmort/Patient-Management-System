//" ... " is a spread syntax, similar to blade syntax
//spread syntax is used to include all objects in an array
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Oct-20", "Nov-20", "Dec-20", "Jan-21", "Feb-21", "Mar-21", "Apr-21",
                    "May-21", "Jun-21", "Jul-21", "Aug-21", "Sep-21"],
        datasets: [
            {
                label: 'Target Rate',
                data: [
                    
                ],
                backgroundColor: [
                    "#fdeada"
                ], 
                borderColor: ["#4f81bd"],
                borderWidth: 1,
                pointStyle: 'circle',
                yAxisID: 'rate'         
            },{
                label: 'Cat A/B',
                data: [
                    ...chartdataAnB,
                ],
                backgroundColor: [
                    "#4f81bd"
                ],          
            },{
                label: 'Cat C',
                data: [
                    ...chartdataC,
                ],
                backgroundColor: [
                    "#c0504d"
                ],          
            },{
                label: 'Cat D',
                data: [
                    ...chartdataD,
                ],
                backgroundColor: [
                    "#9bbb59"
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
                },
                display: true,
                position: "bottom",
                align: "start"
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
                max: 3,
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
                max: 4,
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