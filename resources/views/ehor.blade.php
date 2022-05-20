<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THKH - Customise EHOR</title>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/ehor.css?v=').time()}}">
</head>
<!--Include Nav Bar When Page Loads-->
@include('layouts/navigation')
<body>
    <div class="ehortitle">EDIT EHOR</div>
    <button type="button" class="location">Location Of Occurrence</button>
    <button type="button" class="site">Site Of Occurrence</button>
    <button type="button" class="type">Type Of Occurrence</button>
</body>
<script>

</script>
</html>