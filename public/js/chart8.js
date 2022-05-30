var ctx = document.getElementById("myChart");
var myChart = new CharacterData(ctx, {
    type: 'bar',
    data: {
        labels: ["Oct-20","Nov-20","Dec-20","Jan-21","Feb-21","Mar-21","Apr-21",
                "May-21","Jun-21","Jul-21","Aug-20","Sep-20"],
        dataset: [
            {
                label: 'HOR - FALLS',
                data: [],
                backgroundColor: [],
            },
            {
                label: 'HOR - ME',
                data: [],
                backgroundColor: [],
            },
        ]
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
                    color: "black"
                },
                display: true,
                position: "bottom",
                align: "center"
            },
            title: {
                display: true,
                text: 'SRE cases (Oct 20 - Sep 21)',
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
                    drawOnChartArea:false,
                    drawBorder: false,
                    drawTicks: true,
                },
                ticks: {
                    color: 'black',
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
                    text: 'No. of SRE Reported',
                    color: 'black'
                },
                position: 'left',
                grid: {
                    drawBorder: false,
                }
            }, 
        }
    }
})