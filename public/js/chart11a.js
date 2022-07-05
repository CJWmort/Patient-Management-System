$('#text').hide(); //Do not need text in this chart
var selectedDate = $('#date').val();
var firstmonth;
var lastmonth;
chartdata.forEach(element => { //format all a_inccidentDate fields to the correct format e.g(2021-09-01 to Sep-21)
    element.a_inccidentDate = formatdate(element.a_inccidentDate)
});
var injuryData = chartdata.filter( //Get data where fall resulted in injury
    d => d.f_fall_injury == 'yes'
);
var nonInjuryData = chartdata.filter( //Get data where fall did not result in injury
    d => d.f_fall_injury == 'no'
);

getPast12Months();
getPast12MonthsData();
formatChartTitle();
loadTable();
loadField();
loadData();

function formatdate(date){ //format date to correct format 
    var selectedDate = new Date(date);
    var options = {year: '2-digit', month: 'short'};
    var formattedDate = selectedDate.toLocaleDateString("en-US", options);
    formattedDate = formattedDate.replace(' ', '-');
    return formattedDate;
};
function getPast12Months(){ //get past 12 months based on selected starting month
    monthList = []; //Formatted month list (e.g, Oct-20)
    defaultMonthList = []; //Unformatted month list (e.g, 2020-10-1)
    selectedDate = $('#date').val();
    var d = new Date(selectedDate);
    var e = new Date(selectedDate);
    var monthName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var monthNum = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    d.setDate(1);
    e.setDate(1)
    for (i=0; i<=11; i++) {
        var year = d.getFullYear();
        monthList.unshift(monthName[d.getMonth()] + '-' + year.toString().substring(2,4));
        d.setMonth(d.getMonth() - 1);
    }
    for (i=0; i<=11; i++) {
        var year = e.getFullYear();
        defaultMonthList.unshift(year.toString() + '-' + monthNum[e.getMonth()] + '-1');
        e.setMonth(e.getMonth() - 1);
    }
};
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
};
function createDataSet(data, filtereddate, filtereddata){
    //Check if month is within filtered month-year range, push respective month and fall count if true
    data.forEach(data => {
        if(monthList.includes(data.a_inccidentDate)){
            filtereddate.push(data.a_inccidentDate);
            filtereddata.push(data.fall_count);
        };
    });
};
function getPast12MonthsData(){ //get data for the past 12 months based on selected month-year
    injuryFilteredDate = [];
    injuryFilteredData = [];
    nonInjuryFilteredDate = [];
    nonInjuryFilteredData = [];
    pastYrAverageData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //default will be 0 if no data
    targetRateData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
    ratePerPatientData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 

    chart11aData = chart11a_data.filter( //Data from chart11a_data table that are in the 12 month range
        d => monthList.includes(formatdate(d.a_inccidentDate))
    );
    chart11aData.forEach(data => {
        index = monthList.indexOf(formatdate(data.a_inccidentDate)) //Get index to enter data based on monthList
        pastYrAverageData[index] += data.past_yr_avg;
        targetRateData[index] += data.target_rate;
        ratePerPatientData[index] += data.rate_per_1000_patient_days;
    });  
    createDataSet(injuryData, injuryFilteredDate, injuryFilteredData);
    createDataSet(nonInjuryData, nonInjuryFilteredDate, nonInjuryFilteredData);
    //map array data with x(month) and y(fall count) values
    injuryDataset = injuryFilteredDate.map( function(x, i){
        return {"x": x, "y": injuryFilteredData[i]}        
    }.bind(this));
    nonInjuryDataset = nonInjuryFilteredDate.map( function(x, i){
        return {"x": x, "y": nonInjuryFilteredData[i]}        
    }.bind(this));
    //map array data with x(month) and y(past_yr_avg) values
    pastYrAvgDataset = monthList.map( function(x, i){
        return {"x": x, "y": pastYrAverageData[i]}        
    }.bind(this)); 
    //map array data with x(month) and y(target_rate) values
    targetRateDataset = monthList.map( function(x, i){
        return {"x": x, "y": targetRateData[i]}        
    }.bind(this));
    //map array data with x(month) and y(rate_per_1000_patient_days) values
    ratePerPatientDataset = monthList.map( function(x, i){
        return {"x": x, "y": ratePerPatientData[i]}        
    }.bind(this));
};
function loadData(){ //Load data for the fields in the table
    nonInjuryData.forEach(data => {
        //Get the field id that matches one of the 12 current selected month-year
        var myElement = document.getElementById('nonInjury' + data.a_inccidentDate);
        if(myElement){ //Check if that field with the correct id exist
            myElement.innerHTML = data.fall_count; //Change innerHTML of selected field to fall_count
        }
    });
    injuryData.forEach(data => {
        //Get the field id that matches one of the 12 current selected month-year
        var myElement = document.getElementById('injury' + data.a_inccidentDate);
        if(myElement){ //Check if that field with the correct id exist
            myElement.innerHTML = data.fall_count; //Change innerHTML of selected field to fall_count
        }
    });
    chart11a_data.forEach(data => {
        newDateFormat = formatdate(data.a_inccidentDate)
        $('#avg'+newDateFormat).val(data.past_yr_avg);
        $('#rate'+newDateFormat).val(data.target_rate);
        $('#patient'+newDateFormat).val(data.rate_per_1000_patient_days);
    });
}
$('#date').change(function() { //update chart on change input type month
    localStorage.setItem('chart11aDate', $('#date').val()) //Set current date value in localStorage
    getPast12Months();
    getPast12MonthsData();
    formatChartTitle();
    loadTable();
    loadField();
    loadData();
    myChart.data.labels = monthList;
    myChart.data.datasets[0].data = [...ratePerPatientDataset];
    myChart.data.datasets[1].data = [...pastYrAvgDataset];
    myChart.data.datasets[2].data = [...targetRateDataset];
    myChart.data.datasets[3].data = [...nonInjuryDataset];
    myChart.data.datasets[4].data = [...injuryDataset];
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
                label: 'Rate per 1000 patient days',
                data: [
                    ...ratePerPatientDataset
                ],
                type: 'line',
                backgroundColor: [
                    "#efc00c"
                ], 
                borderColor: ["#ffd032"],
                pointBorderColor: '#efc00c',
                borderWidth: 2,
                datalabels: {
                    display: false
                },
                pointStyle: 'rectRot',
                pointRadius: 4,
                yAxisID: 'rate',   
            },{
                label: 'Past year average',
                data: [
                    ...pastYrAvgDataset
                ],
                type: 'line',
                backgroundColor: [
                    "#d07f3c"
                ], 
                borderColor: ["#ffd032"],
                pointBorderColor: '#d07f3c',
                borderWidth: 2,
                pointStyle: 'rectRot',
                pointRadius: 4,
                datalabels: {
                    display: false
                },   
            },{
                label: 'Target rate',
                data: [
                    ...targetRateDataset
                ],
                type: 'line',
                backgroundColor: [
                    "#89a2c8"
                ], 
                borderColor: ["#333"],
                pointBorderColor: '#89a2c8',
                pointStyle: 'cross',
                borderWidth: 2,
                pointRadius: 5,
                borderDash: [10, 5],
                datalabels: {
                    display: false
                },   
            },{
                label: 'Fall (Non-Injury)',
                data: [
                    ...nonInjuryDataset
                ],
                backgroundColor: [
                    "#04b1f0"
                ],  
                borderColor: [
                    "#black"
                ],
                borderWidth: 1.5,
                borderAlign: "inner",
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                },   
                barPercentage: 1.0
            },{
                label: 'Fall (Injury)',
                data: [
                    ...injuryDataset
                ],
                backgroundColor: [
                    "#c30505"
                ],  
                borderColor: [
                    "#black"
                ],
                borderWidth: 1.5,
                borderAlign: "inner",
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                }, 
                barPercentage: 1.0
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
                },
                padding: {
                    bottom: 20
                },
            },
            datalabels: {
                formatter: ( val ) => {
                    return val.y
                },
                labels: {
                    value: {
                        color: 'black',
                        font: {
                            weight: '550',
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
                    drawTicks: true
                },
                ticks: {
                    color: 'black'
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
function loadTable(){ //function to load and display the table
$('#table').empty(); 
$('#table').append(`
<table class="table11a">
    <thead>
        <tr>
            <th id="emptyCell"></th>
            <th>${monthList[0]}</th>
            <th>${monthList[1]}</th>
            <th>${monthList[2]}</th>
            <th>${monthList[3]}</th>
            <th>${monthList[4]}</th>
            <th>${monthList[5]}</th>
            <th>${monthList[6]}</th>
            <th>${monthList[7]}</th>
            <th>${monthList[8]}</th>
            <th>${monthList[9]}</th>
            <th>${monthList[10]}</th>
            <th>${monthList[11]}</th>
        </tr>
    </thead>
    <tbody id="tableBody">

    </tbody>
    <input type="hidden" name="date[]" value=${defaultMonthList[0]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[1]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[2]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[3]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[4]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[5]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[6]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[7]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[8]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[9]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[10]}>
    <input type="hidden" name="date[]" value=${defaultMonthList[11]}>
    <input class="updateBtn" type="submit" value="Save Changes" 
    onclick="return confirm('All fall-related data from ${monthList[0]} to ${monthList[11]} will be updated. Proceed with Update?')">
</table>
`);
}
function loadField(){ //Create td with unique id so that we can select individually
$('#tableBody').append(`
    <tr class="nonInjury">
        <td class="field">Fall (Non-Injury)</td>
        <td id="nonInjury${monthList[0]}">0</td>
        <td id="nonInjury${monthList[1]}">0</td>
        <td id="nonInjury${monthList[2]}">0</td>
        <td id="nonInjury${monthList[3]}">0</td>
        <td id="nonInjury${monthList[4]}">0</td>
        <td id="nonInjury${monthList[5]}">0</td>
        <td id="nonInjury${monthList[6]}">0</td>
        <td id="nonInjury${monthList[7]}">0</td>
        <td id="nonInjury${monthList[8]}">0</td>
        <td id="nonInjury${monthList[9]}">0</td>
        <td id="nonInjury${monthList[10]}">0</td>
        <td id="nonInjury${monthList[11]}">0</td>
    </tr>
    <tr class="injury">
        <td class="field">Fall (Injury)</td>
        <td id="injury${monthList[0]}">0</td>
        <td id="injury${monthList[1]}">0</td>
        <td id="injury${monthList[2]}">0</td>
        <td id="injury${monthList[3]}">0</td>
        <td id="injury${monthList[4]}">0</td>
        <td id="injury${monthList[5]}">0</td>
        <td id="injury${monthList[6]}">0</td>
        <td id="injury${monthList[7]}">0</td>
        <td id="injury${monthList[8]}">0</td>
        <td id="injury${monthList[9]}">0</td>
        <td id="injury${monthList[10]}">0</td>
        <td id="injury${monthList[11]}">0</td>
    </tr>
    <tr class="average">
        <td class="field">Past year average</td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[0]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[1]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[2]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[3]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[4]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[5]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[6]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[7]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[8]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[9]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[10]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="avg[]" class="tableInput" id="avg${monthList[11]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
    </tr>
    <tr class="rate">
        <td class="field">Target rate</td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[0]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[1]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[2]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[3]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[4]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[5]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[6]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[7]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[8]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[9]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[10]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="rate[]" class="tableInput" id="rate${monthList[11]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
    </tr>
    <tr class="patientDay">
        <td class="field">Rate per 1000 patient days</td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[0]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[1]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[2]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[3]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[4]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[5]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[6]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[7]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[8]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[9]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[10]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
        <td><input name="patient[]" class="tableInput" id="patient${monthList[11]}" type="number" min="0" onchange='return true' oninput="Math.abs(this.value)" step="0.01" value="0"></td>
    </tr>
`);        
};

