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

    // fetch('http://localhost:8081/api/author/getall')
    //     .then(res => res.json())
    //     .then(res => {
    //         res.data.map(authors => {
    //             console.log(authors.authorsId);
    //         });
    //     });

    const categoriesFilter = document.getElementById('categoriesfilter');
    const languageFilter = document.getElementById('languagesfilter');

    var categoryfilter = document.getElementsByName("category");
    console.log(categoryfilter);

    var token = localStorage.getItem("token")
    const options = {
        type: "GET",
        headers: { "Authorization": "Bearer " + token },
        contentType: "application/json"
    }

    if ($('body').is('.searchpage')) {



        function getCategories() {
            fetch('http://localhost:8081/api/category/getall')
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
        // console.log(any);
        // const res = await fetch('response.json');
        const res = await fetch('http://localhost:8081/api/book/getall');
        const books = await res.json();

        function check(arr) {
            console.log(arr);
            if (arr.type == any) {
                return arr;
            }
        }

        const regex = new RegExp(`^${searchText}`, 'gi');

        function checkauthors(auth) {
            console.log(auth);
            if (auth.firstName.match(regex) || auth.lastName.match(regex)) {
                return auth;
            }
        }

        // function checklanguage(lang) {
        //     console.log(lang);
        //     if (lang.languageType.match(regex)) {
        //         return lang;
        //     }
        // }

        let matches = books.books.filter(obj => {
            if (any != "none") {
                return obj.categories.find(check) && (obj.title.match(regex) || obj.authors.find(checkauthors));
            }
            else {
                return obj.authors.find(checkauthors) || obj.title.match(regex);
            };
        });

        // obj.languages.find(checklanguage) ||

        if (searchText.length === 0 && any == "none") {
            // searched.innerHTML = `Nothing searched, nothing found.`;
            outputHtml(books.books);
            // results.innerHTML = '';
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
            // if (matches.length === 0) {
            //     searched.innerHTML = `Nothing found for: ` + search.value;
            //     results.innerHTML = '';
            // }
            console.log(matches);
            outputHtml(matches);
        }
    };



    function fullName(author) {
        var fullname = "";
        fullname += author.firstName + " " + author.lastName + "<br>";
        return fullname;
    }

    const outputHtml = matches => {
        if (matches.length!=0) {

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
                    
                    
                    <h3 class="title"><a href="#">
                    
                    
                    </a></h3>
                    <span class="product-new-label">${match.title} </span>
                    <div class="price">Cost: ${match.pricing.startingPrice}T
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

    const params = new URLSearchParams(window.location.search);
    let query = params.get("query");
    if (query != null) {
        FormDataJson.setInputValue(document.querySelector("#search"), query)
        searchBooks(query, "none");
    }



    // const category = fetch('http://localhost:8081/api/book/getbycategory/'+selectedcategory)

    // CATEGORIZE


    let catfilt = params.get("category");
    if (catfilt != null) {

        searchBooksByCategory(catfilt);
    }

    async function searchBooksByCategory(catfilt) {

        const cat = await fetch('http://localhost:8081/api/category/getbyid/' + catfilt);
        const category = await cat.json();
        const type = category.category.type;

        $('#filter').text("Category: " + type);
        const res = await fetch('http://localhost:8081/api/book/getbycategory/' + type);
        const books = await res.json();
        console.log(books);
        outputHtml(books.books);

    };

    if ($('body').is('.view')) {

        let all = params.get("allbooks");
        if (all != null) {
            searchAllBooks();
            $('#filter').text("All Books");
        }
    }

    async function searchAllBooks() {

        // const res = await fetch('response.json');
        const res = await fetch('http://localhost:8081/api/book/getall');
        const books = await res.json();

        outputHtml(books.books);

    };

    let authfilt = params.get("author");
    if (authfilt != null) {
        searchBooksByAuthor(authfilt);
    }
    async function searchBooksByAuthor(authfilt) {

        const auth = await fetch('http://localhost:8081/api/author/getbyid/' + authfilt);
        const author = await auth.json();
        const fullName = author.author.firstName + " " + author.author.lastName;

        $('#filter').text("Author: " + fullName);

        // const res = await fetch('response.json');
        const res = await fetch('http://localhost:8081/api/book/getbyauthor/' + authfilt);
        const books = await res.json();

        outputHtml(books.books);
    };

    let langfilt = params.get("language");
    if (langfilt != null) {
        searchBooksByLanguage(langfilt);
    }
    async function searchBooksByLanguage(langfilt) {

        const lang = await fetch('http://localhost:8081/api/language/getbyid/' + langfilt);
        const language = await lang.json();
        const type = language.language.languageType;

        $('#filter').text("Language: " + type);
        // const res = await fetch('response.json');
        const res = await fetch('http://localhost:8081/api/book/getbylanguage/' + type);
        const books = await res.json();
        outputHtml(books.books);
    };


    if ($('body').is('.explore')) {

        const authors = document.getElementById('author');
        const categories = document.getElementById('category');
        const languages = document.getElementById('language');

        function getAuthors() {
            fetch('http://localhost:8081/api/author/getall')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.warn('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        // Examine the text in the response  
                        response.json().then(function (data) {

                            const sorted = data.authors.sort(function (a, b) {
                                a = a.lastName.toLowerCase();
                                b = b.lastName.toLowerCase();

                                return a < b ? -1 : a > b ? 1 : 0;
                            });

                            const html = sorted.map(author =>
                                `
                                <li class="list-group-item"><span><a style='text-decoration: none; color: #ff8d3b; font-weight: bold' href="view.html?author=${author.authorId}" >${author.lastName} ${author.firstName}</a></span></li>
                        `).join('');
                            authors.innerHTML = html;
                        });
                    }
                );
        }
        getAuthors();

        function getCategories() {
            fetch('http://localhost:8081/api/category/getall')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.warn('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        // Examine the text in the response  
                        response.json().then(function (data) {

                            const sorted = data.categories.sort(function (a, b) {
                                a = a.type.toLowerCase();
                                b = b.type.toLowerCase();

                                return a < b ? -1 : a > b ? 1 : 0;
                            });

                            const html = sorted.map(category =>
                                `
                                <li class="list-group-item"><span><a style='text-decoration: none; color: #ff8d3b; font-weight: bold' href="view.html?category=${category.categoryId}">${category.type}</a></span></li>
                        `).join('');
                            categories.innerHTML = html;
                        });
                    }
                );
        }
        getCategories();



        function getLanguages() {
            fetch('http://localhost:8081/api/language/getall')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.warn('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        // Examine the text in the response  
                        response.json().then(function (data) {

                            const sorted = data.languages.sort(function (a, b) {
                                a = a.languageType.toLowerCase();
                                b = b.languageType.toLowerCase();

                                return a < b ? -1 : a > b ? 1 : 0;
                            });

                            const html = sorted.map(language =>
                                `
                                <li class="list-group-item"><span><a style="text-decoration: none; color: #ff8d3b; font-weight: bold" href="view.html?language=${language.languageId}">${language.languageType}</a></span></li>
                        `).join('');
                            languages.innerHTML = html;
                        });
                    }
                );
        }
        getLanguages();


    };

});