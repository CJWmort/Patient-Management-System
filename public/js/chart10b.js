var selectedDate = $('#date').val();
var formattedDate = formatdate(selectedDate);
var catAdata;
var catAcount;
getCatAData();
function formatdate(date){ //format date to correct format 
    var selectedDate = new Date(date);
    var options = {year: '2-digit', month: 'short'};
    var formattedDate = selectedDate.toLocaleDateString("en-US", options);
    formattedDate = formattedDate.replace(' ', '-');
    return formattedDate;
};
function getCatAData(){
    selectedDate = $('#date').val();
    catAdata = chartdata.filter(
        d => d.j_ph_index == 'A' &&
        d.a_inccidentDate.includes(selectedDate, 0)
    );
    if (catAdata.length == 0){
        catAcount = 0;
    }
    else{
        catAcount = catAdata[0].error_count     
    }
}
$('#date').change(function() { //update chart label on change input type month
    getCatAData();
    myChart.data.labels[0] = formatdate($('#date').val());
    myChart.data.datasets[0].data = [catAcount];
    //myChart.data.datasets[1].data = [catBcount];
    myChart.update();  
});
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [formattedDate],
        datasets: [
            {
                label: 'Cat A',
                data: [
                    catAcount
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
                    text: 'No. of cases',
                    color: 'black'
                },
                position: 'left',
                grid: {
                    drawBorder: false,
                }
            }, 
        }
    }
});