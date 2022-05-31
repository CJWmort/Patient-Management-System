var selectedDate = $('#date').val();
var formattedDate = formatdate(selectedDate);
var catAcount;
var catBcount;
var catCcount;
var catDcount;
getAllCategoryData();
function formatdate(date){ //format date to correct format 
    var selectedDate = new Date(date);
    var options = {year: '2-digit', month: 'short'};
    var formattedDate = selectedDate.toLocaleDateString("en-US", options);
    formattedDate = formattedDate.replace(' ', '-');
    return formattedDate;
};
function getAllCategoryData(){
    total = 0;
    selectedDate = $('#date').val();
    var catAdata = chartdata.filter(
        d => d.j_ph_index == 'A' &&
        d.a_inccidentDate.includes(selectedDate, 0)
    );
    var catBdata = chartdata.filter(
        d => d.j_ph_index == 'B' &&
        d.a_inccidentDate.includes(selectedDate, 0)
    );
    var catCdata = chartdata.filter(
        d => d.j_ph_index == 'C' &&
        d.a_inccidentDate.includes(selectedDate, 0)
    );
    var catDdata = chartdata.filter(
        d => d.j_ph_index == 'D' &&
        d.a_inccidentDate.includes(selectedDate, 0)
    );
    if (catAdata.length != 0){
        catAcount = catAdata[0].error_count;
        total += catAcount;
    }else{
        catAcount = 0
    }

    if (catBdata.length != 0){
        catBcount = catBdata[0].error_count;
        total += catBcount;
    }else{
        catBcount = 0
    }

    if (catCdata.length != 0){
        catCcount = catCdata[0].error_count;
        total += catCcount;
    }else{
        catCcount = 0
    }

    if (catDdata.length != 0){
        catDcount = catDdata[0].error_count;
        total += catDcount;
    }else{
        catDcount = 0
    }
    $('#total').html('<b>Total: ' + total + '</b>')
}
$('#date').change(function() { //update chart on change input type month
    getAllCategoryData();
    myChart.data.labels[0] = formatdate($('#date').val());
    myChart.data.datasets[0].data = [catAcount];
    myChart.data.datasets[1].data = [catBcount];
    myChart.data.datasets[2].data = [catCcount];
    myChart.data.datasets[3].data = [catDcount];
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
                    "#04b1f0"
                ],          
            },{
                label: 'Cat B',
                data: [
                    catBcount
                ],
                backgroundColor: [
                    "#49a1ba"
                ],          
            },{
                label: 'Cat C',
                data: [
                    catCcount
                ],
                backgroundColor: [
                    "#fedf17"
                ],          
            },{
                label: 'Cat D',
                data: [
                    catDcount
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
                    boxWidth: 12,
                    font: {
                        weight: '600',
                    }
                },
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                font: {
                    size: 22,
                }
            },
            datalabels: {
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
                    color: 'black',
                    font: {
                        weight: '600',
                        size: 12
                    }
                },   
            },
            y: {
                ticks: {
                    stepSize: 1,   
                    color: 'black',            
                },      
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'No. of cases',
                    color: 'black',
                    font: {
                        weight: '600',
                        size: 13
                    }  
                },
                position: 'left',
                grid: {
                    drawBorder: false,
                }
            }, 
        }
    }
});
$('#text').append(`
<span id="catA">Cat A:  </span>The event that have the capacity to cause error <strong>(Near Misses)</strong><br>
<span id="catB">Cat B:  </span>The error did not reach patient <strong>(Near Misses)</strong><br>
<span id="catC">Cat C:  </span>The error reached patient but did not cause patient harm<br>
<span id="catD">Cat D:  </span>The error reached patient and required monitoring to confirm the result<br>
<b>Cat E:  </b>The error resulted in temporary harm to patient. Intervention required<br>
<b>Cat F:  </b>The error resulted in temporary harm to patient. Initial or prolonged hospitalization required<br>
<b>Cat G:  </b>The error resulted in permanent patient harm<br>
<b>Cat H:  </b>The error resulted in patient requiring intervention necessary to sustain life<br>
<b>Cat I:  </b>The error resulted in patient's death<br>
`);