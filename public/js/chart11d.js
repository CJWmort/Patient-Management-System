const topData=[
    '1 East',
    '1 North',
    '1 West',
    'South 1',
    'South 2',
    'South 3',
    '2 South',
    '3 East',
    '3 North',
    '3 West'
]
const footData={
    '1 East': 0,
    '1 North':0,
    '1 West':0,
    'South 1':0,
    'South 2':0,
    'South 3':0,
    '2 South':0,
    '3 East':0,
    '3 North':0,
    '3 West':0,
    'total':0
}
$('#myChart').hide(); //Do not need to use chart js for this chart
$('#text').append(`
<div class="box">
    <div>South 1: 1501-1540</div>
    <div>South 2: 1601-1640</div>
    <div>South 3: 1541-1552, 1641-1658</div>
    <div>2 South : 2601-2610</div>
</div>
`);

// 获取当前年份信息
var selectedYear = $('#year').val();
// 获取每月信息
var janData = chartdata.filter( //Change Var name to 1East
    d => d.a_inccidentDate.split("-")[1] == '01'
);
var febData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '02'
);
var marData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '03'
);
var aprData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '04'
);
var mayData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '05'
);
var junData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '06'
);
var julData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '07'
);
var augData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '08'
);
var sepData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '09'
);
var octData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '10'
);
var novData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '11'
);
var decData = chartdata.filter(
    d => d.a_inccidentDate.split("-")[1] == '12'
)
var fieldData = chartdata.filter(
    d => selectedYear == d.a_inccidentDate.split("-")[0]
);
loadTable();
loadField();
function loadTable() { //function to load and display the table
    $('#table').empty();
    $('#table').append(`
    <table class = "table11d">
        <thead>
            <tr>
                <th rowspan = "2" style="background:yellow"> Year </th>
                <th rowspan = "2" style="background:yellow"> Month </th>
                <th colspan = "3" style="background:green"> Ward 1</th>
                <th colspan = "3"> South </th>
                <th>2 South </th>
                <th colspan = "3"> Ward 3</th>
                <th  rowspan = "2" style="color: red;background:#fff">Total Fall</th>
            </tr>
            <tr>
                <th style="background:green">1 East</th>
                <th style="background:green">1 North</th>
                <th style="background:green">1 West </th>
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
        <tr id="footTotal">
            <th colspan = "2">Total</th>
         </tr>
        </tbody>

    </table>
`);
 
}
$('#year').change(function () {
    footData={
        '1 East': 0,
        '1 North':0,
        '1 West':0,
        'South 1':0,
        'South 2':0,
        'South 3':0,
        '2 South':0,
        '3 East':0,
        '3 North':0,
        '3 West':0
    }
    if ($('#year').val().length != 4) {
        alert('Please Ensure Selected Year Value is Valid.');
    } else {
        selectedYear = $('#year').val();
        janData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '01'
        );
        febData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '02'
        );
        marData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '03'
        );
        aprData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '04'
        );
        mayData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '05'
        );
        junData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '06'
        );
        julData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '07'
        );
        augData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '08'
        );
        sepData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '09'
        );
        octData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '10'
        );
        novData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '11'
        );
        decData = chartdata.filter(
            d => d.a_inccidentDate.split("-")[1] == '12'
        );
        fieldData = chartdata.filter(
            d => d.a_inccidentDate.includes(selectedYear)
        );
        loadTable();
        loadField();
    }
})

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
        loadBlank()
    }    
};
function checkSum(data){
    let sum=0
    for(const item of data){

        sum+=item.fall_count
    }
    return sum
}
function loadBlank(){
    const jansum=checkSum(janData)
    const febsum=checkSum(febData)
    const junsum=checkSum(junData)
    const marsum=checkSum(marData)
    const aprsum=checkSum(aprData)
    const maysum=checkSum(mayData)
    const julsum=checkSum(julData)
    const augsum=checkSum(augData)
    const sepsum=checkSum(sepData)
    const octsum=checkSum(octData)
    const novsum=checkSum(novData)
    const decsum=checkSum(decData)
    footData.total=jansum+febsum+junsum+marsum+aprsum+maysum+julsum+augsum+sepsum+octsum+novsum+decsum
    topData.forEach(element=>{
        const d=janData.find(e=>e.WingLevel==element)
        console.log("这里打印每一次数据")
        console.log(d)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#jan').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#jan').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#jan').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#jan').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            console.log("没有数据走这里")
            if(element=='1 East'){
                $('#jan').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#jan').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#jan').append(`<td style="background:green"></td>`)
            }else{
                $('#jan').append(`<td></td>`)
            }
        }
    })
    $('#jan').append(`<td style="background:white">${jansum}</td>`)
    topData.forEach(element=>{
        const d=febData.find(e=>e.WingLevel==element)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#feb').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#feb').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#feb').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#feb').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            console.log("没有数据走这里")
            if(element=='1 East'){
                $('#feb').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#feb').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#feb').append(`<td style="background:green"></td>`)
            }else{
                $('#feb').append(`<td></td>`)
            }
        }
    })
    $('#feb').append(`<td style="background:white">${febsum}</td>`)
    topData.forEach(element=>{
        const d=marData.find(e=>e.WingLevel==element)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#mar').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#mar').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#mar').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#mar').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            if(element=='1 East'){
                $('#mar').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#mar').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#mar').append(`<td style="background:green"></td>`)
            }else{
                $('#mar').append(`<td></td>`)
            }
        }
    })
    $('#mar').append(`<td style="background:white">${marsum}</td>`)
    topData.forEach(element=>{
        const d=junData.find(e=>e.WingLevel==element)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#jun').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#jun').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#jun').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#jun').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            if(element=='1 East'){
                $('#jun').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#jun').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#jun').append(`<td style="background:green"></td>`)
            }else{
                $('#jun').append(`<td></td>`)
            }
        }
    })
    $('#jun').append(`<td style="background:white">${junsum}</td>`)
    topData.forEach(element=>{
        const d=aprData.find(e=>e.WingLevel==element)
        console.log("这里打印每一次数据")
        console.log(d)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#apr').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#apr').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#apr').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#apr').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            console.log("没有数据走这里")
            if(element=='1 East'){
                $('#apr').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#apr').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#apr').append(`<td style="background:green"></td>`)
            }else{
                $('#apr').append(`<td></td>`)
            }
        }
    })
    $('#apr').append(`<td style="background:white">${aprsum}</td>`)
    topData.forEach(element=>{
        const d=mayData.find(e=>e.WingLevel==element)
        console.log("这里打印每一次数据")
        console.log(d)
        
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#may').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#may').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#may').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#may').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            console.log("没有数据走这里")
            if(element=='1 East'){
                $('#may').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#may').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#may').append(`<td style="background:green"></td>`)
            }else{
                $('#may').append(`<td></td>`)
            }
        }
    })
    $('#may').append(`<td style="background:white"> ${maysum}</td>`)
    topData.forEach(element=>{
        const d=julData.find(e=>e.WingLevel==element)
        console.log("这里打印每一次数据")
        console.log(d)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#jul').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#jul').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#jul').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#jul').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            console.log("没有数据走这里")
            if(element=='1 East'){
                $('#jul').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#jul').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#jul').append(`<td style="background:green"></td>`)
            }else{
                $('#jul').append(`<td></td>`)
            }
        }
    })
    $('#jul').append(`<td style="background:white">${julsum}</td>`)
    topData.forEach(element=>{
        const d=augData.find(e=>e.WingLevel==element)
        console.log("这里打印每一次数据")
        console.log(d)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#aug').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#aug').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#aug').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#aug').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            console.log("没有数据走这里")
            if(element=='1 East'){
                $('#aug').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#aug').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#aug').append(`<td style="background:green"></td>`)
            }else{
                $('#aug').append(`<td></td>`)
            }
        }
    })
    $('#aug').append(`<td style="background:white">${augsum}</td>`)
    topData.forEach(element=>{
        const d=sepData.find(e=>e.WingLevel==element)
        console.log("这里打印每一次数据")
        console.log(d)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#sep').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#sep').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#sep').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#sep').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            if(element=='1 East'){
                $('#sep').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#sep').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#sep').append(`<td style="background:green"></td>`)
            }else{
                $('#sep').append(`<td></td>`)
            }
        }
    })
    $('#sep').append(`<td style="background:white">${sepsum}</td>`)
    topData.forEach(element=>{
        const d=octData.find(e=>e.WingLevel==element)
        console.log("这里打印每一次数据")
        console.log(d)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#oct').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#oct').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#oct').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#oct').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            console.log("没有数据走这里")
            if(element=='1 East'){
                $('#oct').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#oct').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#oct').append(`<td style="background:green"></td>`)
            }else{
                $('#oct').append(`<td></td>`)
            }
        }
    })
    $('#oct').append(`<td style="background:white">${octsum}</td>`)
    topData.forEach(element=>{
        const d=novData.find(e=>e.WingLevel==element)
        console.log("这里打印每一次数据")
        console.log(d)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#nov').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#nov').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#nov').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#nov').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            if(element=='1 East'){
                $('#nov').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#nov').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#nov').append(`<td style="background:green"></td>`)
            }else{
                $('#nov').append(`<td></td>`)
            }
        }
    })
    $('#nov').append(`<td style="background:white">${novsum}</td>`)
    topData.forEach(element=>{
        const d=decData.find(e=>e.WingLevel==element)
        console.log("这里打印每一次数据")
        console.log(d)
        if(d){
            footData[element]+=d.fall_count
            if(element=='1 East'){
                $('#dec').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 North'){
                $('#dec').append(`<td style="background:green">${d.fall_count}</td>`)
            }else if(element=='1 West'){
                $('#dec').append(`<td style="background:green">${d.fall_count}</td>`)
            }else{
                $('#dec').append(`<td>${d.fall_count}</td>`)
            }
        }else{
            if(element=='1 East'){
                $('#dec').append(`<td style="background:green"></td>`)
            }else if(element=='1 North'){
                $('#dec').append(`<td style="background:green"></td>`)
            }else if(element=='1 West'){
                $('#dec').append(`<td style="background:green"></td>`)
            }else{
                $('#dec').append(`<td></td>`)
            }
        }
    })
    $('#dec').append(`<td style="background:white">${decsum}</td>`)
    console.log("下方打印底部数据")
    console.log(footData)
    for(const key in footData){
        $('#footTotal').append(`<td>${footData[key]}</td>`)
    }
    
}


