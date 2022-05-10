<head>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/nav.css')}}">
</head>
<div class="navigation">
    <div class="top-nav">
        <img src="{{URL::asset('public/images/thkh-logo.jpg')}}" class="nav-logo" alt="logo">
        <div class="search">
            <button class="searchBtn"><img src="{{URL::asset('public/images/search.png')}}" width="40px" alt="search"></button>
            <input type="text" class="searchInput" placeholder="Search By HOR No. / Year ...">
        </div>
        <img onclick="toggleNav();" src="{{URL::asset('public/images/user.png')}}" class="nav-profile" alt="accountLogo">
    </div>
</div>
<div class="user-nav">
    <div class="first-row">
        <img onclick="toggleNav();" src="{{URL::asset('public/images/close.png')}}" alt="close" class="closeBtn">
        <div class="user-detail">
            <p>Name: {{$data->name}}</p>
            <p>Role: {{$data->role}}</p>
        </div>
    </div>
    <a href="#" class="view-profile">View Profile</a>
    <a href="#" class="edit-profile">Edit Profile</a>
    <a href="#" class="change-password">Change Password</a>
    <a href="logout" class="logout">Logout</a>
</div>
<script>
    function toggleNav(){
        //Function to allow user to open and close profile navigation
        document.querySelector(".user-nav").classList.toggle('showusernav');
    }
</script>