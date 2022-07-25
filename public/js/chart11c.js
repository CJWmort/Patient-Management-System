var selectedDate = $('#date').val();
var currentFields;
var fallData;
fetchData();

function formatdate(date){ //format date to correct format 
    var selectedDate = new Date(date);
    var options = {year: 'numeric', month: 'short'};
    var formattedDate = selectedDate.toLocaleDateString("en-US", options);
    return formattedDate;
};
function fetchData(){
    currentFields = [];
    fallData = [];
    fielddata.forEach(data => {
        currentFields.push(data.WingLevel); //Get all existing Wing Level and store into array
        fallData.push(0); //Set each Wing Level's default fall count to be 0
    });
    selectedData = chartdata.filter( //Get all data from selected month-year
        d => d.a_inccidentDate.includes(selectedDate, 0)
    );
    selectedData.forEach(data => {
        index = currentFields.indexOf(data.WingLevel); //Find the index where Wing Level name matches with Wing Level array
        fallData[index] += 1; //Increment the fall count of the respective Wing Level for each record
    });
    totalFallCount = fallData.reduce((a,b) => a + b, 0); //get total fall count from all Wing Level
    $('#total').html('<b>Total: </b>' + totalFallCount);
}
$('#date').change(function() { //update chart on change input type month-year
    selectedDate = $('#date').val();
    fetchData();
    myChart.options.plugins.title.text = formatdate(selectedDate) + ' (Ward / Wing Level)';
    myChart.data.datasets[0].data = [...fallData];
    myChart.update();  
});
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: currentFields,
        datasets: [
            {
                data: [
                    ...fallData
                ],
                backgroundColor: [
                    "#04b1f0"
                ],  
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                },      
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
                display: false,
            },
            title: {
                display: true,
                text: formatdate(selectedDate) + ' (Ward / Wing Level)',
                font: {
                    size: 22,
                },
                padding: {
                    bottom: 20
                }
            },
            datalabels: {
                formatter: ( val ) => {
                    return val.y
                },
                labels: {
                    value: {
                        color: 'black',
                        font: {
                            size: 14
                        }
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
                    drawBorder: true,
                },
                ticks: {
                    color: 'black',
                    minRotation: 45,
                    font: {
                        size: 18,
                    }
                },
            },
            y: {
                ticks: {
                    stepSize: 5,   
                    color: 'black',  
                },      
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'No. of Falls',
                    color: 'black',
                    font: {
                        weight: '800',
                        size: 13
                    }  
                },
                grid: {
                    drawTicks: false,
                    drawOnChartArea: false,
                },
                position: 'left',
            }, 
        }
    }
});
$('#text').append(`
<div class="box">
    <div>South 1: 1501-1540</div>
    <div>South 2: 1601-1640</div>
    <div>South 3: 1541-1552, 1641-1658</div>
    <div>2 South : 2601-2610</div>
</div>
`);