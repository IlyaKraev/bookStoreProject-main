$(document).ready(function () {
    function random(min, max) {
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    }
    if ($('body').is('.bookpage')) {
        var token = localStorage.getItem("token")
        if (token === null) {
            const params = new URLSearchParams(window.location.search);
            let bookId = params.get("id");
            function fullName(author) {
                var fullname = "";
                fullname += author.firstName + " " + author.lastName + "<br>";
                return fullname;
            }
            function getCategories(category) {
                var type = "";
                type += category.type + " ";
                return type;
            }
            function getLanguages(language) {
                var languagetype = "";
                languagetype += language.languageType + " ";
                return languagetype;
            }
            var guesttoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJbUk9MRV9VU0VSXHJcbl0iLCJleHAiOjE2MTIyMDIyMjJ9.clBy4JZW1yZTWehWQULxx3go8PnkDQxfvWFr9jR4SW4-aK8SLB0CnB6Dx9bsyLHPQN26i0GhoNsJxH-A4YaEQg"
            $.get({
                url: "http://ra1.anystream.eu:1090/bookstore/api/book/getbyid/" + bookId,
                headers: { "Authorization": "Bearer " + guesttoken }
            }).then(function (data) {
                console.log(data);
                var pubdate = new Date(Date.parse(data.book.publicationDate));
                var fpubdate = pubdate.format("yyyy");
                $('#title').append(data.book.title);
                $('#price').append(data.book.pricing.startingPrice + "T");
                if (data.book.pricing.discount != 0) {
                    $('#discount').text((data.book.pricing.discount * 100) + " % Discount!");
                }
                $('#description').append(data.book.description);
                $('#rating').append(data.book.rating + "/5 ");
                $('#ratingreviews').text("(" +random(1, 999)+ " user reviews)");
                $('#publisher').append(data.book.publisher.name);
                $('#publicationDate').append(fpubdate);
                $('#isbn13').append(data.book.isbn13);
                $('#pages').append(data.book.pages);
                $('#authors').append(data.book.authors.map(author => {
                    return fullName(author);
                }));
                $('#categories').append(data.book.categories.map(category => {
                    return getCategories(category);
                }));
                $('#languages').append(data.book.languages.map(language => {
                    return getLanguages(language);
                }));
                $('#cover').attr('src', "assets/img/books/book-" + bookId + ".jpg");
                $("#buybook").click(async function (e) {
                    window.location.href = "login.html";
                })
            });

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

            function fullName(author) {
                var fullname = "";
                fullname += author.firstName + " " + author.lastName + "<br>";
                return fullname;
            }
            function getCategories(category) {
                var type = "";
                type += category.type + " ";
                return type;
            }
            function getLanguages(language) {
                var languagetype = "";
                languagetype += language.languageType + " ";
                return languagetype;
            }
            $.getJSON("http://ra1.anystream.eu:1090/bookstore/api/account/getaccountidbyusername/" + username, function (data) {
                accountID = data.accountId;
                searchBooks();
                async function searchBooks() {
                    const res = await fetch('http://ra1.anystream.eu:1090/bookstore/api/book/getbyaccountid/' + accountID);
                    const books = await res.json();
                    console.log(books);
                };
            });
            $.get({
                url: "http://ra1.anystream.eu:1090/bookstore/api/book/getbyid/" + bookId,
                headers: { "Authorization": "Bearer " + token }
            }).then(function (data) {
                console.log(data);
                var pubdate = new Date(Date.parse(data.book.publicationDate));
                var fpubdate = pubdate.format("yyyy");
                $('#title').append(data.book.title);
                $('#price').append(data.book.pricing.startingPrice -((data.book.pricing.discount * data.book.pricing.startingPrice)) + "T");
                if (data.book.pricing.discount != 0) {
                    $('#discount').text((data.book.pricing.discount * 100) + " % Discount!");
                }
                $('#description').append(data.book.description);
                $('#rating').append(data.book.rating + "/5 ");
                $('#ratingreviews').text("(" +random(1, 999)+ " user reviews)");
                $('#publisher').append(data.book.publisher.name);
                $('#publicationDate').append(fpubdate);
                $('#isbn13').append(data.book.isbn13);
                $('#pages').append(data.book.pages);
                $('#authors').append(data.book.authors.map(author => {
                    return fullName(author);
                }));
                $('#categories').append(data.book.categories.map(category => {
                    return getCategories(category);
                }));
                $('#languages').append(data.book.languages.map(language => {
                    return getLanguages(language);
                }));
                $('#cover').attr('src', "assets/img/books/book-" + bookId + ".jpg");
                $("#buybook").click(async function (e) {
                    var book = data.book.bookId;
                    localStorage.setItem("book", book);
                    setTimeout(function () {
                        swal({
                            title: "Proceeding to checkout!",
                            text: " Press to continue with your transaction",
                            type: "info",
                            confirmButtonText: "OK"
                        },
                            function (isConfirm) {
                                if (isConfirm) {
                                    window.location.href = "checkout.html";
                                }
                            });
                    }, 1000);
                })
            });
        }
    };
});
