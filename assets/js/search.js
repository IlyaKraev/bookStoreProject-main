$(document).ready(function () {

    // Searching scripts 
    $("#go").click(function (e) {
        e.preventDefault();
    });

    $("#go-min").click(function (e) {
        e.preventDefault();
        var query = document.getElementById("search-min").value;
        window.location.href = 'search.html?query=' + query + '';
    });

    const search = document.getElementById('search');
    const results = document.getElementById('results');
    const searched = document.getElementById('searched');


    const categoriesFilter = document.getElementById('categoriesfilter');

    var categoryfilter = document.getElementsByName("category");


    const params = new URLSearchParams(window.location.search);
    if ($('body').is('.searchpage')) {

        let query = params.get("query");
        if (query != null) {
            FormDataJson.setInputValue(document.querySelector("#search"), query)
            searchBooks(query, "none");
        } else {
            FormDataJson.setInputValue(document.querySelector("#search"), "")
            searchBooks("", "none");
        }
        function getCategories() {
            fetch('http://ra1.anystream.eu:1090/bookstore/api/category/getall')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.warn('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        // Examine the text in the response  
                        response.json().then(function (data) {
                            const html = data.categories.map(category =>
                                `<label for="${category.type}">${category.type}</label>
                        <input name="category" value=${category.type} id="${category.type}" type="radio">&nbsp;
                        `).join('');
                            categoriesFilter.innerHTML += html;
                        });
                    }
                );
        }
        getCategories();
    }

    async function searchBooks(searchText, any) {
        // const res = await fetch('response.json');
        const res = await fetch('http://ra1.anystream.eu:1090/bookstore/api/book/getall');
        const books = await res.json();
        function check(arr) {
            console.log(arr);
            if (arr.type == any) {
                return arr;
            }
        }

        const regex = new RegExp(`^${searchText}`, 'gi');
        function checkauthors(auth) {
            if (auth.firstName.match(regex) || auth.lastName.match(regex)) {
                return auth;
            }
        }

        let matches = books.books.filter(obj => {
            if (any != "none") {
                return obj.categories.find(check) && (obj.title.match(regex) || obj.authors.find(checkauthors));
            }
            else {
                return obj.authors.find(checkauthors) || obj.title.match(regex);
            };
        });

        if (searchText.length === 0 && any == "none") {
            searched.innerHTML = `Nothing searched, nothing found.`;
            // outputHtml(books.books);
            results.innerHTML = '';
        }
        else if (searchText.length === 0) {
            var asd = matches.filter(function (element) {
                return element.categories.some(function (category) {
                    return category.type === any
                });
            });
            searched.innerHTML = `Search results for: ` + search.value;
            outputHtml(asd);
        }
        else {
            searched.innerHTML = `Search results for: ` + search.value;
            if (matches.length === 0) {
                results.innerHTML = '';
            }
            outputHtml(matches);
        }
    };


    $("#go").click(() =>
        categoryfilter.forEach((catfil) => {
            if (catfil.checked) {
                if (catfil.value == "none") {
                    console.log(catfil.value);
                    searchBooks(search.value, "none");
                } else {
                    searchBooks(search.value, catfil.value);
                }
            }
        })
    );

    function fullName(author) {
        var fullname = "";
        fullname += author.firstName + " " + author.lastName + "<br>";
        return fullname;
    }

    function ifZero(value) {
        if (value === 0) {
            return ("");
        } else {
            return "-" + (value * 100) + "%";
        }
    }

    const outputHtml = matches => {
        if (matches.length != 0) {
            const html = matches.map(match =>
                `   <div class="col-md-3 col-sm-6">
                <div class="product-grid7">
                <div class="product-image7">
                <a href="#">
                <img class="pic-1" src="assets/img/books/book-${match.bookId}.jpg">
                </a>
                <ul class="social">
                <li><a href="book.html?id=${match.bookId}" class="fa fa-search"></a></li>
                <li><a href="" class="fa fa-shopping-cart"></a></li>
                </ul>
                </div>
                <div class="product-content">
                <b>Authors: </b> ${match.authors.map(author => {
                    return fullName(author);
                })}<hr>
                <b>Publisher: </b> ${match.publisher.name}
                <h3 class="title" style="color:limegreen"></h3>
                <span class="product-new-label">${match.title}</span>
                <div class="price">Cost: ${match.pricing.startingPrice -((match.pricing.discount * match.pricing.startingPrice))}T <p style="color:limegreen">${ifZero(match.pricing.discount)}</p>
                </div>
                </div>
                </div>
                </div>
                `).join('');
            results.innerHTML = html;
        }
        else {
            results.innerHTML = `<h3 style="margin-left: auto; margin-right: auto">Nothing found</h3>`;
        }
    }




    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CATEGORIZE


    let catfilt = params.get("category");
    if (catfilt != null) {
        searchBooksByCategory(catfilt);
    }

    async function searchBooksByCategory(catfilt) {
        const cat = await fetch('http://ra1.anystream.eu:1090/bookstore/api/category/getbyid/' + catfilt);
        const category = await cat.json();
        const type = category.category.type;

        $('#filter').text("Category: " + type);
        const res = await fetch('http://ra1.anystream.eu:1090/bookstore/api/book/getbycategory/' + type);
        const books = await res.json();
        const sorted = books.books.sort(function (a, b) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        outputHtml(sorted);

    };

    if ($('body').is('.view')) {
        let all = params.get("allbooks");
        if (all != null) {
            searchAllBooks();
            $('#filter').text("All Books");
        }
    }

    async function searchAllBooks() {
        const res = await fetch('http://ra1.anystream.eu:1090/bookstore/api/book/getall');
        const books = await res.json();
        const sorted = books.books.sort(function (a, b) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        outputHtml(sorted);

    };

    let authfilt = params.get("author");
    if (authfilt != null) {
        searchBooksByAuthor(authfilt);
    }

    async function searchBooksByAuthor(authfilt) {
        const auth = await fetch('http://ra1.anystream.eu:1090/bookstore/api/author/getbyid/' + authfilt);
        const author = await auth.json();
        const fullName = author.author.firstName + " " + author.author.lastName;
        $('#filter').text("Author: " + fullName);

        const res = await fetch('http://ra1.anystream.eu:1090/bookstore/api/book/getbyauthor/' + authfilt);
        const books = await res.json();
        const sorted = books.books.sort(function (a, b) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        outputHtml(sorted);
    };

    let langfilt = params.get("language");
    if (langfilt != null) {
        searchBooksByLanguage(langfilt);
    }

    async function searchBooksByLanguage(langfilt) {
        const lang = await fetch('http://ra1.anystream.eu:1090/bookstore/api/language/getbyid/' + langfilt);
        const language = await lang.json();
        const type = language.language.languageType;
        console.log(type);
        $('#filter').text("Language: " + type);
        const res = await fetch('http://ra1.anystream.eu:1090/bookstore/api/book/getbylanguage/' + type);
        const books = await res.json();
        const sorted = books.books.sort(function (a, b) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });
        outputHtml(sorted);
    };


    if ($('body').is('.explore')) {
        const authors = document.getElementById('author');
        const categories = document.getElementById('category');
        const languages = document.getElementById('language');

        function getAuthors() {
            fetch('http://ra1.anystream.eu:1090/bookstore/api/author/getall')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.warn('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        response.json().then(function (data) {
                            const sorted = data.authors.sort(function (a, b) {
                                a = a.lastName.toLowerCase();
                                b = b.lastName.toLowerCase();
                                return a < b ? -1 : a > b ? 1 : 0;
                            });
                            const html = sorted.map(author =>
                                `
                                <li class="list-group-item"><span><a href="view.html?author=${author.authorId}" >${author.lastName} ${author.firstName}</a></span></li>
                        `).join('');
                            authors.innerHTML = html;
                        });
                    }
                );
        }
        getAuthors();

        function getCategories() {
            fetch('http://ra1.anystream.eu:1090/bookstore/api/category/getall')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.warn('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        response.json().then(function (data) {
                            const sorted = data.categories.sort(function (a, b) {
                                a = a.type.toLowerCase();
                                b = b.type.toLowerCase();
                                return a < b ? -1 : a > b ? 1 : 0;
                            });
                            const html = sorted.map(category =>
                                `
                                <li class="list-group-item"><a href="view.html?category=${category.categoryId}">${category.type}</a></li>
                        `).join('');
                            categories.innerHTML = html;
                        });
                    }
                );
        }
        getCategories();

        function getLanguages() {
            fetch('http://ra1.anystream.eu:1090/bookstore/api/language/getall')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.warn('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        response.json().then(function (data) {
                            const sorted = data.languages.sort(function (a, b) {
                                a = a.languageType.toLowerCase();
                                b = b.languageType.toLowerCase();
                                return a < b ? -1 : a > b ? 1 : 0;
                            });
                            const html = sorted.map(language =>
                                `
                                <li class="list-group-item"><a href="view.html?language=${language.languageId}">${language.languageType}</a></span></li>
                        `).join('');
                            languages.innerHTML = html;
                        });
                    }
                );
        }
        getLanguages();
    };


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // LATEST ARRIVALS


    if ($('body').is('.homepage')) {


        async function searchBooks() {
            // const res = await fetch('response.json');
            const res = await fetch('http://ra1.anystream.eu:1090/bookstore/api/book/getall');
            const books = await res.json();
            const allbooks = books.books;

            let getLast = (allbooks = null, n = null) => {
                if (allbooks == null) return void 0;
                if (n === null) return allbooks[allbooks.length - 1];
                return allbooks.slice(Math.max(allbooks.length - n, 0));
            };
            
            var thelatest = getLast(allbooks, 3);
            
        
            function fullName(author) {
                var fullname = "";
                fullname += author.firstName + " " + author.lastName + " ";
                return fullname;
            }
            function ifZero(value) {
                if (value === 0) {
                    return ("");
                } else {
                    return "-" + (value * 100) + "%";
                }
            }
            const latestArr = document.getElementById('latestArrivals');
            const outputHtml = thelatest => {
                if (thelatest.length != 0) {
                    const html = thelatest.map(match =>
                        `   
                        <div class="col-lg-4 col-md-6 col-sm-6" style="margin-bottom: 50px">
                        <div class="card shadow" >
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <div class="col m-auto"><img class="float-none center"
                                                style="height: 250px;margin-top: 0px;" src="assets/img/books/book-${match.bookId}.jpg">
                                        </div>
                                    </div>
                                </div>
                                <h4 class="text-center">${match.title}</h4>
                                <hr style="background-color: #323232;">
                                <h6 class="text-center" style="color: #979797;">By author: ${match.authors.map(author => {
                            return fullName(author);
                        })}</h6>
                                <h6 class="text-center" style="color: black;">Price: ${match.pricing.startingPrice -((match.pricing.discount * match.pricing.startingPrice))} T</h6>
                                <h6 class="text-center" style="color: limegreen;">${ifZero(match.pricing.discount)}</h6>
                                <div class="row">
                                    <div class="col text-center"><button class="btn btn-secondary btn-circle "
                                            onclick="window.location.href='book.html?id=${match.bookId}'" type="button"
                                            style="background-color: #ffa767; border-radius:50px"><i class="fa fa-search"></i></button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                        `).join('');
                    latestArr.innerHTML = html;
                }
            };
            outputHtml(thelatest);          
        }
        searchBooks();       
    };
});