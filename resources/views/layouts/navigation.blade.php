<head>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/nav.css?v=').time()}}">
</head>
<div class="navigation">
    <div class="top-nav">
        <a href="{{route('home')}}"><img src="{{URL::asset('public/images/thkh-logo.jpg')}}" class="nav-logo" alt="logo"></a>
        <form action="#" method="#">
        @csrf
            <div class="search">
                <button class="searchBtn"><img src="{{URL::asset('public/images/search.png')}}" width="40px" alt="search"></button>
                <input type="text" class="searchInput" placeholder="Search Reports By HOR No. / Year ...">
            </div>
        </form>
        <img onclick="toggleNav();" src="{{URL::asset('public/images/user.png')}}" id="change" class="nav-profile" alt="accountLogo">
    </div>
</div>
<div class="user-nav">
    <div class="first-row">
        <div class="user-detail">
            <p><b>Name: </b>{{$data->name}}</p>
            <p><b>Role: </b>{{$data->role}}</p>
        </div>
    </div>
    <a href="{{route('home')}}" id="home">Home</a>
    <a href="{{route('profile')}}" id="view-profile">View Profile</a>
    <a href="{{route('edit-profile', ['id'=>$data->id])}}" id="edit-profile">Edit Profile</a>
    <a href="{{route('logout')}}" id="logout">Logout</a>
</div>
<script>
    function toggleNav(){
        //Function to allow user to open and close profile navigation
        var logo = document.getElementById('change');
        //toggle between close icon and user icon
        if (logo.src == "{{URL::asset('public/images/close.png')}}"){
            logo.src = "{{URL::asset('public/images/user.png')}}"
        }
        else
            logo.src = "{{URL::asset('public/images/close.png')}}"
        document.querySelector(".user-nav").classList.toggle('showusernav');
    }
    //Close user nav if click outside of user nav
    var ignoreMe = document.getElementById("change");
    window.addEventListener('mouseup', function(event){
        if (event.target != ignoreMe){
            var logo = document.getElementById('change');
            logo.src = "{{URL::asset('public/images/user.png')}}"
            document.querySelector(".user-nav").classList.remove('showusernav');
        }
    });
</script>