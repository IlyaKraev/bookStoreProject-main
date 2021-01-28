$(document).ready(function () {
    var token = localStorage.getItem("token");

    if ($('body').is('.bookpage')) {
        if (token === null) {
            console.log(guest)
        }
        else {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var decrypted = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            console.log(decrypted)
            var splitusrn = decrypted.split(":")[1].split(",")[0]
            var removefront = splitusrn.substring(1)
            var username = removefront.slice(0, -1)
            const params = new URLSearchParams(window.location.search);
            let bookId = params.get("id");
            async function checkBooks() {

                const options1 = {
                    type: "GET",
                    headers: { "Authorization": "Bearer " + token },
                    contentType: "application/json"
                };
                const res1 = await fetch('http://ra1.anystream.eu:1090/bookstore/api/account/getaccountidbyusername/' + username, options1);
                const account = await res1.json();
                var accountID = account.accountId;
                var jsonObject =
                {
                    "accountId": accountID,
                    "bookId": bookId
                };
                function download(value) {
                    ENCRYPTION.init(value);
                    return ENCRYPTION.Download();
                }
                console.log(account);
                $.ajax({
                    url: "http://ra1.anystream.eu:1090/bookstore/api/book/checkownership",
                    headers: { "Authorization": "Bearer " + token },
                    type: "POST",
                    dataType: "text",
                    contentType: "application/json; charset=UTF-8",
                    cache: false,
                    data: JSON.stringify(jsonObject),
                    success: function (res) {
                        var opts = JSON.parse(res);
                        console.log(opts)
                        if (opts.msg == "Already bought") {
                            var special = $(`<button class="btn btn-secondary" onclick="window.location.href='${download(bookId)}'" type="button"
                                style="width: 100%;margin-bottom: 20px;background-color: #ffa767;">Download <i
                                class="fa fa-book"></i></button>`)
                            $("#action").append(special);
                            $("#buybook").attr("hidden", true);
                        } else {
                            $("#buybook").attr("hidden", false);
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        setTimeout(function () {
                            swal({
                                title: "Sorry!",
                                text: "Something is wrong, please try again!",
                                type: "error",
                                confirmButtonText: "OK"
                            },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        // window.location.href = "";
                                    }
                                });
                        }, 1000);
                        console.log(jqXHR)
                        console.log(textStatus)
                        console.log(errorThrown)
                    }
                });
            };
            checkBooks();

        };
    }


    if (token === null) {
        $('#logout').hide()
        $('#loginBox').show()
        $('#signupBox').show()
    } else {
        $('#logout').show()
        $('#loginBox').hide()
        $('#signupBox').hide()
        var userpanel = $('<button type="button" class="btn btn-secondary ml-3" style="background-color: rgb(255,167,103); outline: none;" data-toggle="modal" data-target="#exampleModal"> User Panel</button>')
        $("#userinfo").append(userpanel);
    }

    var auth = localStorage.getItem("auth");
    if (auth === "ready") {
        var special = $(`<hr><button class='btn btn-danger' type='button'
            onclick="window.location.href='admin/dashboard.html'"
            style="width: 100%;">Press here to see the admin dashboard&nbsp;<i
                class="fa fa-cogs"></i></button>`)
        $("#special").append(special);
        console.log("is here");
    } else {
        console.log("hey")
        $('#special').hide()
    }


    document.getElementById("logout").onclick = function () { myFunction() }
    function myFunction() {

        console.log("works");
        $('#special').remove();
        localStorage.clear();
        location.reload();
        window.location.href = "/";
    };


    const greeting = document.getElementById("exampleModalLabel");
    $.ajaxSetup({
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
    });

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var decrypted = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(decrypted)
    var splitusrn = decrypted.split(":")[1].split(",")[0]
    var removefront = splitusrn.substring(1)
    var username = removefront.slice(0, -1)

    if (username != null) {
        greeting.append("Welcome " + username);
        $.getJSON("http://ra1.anystream.eu:1090/bookstore/api/account/getaccountidbyusername/" + username, function (data) {
            $.each(data, function (i, v) {
                $.getJSON("http://ra1.anystream.eu:1090/bookstore/api/account/getbyid/" + data.accountId, function (data) {
                    $.each(data, function (i, v) {
                        console.log(v.coins);
                        // localStorage.setItem("coins", v.coins)
                        $('#walletcoins').text("You have: " + v.coins + " coins.")
                    });
                });
            });
        });
    }

    if ($('body').is('.accountpage')) {
        var token = localStorage.getItem("token");
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var decrypted = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        console.log(decrypted)
        var splitusrn = decrypted.split(":")[1].split(",")[0]
        var removefront = splitusrn.substring(1)
        var username = removefront.slice(0, -1)

        const greeting = document.getElementById("greeting");
        $.ajaxSetup({
            headers: { "Authorization": "Bearer " + token }
        });

        greeting.innerHTML = "Welcome " + username;
        $.getJSON("http://ra1.anystream.eu:1090/bookstore/api/account/getaccountidbyusername/" + username, function (data) {
            $.getJSON("http://ra1.anystream.eu:1090/bookstore/api/account/getbyid/" + data.accountId, function (data) {
                account = data.account;
                localStorage.setItem("ID", account.accountId);
                var bdate = new Date(Date.parse(account.dateOfBirth));
                var fbdate = bdate.format("dd-mm-yyyy");
                $('#username').append(account.username);
                $('#firstName').append(account.firstName);
                $('#lastName').append(account.lastName);
                $('#dateOfBirth').append(fbdate);
                $('#email').append(account.email);
                $('#gender').append(account.gender);
                $('#coins').prepend(account.coins);

                const userbooks = document.getElementById('booklist');
                searchBooks();

                async function searchBooks() {

                    const res = await fetch('http://ra1.anystream.eu:1090/bookstore/api/book/getbyaccountid/' + account.accountId);
                    const books = await res.json();

                    function fullName(author) {
                        var fullname = "";
                        fullname += author.firstName + " " + author.lastName + "<br>";
                        return fullname;
                    }
                    function download(value) {
                        ENCRYPTION.init(value);
                        return ENCRYPTION.Download();
                    }
                    const outputHtml = matches => {
                        if (matches.length != 0) {
                            const html = matches.map(match =>
                                ` <div class="card text-left shadow mb-3">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-5 col-xl-4" ><img class="profilebook"  src="../assets/img/books/book-${match.bookId}.jpg"></div>
                                                <div class="col">
                                                    <p class="text-right mt-2"><b>${match.title}</b> </p><p class="text-right mt-2">${match.authors.map(author => {
                                    return fullName(author);
                                })} </p>
                                                    <a class="btn btn-light border rounded float-right action-button" role="button"
                                                        href="${download(match.bookId)}"
                                                        style="background-color: rgb(255,167,103);color: rgb(255,255,255);"><strong>Download&nbsp;
                                                        </strong><i class="fa fa-book"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `).join('');
                            userbooks.innerHTML = html;

                        } else {
                            const html = `<div class="row text-center" style="text-align: center; color: #c3c3c3; margin-top: 100px">
                                                     <div class="col">
                                                         <h1>No Books Found.</h1>
                                                    </div>
                                             </div>`;
                            userbooks.innerHTML = html;
                        };
                    };
                    outputHtml(books.books);
                };
            });
        });

    };
});