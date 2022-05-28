//" ... " is a spread syntax, similar to blade syntax
//spread syntax is used to include all objects in an array
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Oct-20", "Nov-20", "Dec-20", "Jan-21", "Feb-21", "Mar-21", "Apr-21",
                    "May-21", "Jun-21", "Jul-21", "Aug-21", "Sep-21"],
        datasets: [{
            label: 'Cat A/B',
            data: [
                ...chartdata,
            ],
            backgroundColor: [
                "#4f81bd"
            ],          
        }
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
            },
            y: {
                ticks: {
                    stepSize: 0.5,                   
                },
                stacked: true,
                beginAtZero: true,
                max: 3
            }
        }
    }
});