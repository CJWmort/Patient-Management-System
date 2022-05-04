<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Main</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
    <h1>This is the main page</h1>
    <p>Name: {{$data->name}}</p>
    <p>Email: {{$data->email}}</p>
    <a href="logout">Logout</a>
</body>
</html>