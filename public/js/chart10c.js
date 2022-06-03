$('#filter').append(`
    <label>Enter Selected Year:</label>
    <input type="number" id="year" min="0" onchange='return true' value="2021" oninput="this.value = Math.abs(this.value)" required>
`);
$('#myChart').hide(); //Do not need chart js to display tables
var selectedYear = $('#year').val();
loadTable();
$('#year').change(function() { //update year on change selected year
    if($('#year').val().length != 4){
        alert('Please Ensure Selected Year Value is Valid.');
    }
    else{
        selectedYear = $('#year').val();
        loadTable();
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
    <tbody>
        <tr>
            <td>Administered of discontinued medication</td>
        </tr>
        <tr>
            <td>Drug administered at the wrong dosage</td>
        </tr>
        <tr>
            <td>Drug administered at the wrong frequency</td>
        </tr>
        <tr>
            <td>Drug administered at the wrong time</td>
        </tr>
        <tr>
            <td>Drug administered/ dispensed to the wrong patient</td>
        </tr>
        <tr>
            <td>Mixed medication with other patient</td>
        </tr>
        <tr>
            <td>Omission of dose</td>
        </tr>
        <tr>
            <td>Transcription Error</td>
        </tr>
        <tr>
            <td>Wrong dosage prescribed</td>
        </tr>
        <tr>
            <td>Wrong drug / dosage dispensed</td>
        </tr>
        <tr>
            <td>Wrong drug form administered</td>
        </tr>
        <tr>
            <td>Wrong drug form dispensed</td>
        </tr>
        <tr>
            <td>Wrong drug form prescribed</td>
        </tr>
        <tr>
            <td>Wrong medication label</td>
        </tr>
        <tr>
            <td>Wrong patient sticky label pasted</td>
        </tr>
        <tr>
            <td>Others</td>
        </tr>
        <tr>
            <td class="totalMedError">Total Medication Error</td>
        </tr>
    </tbody>
</table>
`);
}
