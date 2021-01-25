$(document).ready(function () {


    if ($('body').is('.bookpage')) {

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
            url: "http://localhost:8081/api/book/getbyid/" + bookId,
            headers: { "Authorization": "Bearer " + guesttoken }
        }).then(function (data) {
            console.log(data);
            var pubdate = new Date(Date.parse(data.book.publicationDate));
            var fpubdate = pubdate.format("yyyy");
            $('#title').append(data.book.title);
            $('#price').append(data.book.pricing.startingPrice + "T");
            $('#description').append(data.book.description);
            $('#rating').append(data.book.rating + "/5");
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

            console.log(data.book);
            var book = data.book.bookId;
            localStorage.setItem("book", book);
        });


    };



    $("#buybook").click( async function (e) {
        // var book = localStorage.getItem("book");
        // console.log(book);
        window.location.href = "checkout.html";
    })





});
