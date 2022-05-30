//" ... " is a spread syntax, similar to blade syntax
//spread syntax is used to include all objects in an array
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Sep-21"],
        datasets: [
            {
                label: 'Cat A',
                data: [
                    
                ],
                backgroundColor: [
                    "#94d8fc"
                ],          
            },{
                label: 'Cat B',
                data: [
                    
                ],
                backgroundColor: [
                    "#49a1ba"
                ],          
            },{
                label: 'Cat C',
                data: [
                    
                ],
                backgroundColor: [
                    "#fedf17"
                ],          
            },{
                label: 'Cat D',
                data: [
                    
                ],
                backgroundColor: [
                    "#c30505"
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
                    drawOnChartArea: false,
                    drawBorder: false,
                },
                ticks: {
                    color: 'black'
                }
            },
            y: {
                ticks: {
                    stepSize: 2,   
                    color: 'black'              
                },      
                beginAtZero: true,
                max: 10,
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