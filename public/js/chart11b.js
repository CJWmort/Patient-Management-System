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