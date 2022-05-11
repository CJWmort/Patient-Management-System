<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Manage Users</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/profile.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    <table>
        <th>
            <tr>
                <th>header1</th>
                <th>header2</th>
                <th>header3</th>
            </tr>
        </th>
        <tbody>
            <tr>
                <td>text1.1</td>
                <td>text1.2</td>
                <td>text1.3</td>
            </tr>
            <tr>
                <td>text2.1</td>
                <td>text2.2</td>
                <td>text2.3</td>
            </tr>
            <tr>
                <td>text3.1</td>
                <td>text3.2</td>
                <td>text3.3</td>
            </tr>
            <tr>
            </tr>
        </tbody>
    </table>
</body>
</html>