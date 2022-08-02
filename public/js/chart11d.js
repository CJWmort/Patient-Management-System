$('#myChart').hide(); //Do not need to use chart js for this chart
$('#text').append(`
<div class="box">
    <div>South 1: 1501-1540</div>
    <div>South 2: 1601-1640</div>
    <div>South 3: 1541-1552, 1641-1658</div>
    <div>2 South : 2601-2610</div>
</div>
`);
var selectedYear = $('#year').val();
fetchData();
loadTable();
loadData();
$('#year').change(function () { //update year on change selected year
    if ($('#year').val().length != 4) {
        alert('Please Ensure Selected Year Value is Valid.');
    }
    else {
        selectedYear = $('#year').val();
        fetchData();
        loadTable();
        loadData();
    }
});
function fetchData(){
    fields = [];
    subfields = [];
    fieldsColumn = [];
    fielddata.forEach(data =>{ //Get all existing fields
        if(data.year == selectedYear){
            fields.push(data.wardNo);
        }
    });
    fields.forEach(data => { //Set default column span to be 0 for each field
        fieldsColumn.push(0);
    })
    subfielddata.forEach(data => { //Increase column span based on number of sub fields of fields
        if(data.year == selectedYear){
            index = fields.indexOf(data.wardNo);
            subfields.push(data.WingLevel);
            fieldsColumn[index]++;
        }
    })
}
function loadTable() { //function to load and display the table
    $('#table').empty();
    $('#table').append(`
    <table class = "table11d">
        <thead>
            <tr id="field">
                <th style="background-color: #ffe699" rowspan='2'>Year</th>
                <th style="background-color: #ffe699" rowspan='2'>Month</th>
            </tr>
            <tr id='subfield'>

            </tr>
        </thead>
        <tbody>
            <tr>
                <th style="background-color: #b4c6e7" id="yearCell" rowspan = "13">${selectedYear}</th>
            </tr> 
            <tr id='jan'>
                <th style="background-color: #b4c6e7">Jan</th>
            </tr>
            <tr id='feb'>
                <th style="background-color: #b4c6e7">Feb</th>
            </tr>
            <tr id='mar'>
                <th style="background-color: #b4c6e7">Mar</th>
            </tr>
            <tr id='apr'>
                <th style="background-color: #b4c6e7">Apr</th>
            </tr>
            <tr id='may'>
                <th style="background-color: #b4c6e7">May</th>
            </tr>
            <tr id='jun'>
                <th style="background-color: #b4c6e7">Jun</th>
            </tr>
            <tr id='jul'>
                <th style="background-color: #b4c6e7">Jul</th>
            </tr>
            <tr id='aug'>
                <th style="background-color: #b4c6e7">Aug</th>
            </tr>
            <tr id='sep'>
                <th style="background-color: #b4c6e7">Sep</th>
            </tr>
            <tr id='oct'>
                <th style="background-color: #b4c6e7">Oct</th>
            </tr>
            <tr id='nov'>
                <th style="background-color: #b4c6e7">Nov</th>
            </tr>
            <tr id='dec'>
                <th style="background-color: #b4c6e7">Dec</th>
            </tr>
            <tr id='totalcount'>
                <th style="background-color: #b4c6e7" colspan = "2">Total</th>
            </tr>
        </tbody>
    </table>
`);
if(subfields.length == 0){ //Display message if no data in selected year
    $('#yearCell').html('There are no data related to the selected year : <br><br> ' + selectedYear);
}
fields.forEach((data, index) => {
    $('#field').append(`
        <th style="background-color: #ddebf7" colspan='${fieldsColumn[index]}'>${data}</th>
    `)
});
$('#field').append(`<th style="background-color: white; color: red" rowspan="2">Total Fall</th>`)
id = 0;
subfields.forEach(data => {
    $('#subfield').append(`<th style="background-color: #ddebf7">${data}</th>`);
    $('#jan').append(`<td style="background-color: #ddebf7" id="jan${id}"></td>`);
    $('#feb').append(`<td style="background-color: #ddebf7" id="feb${id}"></td>`);
    $('#mar').append(`<td style="background-color: #ddebf7" id="mar${id}"></td>`);
    $('#apr').append(`<td style="background-color: #ddebf7" id="apr${id}"></td>`);
    $('#may').append(`<td style="background-color: #ddebf7" id="may${id}"></td>`);
    $('#jun').append(`<td style="background-color: #ddebf7" id="jun${id}"></td>`);
    $('#jul').append(`<td style="background-color: #ddebf7" id="jul${id}"></td>`);
    $('#aug').append(`<td style="background-color: #ddebf7" id="aug${id}"></td>`);
    $('#sep').append(`<td style="background-color: #ddebf7" id="sep${id}"></td>`);
    $('#oct').append(`<td style="background-color: #ddebf7" id="oct${id}"></td>`);
    $('#nov').append(`<td style="background-color: #ddebf7" id="nov${id}"></td>`);
    $('#dec').append(`<td style="background-color: #ddebf7" id="dec${id}"></td>`);
    $('#totalcount').append(`<td style="background-color: #b4c6e7" id="totalcount${id}"></td>`);
    id++;
});
$('#jan').append(`<td style="background-color: white" id='janfall'></td>`);
$('#feb').append(`<td style="background-color: white" id="febfall"></td>`);
$('#mar').append(`<td style="background-color: white" id="marfall"></td>`);
$('#apr').append(`<td style="background-color: white" id="aprfall"></td>`);
$('#may').append(`<td style="background-color: white" id="mayfall"></td>`);
$('#jun').append(`<td style="background-color: white" id="junfall"></td>`);
$('#jul').append(`<td style="background-color: white" id="julfall"></td>`);
$('#aug').append(`<td style="background-color: white" id="augfall"></td>`);
$('#sep').append(`<td style="background-color: white" id="sepfall"></td>`);
$('#oct').append(`<td style="background-color: white" id="octfall"></td>`);
$('#nov').append(`<td style="background-color: white" id="novfall"></td>`);
$('#dec').append(`<td style="background-color: white" id="decfall"></td>`);
$('#totalcount').append(`<td style="background-color: #b4c6e7" id="totalfall"></td>`);
}

function loadData(){
    totaljan = 0;
    totalfeb = 0;
    totalmar = 0;
    totalapr = 0;
    totalmay = 0;
    totaljun = 0;
    totaljul = 0;
    totalaug = 0;
    totalsep = 0;
    totaloct = 0;
    totalnov = 0;
    totaldec = 0;
    janData = []; //stores fall count for each wing level in January
    febData = [];
    marData = [];
    aprData = [];
    mayData = [];
    junData = [];
    julData = [];
    augData = [];
    sepData = [];
    octData = [];
    novData = [];
    decData = [];
    totalcount = [];
    totalfall = 0;
    selectedData = chartdata.filter( //Get all data required that are in selected year
        d => d.a_inccidentDate.includes(selectedYear, 0)
    );
    subfields.forEach(data => { //Default total 0 value for each sub fields
        janData.push(0);
        febData.push(0);
        marData.push(0);
        aprData.push(0);
        mayData.push(0);
        junData.push(0);
        julData.push(0);
        augData.push(0);
        sepData.push(0);
        octData.push(0);
        novData.push(0);
        decData.push(0);
        totalcount.push(0);
    });
    selectedData.forEach(data => {
        index = subfields.indexOf(data.WingLevel);
        totalcount[index] += 1; //Increment respective total count field based on ward sub fields
        if(data.a_inccidentDate.includes(selectedYear + '-01')){
            janData[index] += 1;
            $('#jan'+index).html(janData[index]);
            totaljan += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-02')){
            febData[index] += 1;
            $('#feb'+index).html(febData[index]);
            totalfeb += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-03')){
            marData[index] += 1;
            $('#mar'+index).html(marData[index]);
            totalmar += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-04')){
            aprData[index] += 1;
            $('#apr'+index).html(aprData[index]);
            totalapr += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-05')){
            mayData[index] += 1;
            $('#may'+index).html(mayData[index]);
            totalmay += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-06')){
            junData[index] += 1;
            $('#jun'+index).html(junData[index]);
            totaljun += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-07')){
            julData[index] += 1;
            $('#jul'+index).html(julData[index]);
            totaljul += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-08')){
            augData[index] += 1;
            $('#aug'+index).html(augData[index]);
            totalaug += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-09')){
            sepData[index] += 1;
            $('#sep'+index).html(sepData[index]);
            totalsep += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-10')){
            octData[index] += 1;
            $('#oct'+index).html(octData[index]);
            totaloct += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-11')){
            novData[index] += 1;
            $('#nov'+index).html(novData[index]);
            totalnov += 1;
        }
        if(data.a_inccidentDate.includes(selectedYear + '-12')){
            decData[index] += 1;
            $('#dec'+index).html(decData[index]);
            totaldec += 1;
        }
    });
    totalfall = totaljan + totalfeb + totalmar + totalapr + totalmay + totaljun + totaljul + totalaug + totalsep + totaloct + totalnov + totaldec; //sum total fall of all 12 months
    $('#janfall').html(totaljan > 0 ? totaljan : '');
    $('#febfall').html(totalfeb > 0 ? totalfeb : '');
    $('#marfall').html(totalmar > 0 ? totalmar : '');
    $('#aprfall').html(totalapr > 0 ? totalapr : '');
    $('#mayfall').html(totalmay > 0 ? totalmay : '');
    $('#junfall').html(totaljun > 0 ? totaljun : '');
    $('#julfall').html(totaljul > 0 ? totaljul : '');
    $('#augfall').html(totalaug > 0 ? totalaug : '');
    $('#sepfall').html(totalsep > 0 ? totalsep : '');
    $('#octfall').html(totaloct > 0 ? totaloct : '');
    $('#novfall').html(totalnov > 0 ? totalnov : '');
    $('#decfall').html(totaldec > 0 ? totaldec : '');

    totalcount.forEach((count, index) => {
        $('#totalcount' + index).html(count);
    });

    $('#totalfall').html(totalfall);
}