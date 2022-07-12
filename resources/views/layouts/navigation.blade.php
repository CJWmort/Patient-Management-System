<head>
    <link rel="stylesheet" type="text/css" href="{{URL::asset('public/css/nav.css?v=').time()}}">
</head>
<div class="navigation">
    <div class="top-nav">
        <a href="{{route('home')}}"><img src="{{URL::asset('public/images/thkh-logo.jpg')}}" class="nav-logo" alt="logo"></a>
        <!-- Display nav bar links for all pages except home page -->
        @if (Route::currentRouteName() != 'home')
        <div class="links">
            <a class="nav-link" href="{{route('chart10a')}}">View Charts</a>
            <a class="nav-link" href="{{route('ehor')}}">Customise EHOR</a>
            <a class="nav-link" href="{{route('user')}}">Manage Users</a>
            <a class="nav-link" href="{{route('reports')}}">View Reports</a>
        </div>
        @endif
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