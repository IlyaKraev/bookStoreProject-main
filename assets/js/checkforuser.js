$(document).ready(function () {

    window.addEventListener('load', function () {
        var token = localStorage.getItem("token");
        if (token === null) {
            console.log("is null");
        } else {
            console.log("asd")
            $('#logout').show()
            $('#loginBox').hide()
            $('#signupBox').hide()
            $("#showUsr").append("Welcome " + localStorage.getItem("username"));
            var userpanel = $('<button type="button" class="btn btn-secondary ml-3" style="background-color: rgb(255,167,103); float: right;outline: none; " data-toggle="modal" data-target="#exampleModal"> User Panel</button>')
            $("#userinfo").append(userpanel);
        }
    }, false);

    window.addEventListener('load', function () {
        var auth = localStorage.getItem("auth");
        console.log(auth)
        if (auth === "ready") {
            var special = $('<hr><a class="ml-5" id="admin" href="admin/dashboard.html"><i class="fa fa-cogs" aria-hidden="true"></i>&nbsp;Press here to see the admin dashboard </a>')
            $("#special").append(special);
            console.log("is here");
        } else {
            console.log("hey")
            $('#special').hide()
        }

    }, false);

    window.onload = function () {
        document.getElementById("logout").onclick = function () { myFunction() }
        function myFunction() {
            // window.location.href = "index.html";
            console.log("works")
            $('#special').remove()
            localStorage.clear()
            location.reload();
            window.location.href = "index.html";
        };
    }

    const greeting = document.getElementById("exampleModalLabel");
    $.ajaxSetup({
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
    });
    var username = localStorage.getItem("username")

    if (username != null) {
        greeting.innerHTML = "Welcome " + username;
        $.getJSON("http://localhost:8081/api/account/getaccountidbyusername/" + username, function (data) {
            $.each(data, function (i, v) {
                console.log(data.accountId)
                var usrn = v
                $.getJSON("http://localhost:8081/api/account/getbyid/" + data.accountId, function (data) {
                    $.each(data, function (i, v) {
                        // console.log(v)
                        console.log(v.coins);
                        // localStorage.setItem("coins", v.coins)
                        $('#walletcoins').text("You have: " + v.coins + " coins.")
                    });
                });
            });
        });
    }





    if ($('body').is('.accountpage')) {
        const greeting = document.getElementById("greeting");
        $.ajaxSetup({
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });
        var username = localStorage.getItem("username")

        if (username != null) {
            greeting.innerHTML = "Welcome " + username;
            $.getJSON("http://localhost:8081/api/account/getaccountidbyusername/" + username, function (data) {
       
                $.getJSON("http://localhost:8081/api/account/getbyid/" + data.accountId, function (data) {
                    console.log(data)

                    account = data.account;

                    var bdate = new Date(Date.parse(account.dateOfBirth));
                    var fbdate = bdate.format("dd-mm-yyyy");

                    $('#username').append(account.username);
                    $('#firstName').append(account.firstName);
                    $('#lastName').append(account.lastName);
                    $('#dateOfBirth').append(fbdate);
                    $('#email').append(account.email);
                    $('#gender').append(account.gender);
                    $('#coins').prepend(account.coins);





                });
            });

        };


    };
});