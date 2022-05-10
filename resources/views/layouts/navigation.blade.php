<head>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/nav.css?v=').time()}}">
</head>
<div class="navigation">
    <div class="top-nav">
        <a href="main"><img src="{{URL::asset('public/images/thkh-logo.jpg')}}" class="nav-logo" alt="logo"></a>
        <form action="#" method="#">
            {{ csrf_field() }}
            <div class="search">
                <button class="searchBtn"><img src="{{URL::asset('public/images/search.png')}}" width="40px" alt="search"></button>
                <input type="text" class="searchInput" placeholder="Search By HOR No. / Year ...">
            </div>
        </form>
        <img onclick="toggleNav();" src="{{URL::asset('public/images/user.png')}}" class="nav-profile" alt="accountLogo">
    </div>
</div>
<div class="user-nav">
    <div class="first-row">
        <img onclick="toggleNav();" src="{{URL::asset('public/images/close.png')}}" alt="close" class="closeBtn">
        <div class="user-detail">
            <p><b>Name: </b>{{$data->name}}</p>
            <p><b>Role: </b>{{$data->role}}</p>
        </div>
    </div>
    <a href="profile" class="edit-profile">Edit Profile</a>
    <a href="#" class="change-password">Change Password</a>
    <a href="logout" class="logout">Logout</a>
</div>
<script>
    function toggleNav(){
        //Function to allow user to open and close profile navigation
        document.querySelector(".user-nav").classList.toggle('showusernav');
    }
</script>