$('#myChart').hide(); //Do not need chart js to display tables
$('#text').hide(); //Do not need to display text
var selectedYear = $('#year').val();
var janData = chartdata.filter(
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
loadTable(); //call function 
loadField();
$('#year').change(function() { //update year on change selected year
    if($('#year').val().length != 4){
        alert('Please Ensure Selected Year Value is Valid.');
    }
    else{
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
function loadTable(){ //function to load and display the table
$('#table').empty(); 
$('#table').append(`
<table class="table10c">
    <thead>
        <tr>
            <th id="yearSelected">${selectedYear}</th>
            <th>Total</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Apr</th>
            <th>May</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Aug</th>
            <th>Sep</th>
            <th>Oct</th>
            <th>Nov</th>
            <th>Dec</th>
        </tr>
    </thead>
    <tbody id="noData">

    </tbody>
    <tbody id="tableBody">

    </tbody>
    <tbody id="tableFooter">
        <tr>
            <td class="totalMedError">Total Medication Error</td>
            <td id="totalMedError"></td>
            <td class="subtotal" id="totaljan"></td>
            <td class="subtotal" id="totalfeb"></td>
            <td class="subtotal" id="totalmar"></td>
            <td class="subtotal" id="totalapr"></td>
            <td class="subtotal" id="totalmay"></td>
            <td class="subtotal" id="totaljun"></td>
            <td class="subtotal" id="totaljul"></td>
            <td class="subtotal" id="totalaug"></td>
            <td class="subtotal" id="totalsep"></td>
            <td class="subtotal" id="totaloct"></td>
            <td class="subtotal" id="totalnov"></td>
            <td class="subtotal" id="totaldec"></td>
        </tr>
    </tbody>
</table>
`);
}
function loadField(){
    if(fieldData.length == 0){ //Display message if no data in selected year
        $('#noData').append(`
            <tr>
                <td colspan="14">There are no data related to the selected year : ${selectedYear}</td>
            </tr>
        `);
        $('#tableFooter').empty(); //Hide the row that contains total medication error
    }
    var currentFields = []; //Store the current fields displayed
    var id = 1;
    var total;
    var totalMedError = []; //Store all total values into array
    var totaljan = 0; //Store total number of type error for each month respectively
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
    fieldData.forEach(element => {
        currentFields.push(element.f_medi_error + ' (' + element.j_ph_phase + ')')
        $('#tableBody').append(`
            <tr class="tableField">
                <td>${element.f_medi_error.replace(/_/g, ' ')} (${element.j_ph_phase})</td>
                <td class="totaltype" id="total${id}"></td>
                <td id="jan${id}"></td>
                <td id="feb${id}"></td>
                <td id="mar${id}"></td>
                <td id="apr${id}"></td>
                <td id="may${id}"></td>
                <td id="jun${id}"></td>
                <td id="jul${id}"></td>
                <td id="aug${id}"></td>
                <td id="sep${id}"></td>
                <td id="oct${id}"></td>
                <td id="nov${id}"></td>
                <td id="dec${id}"></td>
            </tr>
        `);        
        id++;
    });
    id = 1
    currentFields.forEach(field => {
        total = 0;
        janData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#jan' + id).html(data.type_count);
                total += data.type_count;
                totaljan += data.type_count;   
            }
        });
        $('#totaljan').html(totaljan);
        febData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#feb' + id).html(data.type_count);
                total += data.type_count;
                totalfeb += data.type_count;  
            }
        });
        $('#totalfeb').html(totalfeb);
        marData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#mar' + id).html(data.type_count);
                total += data.type_count;
                totalmar += data.type_count;  
            }
        });
        $('#totalmar').html(totalmar);
        aprData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#apr' + id).html(data.type_count);
                total += data.type_count;
                totalapr += data.type_count;  
            }
        });
        $('#totalapr').html(totalapr);
        mayData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#may' + id).html(data.type_count);
                total += data.type_count;
                totalmay += data.type_count; 
            }
        });
        $('#totalmay').html(totalmay);
        junData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#jun' + id).html(data.type_count);
                total += data.type_count;
                totaljun += data.type_count; 
            }
        });
        $('#totaljun').html(totaljun);
        julData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#jul' + id).html(data.type_count);
                total += data.type_count;
                totaljul += data.type_count; 
            }
        });
        $('#totaljul').html(totaljul);
        augData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#aug' + id).html(data.type_count);
                total += data.type_count;
                totalaug += data.type_count; 
            }
        });
        $('#totalaug').html(totalaug);
        sepData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#sep' + id).html(data.type_count);
                total += data.type_count;
                totalsep += data.type_count; 
            }
        });
        $('#totalsep').html(totalsep);
        octData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#oct' + id).html(data.type_count);
                total += data.type_count;
                totaloct += data.type_count;            
            }          
        });
        $('#totaloct').html(totaloct);
        novData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#nov' + id).html(data.type_count);
                total += data.type_count;
                totalnov += data.type_count;
            }
        });
        $('#totalnov').html(totalnov);
        decData.forEach(data => {
            if(data.f_medi_error + ' (' + data.j_ph_phase + ')' == field){
                $('#dec' + id).html(data.type_count);
                total += data.type_count;
                totaldec += data.type_count;
            }
        });
        $('#totaldec').html(totaldec);
        $('#total' + id).html(total);
        totalMedError.push(total); //Get all total values and push to an array
        $('#totalMedError').html(totalMedError.reduce((a, b) => a + b, 0)); //Display sum of all total values
        id++;
    });
}
