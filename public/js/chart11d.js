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
var janData = chartdata.filter( //Change Var name to 1East
    d => d.a_inccidentDate.includes(selectedYear + '-01')
);
var febData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-02')
);
var marData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-03')
);
var aprData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-04')
);
var mayData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-05')
);
var junData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-06')
);
var julData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-07')
);
var augData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-08')
);
var sepData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-09')
);
var octData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-10')
);
var novData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-11')
);
var decData = chartdata.filter(
    d => d.a_inccidentDate.includes(selectedYear + '-12')
);
var fieldData = fielddata.filter(
    d => d.year == selectedYear
);
loadTable();
loadField();
$('#year').change(function () { //update year on change selected year
    if ($('#year').val().length != 4) {
        alert('Please Ensure Selected Year Value is Valid.');
    }
    else {
        selectedYear = $('#year').val();
        janData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-01')
        );
        febData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-02')
        );
        marData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-03')
        );
        aprData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-04')
        );
        mayData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-05')
        );
        junData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-06')
        );
        julData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-07')
        );
        augData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-08')
        );
        sepData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-09')
        );
        octData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-10')
        );
        novData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-11')
        );
        decData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear + '-12')
        );
        fieldData = fielddata.filter(
            d => d.year == selectedYear
        );
        loadTable();
        loadField();
    }
});

function loadTable() { //function to load and display the table
    $('#table').empty();
    $('#table').append(`
    <table class = "table11d">
        <thead>
            <tr>
                <th rowspan = "2"> Year </th>
                <th rowspan = "2"> Month </th>
                <th colspan = "3"> Ward 1</th>
                <th colspan = "3"> South </th>
                <th>2 South </th>
                <th colspan = "3"> Ward 3</th>
                <th  rowspan = "2" style="color: red">Total Fall</th>
            </tr>
            <tr>
                <th>1 East</th>
                <th>1 North</th>
                <th>1 West </th>
                <th>South 1</th>
                <th>South 2</th>
                <th>South 3</th>
                <th>2 South</th>
                <th>3 East</th>
                <th>3 North</th>
                <th>3 West</th>
            </tr>
        </thead>

        <tbody id=noData>
            <tr id=nopeD>
                <th rowspan = "12">${selectedYear}</th>
                <th>Jan</th>
            </tr> 
            <tr>
                <th>Feb</th>
            </tr>
            <tr>
                <th>Mar</th>
            </tr>
            <tr>
                <th>Apr</th>
            </tr>
            <tr>
                <th>May</th>
            </tr>
            <tr>
                <th>Jun</th>
            </tr>
            <tr>
                <th>Jul</th>
            </tr>
            <tr>
                <th>Aug</th>
            </tr>
            <tr>
                <th>Sep</th>
            </tr>
            <tr>
                <th>Oct</th>
            </tr>
            <tr>
                <th>Nov</th>
            </tr>
            <tr>
                <th>Dec</th>
            </tr>
        </tbody>

        <tbody id='tData'>
            <tr id='jan'>
                <th rowspan = "12">${selectedYear}</th>
                <th>Jan</th>

            </tr>

            <tr id='feb'>
                <th>Feb</th>
                
            </tr>

            <tr id='mar'>
                <th>Mar</th>

            </tr>

            <tr id='apr'>
                <th>Apr</th>

            </tr>

            <tr id='may'>
                <th>May</th>

            </tr>
            
            <tr id='jun'>
                <th>Jun</th>

            </tr>

            <tr id='jul'>
                <th>Jul</th>

            </tr>

            <tr id='aug'>
                <th>Aug</th>

            </tr>

            <tr id='sep'>
                <th>Sep</th>

               
            </tr>

            <tr id='oct'>
                <th>Oct</th>

            </tr>

            <tr id='nov'>
                <th>Nov</th>

            </tr>

            <tr id='dec'>
                <th>Dec</th>

            </tr>


        </tbody>

        <tbody>
        <tr>
        <th colspan = "2">Total</th>

         </tr>
        </tbody>

    </table>
`);
}

function loadField() {
    if (fieldData.length == 0) { //Display message if no data in selected year
        $('#nopeD').append(`
                <td rowspan="12" colspan="14">There are no data related to the selected year : ${selectedYear}</td>
        `);
        $('#tData').hide();
        $('#tableFooter').empty(); //Hide the row that contains totalFall medication error
    }
    else {
        $('#noData').hide();
    }
    var currentFields = []; //Store the current fields displayed
    var id = 1;
    var totalFall;
    var total = [];
    var totaljan = 0;
    var totalfeb = 0;
    var totalmar = 0;
    var totalapr = 0;
    var totalmay = 0;
    var totaljun = 0;
    var totaljul = 0;
    var totalaug = 0;
    var totalsep = 0;
    var totaloct = 0;
    var totalnov = 0;
    var totaldec = 0;
    id = 1
    currentFields.forEach(field => {
        totalFall = 0;
        janData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) { //if (in jan and )
                $('#jan' + id).html(data.type_count);
                totalFall += data.type_count;
                totaljan += data.type_count;
            }
        });
        $('#totaljan').html(totaljan);

        febData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#feb' + id).html(data.type_count);
                totalFall += data.type_count;
                totalfeb += data.type_count;
            }
        });
        $('#totalfeb').html(totalfeb);
        marData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#mar' + id).html(data.type_count);
                totalFall += data.type_count;
                totalmar += data.type_count;
            }
        });
        $('#totalmar').html(totalmar);
        aprData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#apr' + id).html(data.type_count);
                totalFall += data.type_count;
                totalapr += data.type_count;
            }
        });
        $('#totalapr').html(totalapr);
        mayData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#may' + id).html(data.type_count);
                totalFall += data.type_count;
                totalmay += data.type_count;
            }
        });
        $('#totalmay').html(totalmay);
        junData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#jun' + id).html(data.type_count);
                totalFall += data.type_count;
                totaljun += data.type_count;
            }
        });
        $('#totaljun').html(totaljun);
        julData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#jul' + id).html(data.type_count);
                totalFall += data.type_count;
                totaljul += data.type_count;
            }
        });
        $('#totaljul').html(totaljul);
        augData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#aug' + id).html(data.type_count);
                totalFall += data.type_count;
                totalaug += data.type_count;
            }
        });
        $('#totalaug').html(totalaug);
        sepData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#sep' + id).html(data.type_count);
                totalFall += data.type_count;
                totalsep += data.type_count;
            }
        });
        $('#totalsep').html(totalsep);
        octData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#oct' + id).html(data.type_count);
                totalFall += data.type_count;
                totaloct += data.type_count;
            }
        });
        $('#totaloct').html(totaloct);
        novData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#nov' + id).html(data.type_count);
                totalFall += data.type_count;
                totalnov += data.type_count;
            }
        });
        $('#totalnov').html(totalnov);
        decData.forEach(data => {
            if (data.f_medi_error + ' (' + data.j_ph_phase + ')' == field) {
                $('#dec' + id).html(data.type_count);
                totalFall += data.type_count;
                totaldec += data.type_count;
            }
        });
        $('#totaldec').html(totaldec);
        $('#totalFall' + id).html(totalFall);
        total.push(totalFall); //Get all totalFall values and push to an array
        $(' total').html;
        total.reduce((a, b) => a + b, 0); //Display sum of all totalFall values
        id++;
    });
}

