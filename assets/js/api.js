$(document).ready(function () {
    var token = localStorage.getItem("token")
    console.log(token);
    // Authors

    // Create new author
    $("#addauthor").click(function (e) {

        let jsonData = FormDataJson.formToJson(document.querySelector("#author"));
        $.ajax({
            url: "http://localhost:8081/api/author/new",
            type: "POST",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                alert("Author successfully added!");
                window.location.href = 'viewauthors.html'
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault(); //STOP default action

    });

    // Update Author
    if ($('body').is('.updateauthor')) {

        const params = new URLSearchParams(window.location.search);
        let authorId = params.get("authorid");

        $.ajax({
            url: "http://localhost:8081/api/author/getbyid/" + authorId,
            type: 'GET',
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {

                var obj = data;
                console.log(obj);

                FormDataJson.fillFormFromJsonValues(document.querySelector("#authorupdate"), obj.author);
            }
        });
    };


    //Submit update
    $("#updatea").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#authorupdate"));
        let id = FormDataJson.getInputValue(document.querySelector("#authorId"))
        // console.log(id);

        $.ajax({
            url: "http://localhost:8081/api/author/update/" + id,
            type: "PUT",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                window.location.href = "viewauthors.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jsonData)
            }
        });
        e.preventDefault();

    });


    // View Authors

    var tablea = $('#authors').DataTable({
        "pageLength": 10,
        "sPaginationType": "full_numbers",
        ajax: {
            url: 'http://localhost:8081/api/author/getall',
            dataSrc: 'authors',
            type: "GET",
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            contentType: "application/json"
        },

        columns: [
            { 'data': "authorId" },
            { 'data': "firstName" },
            { 'data': "lastName" },
            { 'data': "country" },
            {
                searchable: false,
                title: "Edit",
                orderable: false,
                defaultContent: '<button id="btn1" class=\"btn btn-success\"><em class=\"fa fa-pencil\"></em></button>'
            },
            {
                searchable: false,
                title: "Delete",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            }
        ]

    });



    $('#authors').on('click', 'tr #btn1', function () {
        var id = tablea.row(this.parentNode).data().authorId;
        window.location.href = 'updateauthor.html?authorid=' + id + '';
    });

    $('#authors').on('click', 'tr #btn2', function () {
        var id = tablea.row(this.parentNode).data().authorId;
        var fn = tablea.row(this.parentNode).data().firstName;
        var ln = tablea.row(this.parentNode).data().lastName;

        if (confirm("Do you want to delete author " + id + " " + fn + " " + ln + "?") == true) {
            deleteAuthor(id);
            window.location.href = 'viewauthors.html'
        } else {
            alert("Entity not deleted");
        }
    });


    // Delete author
    function deleteAuthor(id) {
        var answer = window.confirm("Delete author ?");

        if (answer) {
            $.ajax({
                url: "http://localhost:8081/api/author/delete/" + id,
                type: "DELETE",
                headers: { "Authorization": "Bearer " + token },
                contentType: "application/json",
                // cors: true,
                success: function (data) {
                    alert("Author deleted!");
                }
            });
        } else {
            alert("Author shall remain");
        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Publishers

    // New publisher

    $("#addpublisher").click(function (e) {

        let jsonData = FormDataJson.formToJson(document.querySelector("#publisher"));
        $.ajax({
            url: "http://localhost:8081/api/publisher/new",
            type: "POST",
            contentType: "application/json",
            // cors: true,
            dataType: "json",
            headers: { "Authorization": "Bearer " + token },
            data: JSON.stringify(jsonData),
            success: function (jsonData) {
                alert("Publisher successfully added!");
                window.location.href = "viewpublishers.html";

            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault(); //STOP default action

    });


    // Update Publisher
    if ($('body').is('.updatepublisher')) {
        const params = new URLSearchParams(window.location.search);
        let publisherId = params.get("publisherid");

        $.ajax({
            url: "http://localhost:8081/api/publisher/getbyid/" + publisherId,
            type: 'GET',
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {

                var obj = data;
                // console.log(obj);

                FormDataJson.fillFormFromJsonValues(document.querySelector("#publisherupdate"), obj.publisher);
            }
        });
    };


    //Submit update
    $("#updatep").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#publisherupdate"));

        let id = FormDataJson.getInputValue(document.querySelector("#publisherId"))
        // console.log(id);

        $.ajax({
            url: "http://localhost:8081/api/publisher/update/" + id,
            type: "PUT",
            contentType: "application/json",
            // cors: true,
            dataType: "json",
            headers: { "Authorization": "Bearer " + token },
            data: JSON.stringify(jsonData),
            success: function () {
                window.location.href = "viewpublishers.html";
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault();

    });

    // View Publishers

    var tablep = $('#publishers').DataTable({
        ajax: {
            url: 'http://localhost:8081/api/publisher/getall',
            dataSrc: 'publishers',
            type: "GET",
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            contentType: "application/json"
        },
        columns: [
            { 'data': "publisherId" },
            { 'data': "name" },
            { 'data': "country" },
            { 'data': "city" },
            {
                searchable: false,
                title: "Edit",
                orderable: false,
                defaultContent: '<button id="btn1" class=\"btn btn-success\"><em class=\"fa fa-pencil\"></em></button>'
            },
            {
                searchable: false,
                title: "Delete",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            }
        ]

    });


    $('#publishers').on('click', 'tr #btn1', function () {
        var id = tablep.row(this.parentNode).data().publisherId;
        window.location.href = 'updatepublisher.html?publisherid=' + id + '';
    });

    $('#publishers').on('click', 'tr #btn2', function () {
        var id = tablep.row(this.parentNode).data().publisherId;
        var n = tablep.row(this.parentNode).data().name;

        if (confirm("Do you want to delete author " + n + "?") == true) {
            deletePublisher(id);
            window.location.href = 'viewpublishers.html'
        } else {
            alert("Entity not deleted");
        }
    });

    // Delete publisher
    function deletePublisher(id) {
        var answer = window.confirm("Delete author ?");

        if (answer) {
            $.ajax({
                url: "http://localhost:8081/api/author/delete/" + id,
                type: "DELETE",
                headers: { "Authorization": "Bearer " + token },
                contentType: "application/json",
                // cors: true,
                success: function (data) {
                    alert("Author deleted!");
                }
            });
        } else {
            alert("Author shall remain");
        }
    };


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Books

    // New book
    if ($('body').is('.newbook')) {
        const params = new URLSearchParams(window.location.search);
        var token = localStorage.getItem("token")

        const options = {
            type: "GET",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json"
        }

        // Load Publishers
        let dropdownp = document.getElementById('publisherId');
        dropdownp.length = 0;
        let defaultOptionp = document.createElement('option');
        defaultOptionp.text = 'Choose Publisher';
        dropdownp.add(defaultOptionp);
        dropdownp.selectedIndex = 0;

        fetch('http://localhost:8081/api/publisher/getall', options)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.warn('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response  
                    response.json().then(function (data) {
                        let option;

                        for (let i = 0; i < data.publishers.length; i++) {
                            option = document.createElement('option');
                            option.value = data.publishers[i].publisherId;
                            option.text = data.publishers[i].name;
                            dropdownp.add(option);
                        }
                    });
                }
            );

        // Load Authors
        let dropdowna = document.getElementById('authorIds');
        dropdowna.length = 0;
        let defaultOptiona = document.createElement('option');
        defaultOptiona.text = 'Choose Author';
        dropdowna.add(defaultOptiona);
        dropdowna.selectedIndex = 0;

        fetch('http://localhost:8081/api/author/getall', options)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.warn('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response  
                    response.json().then(function (data) {
                        let option;

                        for (let i = 0; i < data.authors.length; i++) {
                            option = document.createElement('option');
                            option.value = data.authors[i].authorId;
                            option.text = data.authors[i].firstName + " " + data.authors[i].lastName;
                            dropdowna.add(option);
                            console.log(data.authors[i]);
                        }
                    });
                }
            );


        // Load pricings
        let dropdownpr = document.getElementById('pricingId');
        dropdownpr.length = 0;
        let defaultOptionpr = document.createElement('option');
        defaultOptionpr.text = 'Choose Pricing';
        dropdownpr.add(defaultOptionpr);
        dropdownpr.selectedIndex = 0;


        fetch('http://localhost:8081/api/pricing/getall', options)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.warn('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response  
                    response.json().then(function (data) {
                        let option;

                        for (let i = 0; i < data.pricingList.length; i++) {
                            option = document.createElement('option');
                            option.value = data.pricingList[i].pricingId;
                            option.text = data.pricingList[i].startingPrice;
                            dropdownpr.add(option);
                            // console.log(data.pricings[i]);
                        }
                    });
                }
            );

        // Load categories
        let dropdownc = document.getElementById('categoryIds');
        dropdownc.length = 0;
        let defaultOptionc = document.createElement('option');
        defaultOptionc.text = 'Choose Category';
        dropdownc.add(defaultOptionc);
        dropdownc.selectedIndex = 0;


        fetch('http://localhost:8081/api/category/getall', options)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.warn('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response  
                    response.json().then(function (data) {
                        let option;

                        for (let i = 0; i < data.categories.length; i++) {
                            option = document.createElement('option');
                            option.value = data.categories[i].categoryId;
                            option.text = data.categories[i].type;
                            dropdownc.add(option);
                            console.log(data.categories[i]);
                        }
                    });
                }
            );

        // //language
        let dropdownl = document.getElementById('languageIds');
        dropdownc.length = 0;
        let defaultOptionl = document.createElement('option');
        defaultOptionl.text = 'Choose Language';
        dropdownl.add(defaultOptionl);
        dropdownl.selectedIndex = 0;

        fetch('http://localhost:8081/api/language/getall', options)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.warn('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response  
                    response.json().then(function (data) {
                        let option;

                        for (let i = 0; i < data.languages.length; i++) {
                            option = document.createElement('option');
                            option.value = data.languages[i].languageId;
                            option.text = data.languages[i].languageType;
                            dropdownl.add(option);
                            // console.log(data.languages[i]);
                        }
                    });
                }
            );



    }


    $("#addbook").click(function (e) {

        let jsonData = FormDataJson.formToJson(document.querySelector("#book"));
        $.ajax({
            url: "http://localhost:8081/api/book/new",
            type: "POST",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            // cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                alert("Book successfully added!");
                window.location.href = "viewbooks.html";
            },
            error: function (jqXHR, textStatus, errorThrown) { console.log(jsonData) }
        });
        e.preventDefault(); //STOP default action

    });


    // Update Book
    if ($('body').is('.updatebook')) {
        const params = new URLSearchParams(window.location.search);
        let bookId = params.get("bookid");

        $.ajax({
            url: "http://localhost:8081/api/book/getbyid/" + bookId,
            type: 'GET',
            headers: { "Authorization": "Bearer " + token },
            success: async function (data) {
                var obj = data;
                FormDataJson.fillFormFromJsonValues(document.querySelector("#bookupdate"), obj.book);

                var token = localStorage.getItem("token")
                // console.log(token);
                const options = {
                    type: "GET",
                    headers: { "Authorization": "Bearer " + token },
                    contentType: "application/json"
                }

                // Load Publishers
                let dropdownp = document.getElementById('publisherId');
                dropdownp.length = 0;

                let defaultOptionp = document.createElement('option');
                defaultOptionp.text = 'Choose Publisher';

                dropdownp.add(defaultOptionp);
                dropdownp.selectedIndex = 0;

                await fetch('http://localhost:8081/api/publisher/getall', options)
                    .then(
                        function (response) {
                            if (response.status !== 200) {
                                console.warn('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                return;
                            }
                            // Examine the text in the response  
                            response.json().then(function (data) {
                                let option;

                                for (let i = 0; i < data.publishers.length; i++) {
                                    option = document.createElement('option');
                                    option.value = data.publishers[i].publisherId;
                                    option.text = data.publishers[i].name;
                                    dropdownp.add(option);
                                    console.log(data.publishers[i]);
                                }
                            });
                        }
                    );

                // Load Authors
                let dropdowna = document.getElementById('authorIds');
                dropdowna.length = 0;
                let defaultOptiona = document.createElement('option');
                defaultOptiona.text = 'Choose Author';
                dropdowna.add(defaultOptiona);
                dropdowna.selectedIndex = 0;

                await fetch('http://localhost:8081/api/author/getall', options)
                    .then(
                        function (response) {
                            if (response.status !== 200) {
                                console.warn('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                return;
                            }

                            // Examine the text in the response  
                            response.json().then(function (data) {
                                let option;

                                for (let i = 0; i < data.authors.length; i++) {
                                    option = document.createElement('option');
                                    option.value = data.authors[i].authorId;
                                    option.text = data.authors[i].firstName + " " + data.authors[i].lastName;
                                    dropdowna.add(option);
                                    console.log(data.authors[i]);
                                }
                            });
                        }
                    );


                // Load pricings
                let dropdownpr = document.getElementById('pricingId');
                dropdownpr.length = 0;
                let defaultOptionpr = document.createElement('option');
                defaultOptionpr.text = 'Choose Pricing';
                dropdownpr.add(defaultOptionpr);
                dropdownpr.selectedIndex = 0;


                await fetch('http://localhost:8081/api/pricing/getall', options)
                    .then(
                        function (response) {
                            if (response.status !== 200) {
                                console.warn('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                return;
                            }

                            // Examine the text in the response  
                            response.json().then(function (data) {
                                let option;

                                for (let i = 0; i < data.pricingList.length; i++) {
                                    option = document.createElement('option');
                                    option.value = data.pricingList[i].pricingId;
                                    option.text = data.pricingList[i].startingPrice;
                                    dropdownpr.add(option);
                                    // console.log(data.pricings[i]);
                                }
                            });
                        }
                    );

                // Load categories
                let dropdownc = document.getElementById('categoryIds');
                dropdownc.length = 0;
                let defaultOptionc = document.createElement('option');
                defaultOptionc.text = 'Choose Category';
                dropdownc.add(defaultOptionc);
                dropdownc.selectedIndex = 0;


                await fetch('http://localhost:8081/api/category/getall', options)
                    .then(
                        function (response) {
                            if (response.status !== 200) {
                                console.warn('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                return;
                            }

                            // Examine the text in the response  
                            response.json().then(function (data) {
                                let option;

                                for (let i = 0; i < data.categories.length; i++) {
                                    option = document.createElement('option');
                                    option.value = data.categories[i].categoryId;
                                    option.text = data.categories[i].type;
                                    dropdownc.add(option);
                                    console.log(data.categories[i]);
                                }
                            });
                        }
                    );

                // //language
                let dropdownl = document.getElementById('languageIds');
                dropdownl.length = 0;
                let defaultOptionl = document.createElement('option');
                defaultOptionl.text = 'Choose Language';
                dropdownl.add(defaultOptionl);
                dropdownl.selectedIndex = 0;

                await fetch('http://localhost:8081/api/language/getall', options)
                    .then(
                        function (response) {
                            if (response.status !== 200) {
                                console.warn('Looks like there was a problem. Status Code: ' +
                                    response.status);
                                return;
                            }

                            // Examine the text in the response  
                            response.json().then(function (data) {
                                let option;

                                for (let i = 0; i < data.languages.length; i++) {
                                    option = document.createElement('option');
                                    option.value = data.languages[i].languageId;
                                    option.text = data.languages[i].languageType;
                                    dropdownl.add(option);
                                    // console.log(data.languages[i]);
                                }
                            });
                        }
                    );

            }
        });
    };


    //Submit update
    $("#postupdatebook").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#bookupdate"));
        let id = FormDataJson.getInputValue(document.querySelector("#bookId"))
        console.log(JSON.stringify(jsonData));

        alert("Loading...");
        $.ajax({
            url: "http://localhost:8081/api/book/update/" + id,
            type: "PUT",
            contentType: "application/json",
            cors: true,
            dataType: "json",
            headers: { "Authorization": "Bearer " + token },
            data: JSON.stringify(jsonData),
            success: function () {
                alert("Book has been updated!")
                window.location.href = "viewbooks.html";
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault();

    });

    // View books
    var tableb = $('#books').DataTable({
        ajax: {
            url: 'http://localhost:8081/api/book/getall',
            dataSrc: 'books',
            type: "GET",
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            contentType: "application/json"
        },
        columns: [
            { 'data': "bookId" },
            { 'data': "title" },
            { 'data': "pages" },
            { 'data': "publicationDate" },
            // { 'data': "description" },
            { 'data': "rating" },
            { 'data': "isbn13" },
            { 'data': "pricing.startingPrice" },
            {
                'data': null, render: function (data, type, row) {
                    var all = '';
                    for (i = 0; i < data.authors.length; i++) {
                        all += data.authors[i].firstName + ' ' + data.authors[i].lastName + ' ';
                    }
                    return all
                }

            },
            { 'data': "publisher.name" },
            {
                'data': null, render: function (data, type, row) {
                    var all = '';
                    for (i = 0; i < data.categories.length; i++) {
                        all += data.categories[i].type + ' ';
                    }
                    // console.log(all);
                    return all
                }
            }, {
                'data': null, render: function (data, type, row) {
                    var all = '';
                    for (i = 0; i < data.languages.length; i++) {
                        all += data.languages[i].languageType + ' ';
                    }
                    // console.log(all);
                    return all
                }
            },

            {
                searchable: false,
                title: "Edit",
                orderable: false,
                defaultContent: '<button id="btn1" class=\"btn btn-success\"><em class=\"fa fa-pencil\"></em></button>'
            },
            {
                searchable: false,
                title: "Delete",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            }
        ]

    });


    $('#books').on('click', 'tr #btn1', function () {
        var id = tableb.row(this.parentNode).data().bookId;
        window.location.href = 'updatebook.html?bookid=' + id + '';
    });

    $('#books').on('click', 'tr #btn2', function () {
        var id = tableb.row(this.parentNode).data().bookId;
        var t = tableb.row(this.parentNode).data().title;

        if (confirm("Do you want to delete book " + t + "?") == true) {
            deleteBook(id);
            window.location.href = 'viewbooks.html'
        } else {
            alert("Βοοκ not deleted");
        }
    });

    // Delete book
    function deleteBook(id) {
        $.ajax({
            url: "http://localhost:8081/api/book/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            // cors: true,
            success: function (data) {
                alert("Book deleted!");
            }
        });

    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Categories

    // Create new category
    $("#addcategory").click(function (e) {

        let jsonData = FormDataJson.formToJson(document.querySelector("#category"));
        $.ajax({
            url: "http://localhost:8081/api/category/new",
            type: "POST",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                alert("Category successfully added!");
                window.location.href = 'viewcategories.html'
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault(); //STOP default action

    });

    if ($('body').is('.updatecategory')) {

        const params = new URLSearchParams(window.location.search);
        let catid = params.get("categoryid");

        $.ajax({
            url: "http://localhost:8081/api/category/getbyid/" + catid,
            type: 'GET',
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                console.log(data);
                FormDataJson.fillFormFromJsonValues(document.querySelector("#catupdate"), data.category);
            }
        });
    };


    // View Categories

    var tablecat = $('#categories').DataTable({
        "pageLength": 10,
        "sPaginationType": "full_numbers",
        ajax: {
            url: 'http://localhost:8081/api/category/getall',
            dataSrc: 'categories',
            type: "GET",
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            contentType: "application/json"
        },

        columns: [
            { 'data': "categoryId" },
            { 'data': "type" },
            {
                searchable: false,
                title: "Delete",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            }

        ]

    });

    $('#categories').on('click', 'tr #btn2', function () {
        var id = tablelang.row(this.parentNode).data().categoryId;
        var type = tablelang.row(this.parentNode).data().type;

        if (confirm("Do you want to delete category " + type + "?") == true) {
            deleteCategory(id);
            window.location.href = 'viewcategories.html'
        } else {
            alert("Category not deleted");
        }
    });

    // Delete publisher
    function deleteCategory(id) {
        $.ajax({
            url: "http://localhost:8081/api/category/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            // cors: true,
            success: function (data) {
                alert("Category deleted!");
            }
        });

    };





    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Languages

    // Create new category
    $("#addlanguage").click(function (e) {

        let jsonData = FormDataJson.formToJson(document.querySelector("#language"));
        $.ajax({
            url: "http://localhost:8081/api/language/new",
            type: "POST",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                alert("Language successfully added!");
                window.location.href = 'viewlanguages.html'
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault(); //STOP default action

    });


    // View Languages

    var tablelang = $('#languages').DataTable({
        "pageLength": 10,
        "sPaginationType": "full_numbers",
        ajax: {
            url: 'http://localhost:8081/api/language/getall',
            dataSrc: 'languages',
            type: "GET",
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            contentType: "application/json"
        },

        columns: [
            { 'data': "languageId" },
            { 'data': "languageType" },
            {
                searchable: false,
                title: "Delete",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            }

        ]

    });

    $('#languages').on('click', 'tr #btn2', function () {
        var id = tablelang.row(this.parentNode).data().languageId;
        var type = tablelang.row(this.parentNode).data().languageType;

        if (confirm("Do you want to delete language " + type + "?") == true) {
            deleteLanguage(id);
            window.location.href = 'viewlanguages.html'
        } else {
            alert("Language was not deleted");
        }
    });

    // Delete publisher
    function deleteLanguage(id) {
        $.ajax({
            url: "http://localhost:8081/api/language/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            // cors: true,
            success: function (data) {
                alert("Language was deleted!");
            }
        });

    };


















    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Orders

    // New order
    $("#addorder").click(function (e) {

        let jsonData = FormDataJson.formToJson(document.querySelector("#order"));
        $.ajax({
            url: "http://localhost:8081/api/order/new",
            type: "POST",
            contentType: "application/json",
            // cors: true,
            dataType: "json",
            headers: { "Authorization": "Bearer " + token },
            data: JSON.stringify(jsonData),
            success: function (jsonData) {
                alert("Order successfully completed!");
                window.location.href = "vieworders.html";

            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault(); //STOP default action

    });


    // Update Publisher
    if ($('body').is('.updateorder')) {
        const params = new URLSearchParams(window.location.search);
        let orderid = params.get("orderid");

        $.ajax({
            url: "http://localhost:8081/api/order/getbyid/" + orderid,
            headers: { "Authorization": "Bearer " + token },
            type: 'GET',

            success: function (data) {

                var obj = data;
                console.log(obj);

                FormDataJson.fillFormFromJsonValues(document.querySelector("#orderupdate"), obj.order);
            }
        });
    };


    //Submit update
    $("#updateo").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#orderupdate"));

        let id = FormDataJson.getInputValue(document.querySelector("#orderId"))
        // console.log(id);

        $.ajax({
            url: "http://localhost:8081/api/order/update/" + id,
            type: "PUT",
            contentType: "application/json",
            // cors: true,
            headers: { "Authorization": "Bearer " + token },
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                window.location.href = "vieworders.html";
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault();

    });

    // View orders

    var tableor = $('#orders').DataTable({
        ajax: {
            url: 'http://localhost:8081/api/order/getall',
            dataSrc: 'orders',
            type: "GET",
            responsive: true,
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json"
        },
        columns: [
            { 'data': "orderId" },
            { 'data': "account.username" },
            { 'data': "orderDate" },
            { 'data': "totalCoins" },
            {
                searchable: false,
                title: "Delete",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            }
        ]

    });

    // console.log(tableor);


    $('#orders').on('click', 'tr #btn2', function () {
        var id = tableor.row(this.parentNode).data().orderId;

        if (confirm("Do you want to delete order with " + id + "?") == true) {
            deleteOrder(id);

        } else {
            alert("Order not deleted");
        }
    });


    function deleteOrder(id) {
        $.ajax({
            url: "http://localhost:8081/api/order/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            // cors: true,
            success: function (data) {
                alert("Order deleted!");
                window.location.href = 'vieworders.html'
            }
        });
    };



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Order details

    // New order details

    $("#addorderd").click(function (e) {

        let jsonData = FormDataJson.formToJson(document.querySelector("#orderd"));
        $.ajax({
            url: "http://localhost:8081/api/orderdetails/new",
            type: "POST",
            contentType: "application/json",
            // cors: true,
            dataType: "json",
            headers: { "Authorization": "Bearer " + token },
            data: JSON.stringify(jsonData),
            success: function (jsonData) {
                alert("Order successfully completed!");
                window.location.href = "vieworderdetails.html";

            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault(); //STOP default action

    });


    // Update Publisher
    if ($('body').is('.updateorderd')) {
        const params = new URLSearchParams(window.location.search);
        let bookId = params.get("orderid");

        $.ajax({
            url: "http://localhost:8081/api/orderdetails/getbyid/" + orderId,
            type: 'GET',
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {

                var obj = data;
                console.log(obj);

                FormDataJson.fillFormFromJsonValues(document.querySelector("#orderupdate"), obj.order);
            }
        });
    };


    //Submit update
    $("#updateo").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#orderupdate"));

        let id = FormDataJson.getInputValue(document.querySelector("#orderId"))
        // console.log(id);

        $.ajax({
            url: "http://localhost:8081/api/order/update/" + id,
            type: "PUT",
            contentType: "application/json",
            // cors: true,
            dataType: "json",
            headers: { "Authorization": "Bearer " + token },
            data: JSON.stringify(jsonData),
            success: function () {
                window.location.href = "vieworders.html";
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault();

    });

    // View order details
    var tableord = $('#ordersd').DataTable({
        ajax: {
            url: 'http://localhost:8081/api/orderdetails/getall',
            dataSrc: 'orderDetailsList',
            type: "GET",
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            contentType: "application/json"
        },
        columns: [
            { 'data': "orderDetailsId" },
            { 'data': "order.orderId" },
            // { 'data': "bookId" },
            { 'data': "originalPrice" },
            { 'data': "discountRate" },
            { 'data': "totalPrice" },
            {
                searchable: false,
                title: "Delete",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            }
        ]

    });


    $('#ordersd').on('click', 'tr', function () {
        var id = tableord.row(this.parentNode).data().orderDetailsId;
        console.log(id)
        if (confirm("Do you want to delete order details with id " + id + "?") == true) {
            deleteOrderDetails(id);
        } else {
            alert("Order details not deleted");
        }
    });




    function deleteOrderDetails(id) {
        $.ajax({
            url: "http://localhost:8081/api/orderdetails/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            // cors: true,
            success: function (data) {
                alert("Order details deleted!");
                window.location.href = 'vieworders.html'
            }
        });
    };











    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pricings

    // New Pricing
    $("#addpricing").click(function (e) {

        let jsonData = FormDataJson.formToJson(document.querySelector("#pricing"));
        console.log(jsonData);

        $.ajax({
            url: "http://localhost:8081/api/pricing/new",
            type: "POST",
            contentType: "application/json",
            // cors: true,
            dataType: "json",
            headers: { "Authorization": "Bearer " + token },
            data: JSON.stringify(jsonData),
            success: function () {
                alert("Pricing successfully added!");
                window.location.href = "viewpricings.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Failed");
            }
        });
        e.preventDefault(); //STOP default action

    });


    // Update Pricing
    if ($('body').is('.updatepricing')) {
        const params = new URLSearchParams(window.location.search);
        let pricingid = params.get("pricingid");

        $.ajax({
            url: "http://localhost:8081/api/pricing/getbyid/" + pricingid,
            headers: { "Authorization": "Bearer " + token },
            type: 'GET',
            success: function (data) {
                FormDataJson.fillFormFromJsonValues(document.querySelector("#updatepricing"), data.pricing);

                var dates = data.pricing.startingDate;

                var sd = new Date(Date.parse(dates));
                var sdf = sd.format("UTC:yyyy-mm-dd'T'HH:MM:ss");


                var ed = new Date(Date.parse(dates));
                var edf = sd.format("UTC:yyyy-mm-dd'T'HH:MM:ss");

                FormDataJson.setInputValue(document.querySelector("#startingDate"), sdf);
                FormDataJson.setInputValue(document.querySelector("#endingDate"), edf);
            }
        });
    };


    //Submit update
    $("#updatepr").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#updatepricing"));
        console.log(jsonData);
        let id = FormDataJson.getInputValue(document.querySelector("#pricingId"))
        console.log(id);


        $.ajax({
            url: "http://localhost:8081/api/pricing/update/" + id,
            type: "PUT",
            contentType: "application/json",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + token
            },
            // cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {

                window.location.href = "viewpricings.html";
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault();

    });

    // View pricings

    var tablepr = $('#pricings').DataTable({
        ajax: {
            url: 'http://localhost:8081/api/pricing/getall',
            dataSrc: 'pricingList',
            type: "GET",
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            contentType: "application/json"
        },
        columns: [
            { 'data': "pricingId" },
            // { 'data': "book.title" },
            { 'data': "startingPrice" },
            { 'data': "discount" },
            { 'data': "startingDate" },
            { 'data': "endingDate" },
            {
                searchable: false,
                title: "Edit",
                orderable: false,
                defaultContent: '<button id="btn1" class=\"btn btn-success\"><em class=\"fa fa-pencil\"></em></button>'
            },
            {
                searchable: false,
                title: "Delete",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            }
        ]

    });


    $('#pricings').on('click', 'tr #btn1', function () {
        var id = tablepr.row(this.parentNode).data().pricingId;
        // console.log(id);
        window.location.href = 'updatepricing.html?pricingid=' + id + '';
    });

    // $('#pricings').on('click', 'tr', function () {
    //     var id = tablepr.row(this).data().book;
    //     console.log(id)
    // });

    $('#pricings').on('click', 'tr #btn2', function () {
        var id = tablepr.row(this.parentNode).data().pricingId;

        if (confirm("Do you want to delete pricing " + id + "?") == true) {
            deletePricing(id);
            window.location.href = 'viewpricings.html'
        } else {
            alert("Pricing not deleted");
        }
    });



    function deletePricing(id) {
        $.ajax({
            url: "http://localhost:8081/api/pricing/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            // cors: true,
            success: function (data) {
                alert("Pricing deleted!");
            }
        });
    };










    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Roles

    // New role
    $("#addrole").click(function (e) {

        let jsonData = FormDataJson.formToJson(document.querySelector("#role"));
        console.log(jsonData);

        $.ajax({
            url: "http://localhost:8081/api/role/new",
            type: "POST",
            contentType: "application/json",
            // cors: true,
            dataType: "json",
            headers: { "Authorization": "Bearer " + token },
            data: JSON.stringify(jsonData),
            success: function () {
                alert("Role successfully added!");
                window.location.href = "viewroles.html";

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Failed");
            }
        });
        e.preventDefault(); //STOP default action

    });

    // Update Role
    if ($('body').is('.roleupdate')) {
        const params = new URLSearchParams(window.location.search);
        let roleid = params.get("roleid");

        $.ajax({
            url: "http://localhost:8081/api/role/getbyid/" + roleid,
            type: 'GET',
            success: function (data) {
                FormDataJson.fillFormFromJsonValues(document.querySelector("#updaterl"), data.role);
                console.log(data);
            }
        });
    };


    //Submit update
    $("#updaterole").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#updaterl"));
        console.log(jsonData);
        let id = FormDataJson.getInputValue(document.querySelector("#roleId"))
        console.log(id);


        $.ajax({
            url: "http://localhost:8081/api/role/update/" + id,
            type: "PUT",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            // cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function (jsonData) {
                window.location.href = "viewroles.html";
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault();

    });


    // View roles

    var tableroles = $('#roles').DataTable({
        ajax: {
            url: 'http://localhost:8081/api/role/getall',
            dataSrc: 'roles',
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            type: "GET",
            contentType: "application/json"
        },
        columns: [
            // { 'data': "book.title" },
            { 'data': "type" },
            {
                searchable: false,
                title: "Edit",
                orderable: false,
                defaultContent: '<button id="btn1" class=\"btn btn-success\"><em class=\"fa fa-pencil\"></em></button>'
            },
            {
                searchable: false,
                title: "Delete",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            }
        ]

    });


    $('#roles').on('click', 'tr #btn1', function () {
        var id = tableroles.row(this.parentNode).data().roleId;
        window.location.href = 'updaterole.html?roleid=' + id + '';
    });

    $('#roles').on('click', 'tr #btn2', function () {
        var id = tableroles.row(this.parentNode).data().roleId;
        var type = tableroles.row(this.parentNode).data().type;
        console.log(id);

        if (confirm("Do you want to delete role " + type + "?") == true) {
            deleteRole(id);
            window.location.href = 'viewroles.html'
        } else {
            alert("Role not deleted");
        }
    });

    // Delete Role
    function deleteRole(id) {
        $.ajax({
            url: "http://localhost:8081/api/role/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            // cors: true,
            success: function (data) {
                alert("Role deleted!");
            }
        });
    };


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Accounts

    // View accounts

    var tableroles = $('#accounts').DataTable({
        ajax: {
            url: 'http://localhost:8081/api/account/getall',
            dataSrc: 'accounts',
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            type: "GET",
            contentType: "application/json"
        },
        columns: [
            { 'data': "username" },
            { 'data': "firstName" },
            { 'data': "lastName" },
            { 'data': "dateOfBirth" },
            { 'data': "email" },
            { 'data': "gender" },
            { 'data': "coins" },
            {
                searchable: false,
                title: "Delete",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            }
        ]

    });


    $('#accounts').on('click', 'tr #btn2', function () {
        var id = tableroles.row(this.parentNode).data().accountId;
        var username = tableroles.row(this.parentNode).data().username;
        console.log(id);

        if (confirm("Do you want to delete account " + username + "?") == true) {
            if (confirm("Are you sure that you are sure? Deleting an account is irreversible!") == true) {
                deleteRole(id);
                window.location.href = 'viewaccounts.html'
            } else {
                alert("Account not deleted");
            }
        } else {
            alert("Account not deleted");
        }
    });

    // Delete account
    function deleteRole(id) {
        $.ajax({
            url: "http://localhost:8081/api/account/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            // cors: true,
            success: function (data) {
                alert("Account deleted!");
            }
        });
    };


    // Update account

    // Update Role
    if ($('body').is('.accountupdate')) {

        var username = localStorage.getItem("username")

        $.getJSON("http://localhost:8081/api/account/getaccountidbyusername/" + username, function (data) {
            $.getJSON("http://localhost:8081/api/account/getbyid/" + data.accountId, function (data) {
                FormDataJson.fillFormFromJsonValues(document.querySelector("#updateaccount"), data.account);
                console.log(data.account)


                var dates = data.account.dateOfBirth;

                var dob = new Date(Date.parse(dates));
                var fdob = dob.format("yyyy-mm-dd");


                FormDataJson.setInputValue(document.querySelector("#dateOfBirth"), fdob);


            });

        });


    };

    //Submit update

    $("#updateacc").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#updateaccount"));
        let id = FormDataJson.getInputValue(document.querySelector("#accountId"))
        console.log(jsonData);
        $.ajax({
            url: "http://localhost:8081/api/account/update/" + id,
            type: "PUT",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            // cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                window.location.href = "userpage.html";
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        e.preventDefault();

    });



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Purchase history

    var tablepurchases = $('#purchases').DataTable({
        ajax: {
            url: 'http://localhost:8081/api/purchasehistory/getall',
            dataSrc: 'purchaseHistories',
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            type: "GET",
            contentType: "application/json"
        },
        columns: [
            { 'data': "purchaseId" },
            { 'data': "account.username" },
            { 'data': "purchaseDate" },
            { 'data': "purchasedCoins" },
            { 'data': "eurosSpent" }
            // ,
            // {
            //     searchable: false,
            //     title: "Delete",
            //     orderable: false,
            //     defaultContent: '<button id="btn2" class=\"btn btn-danger\"><em class=\"fa fa-trash\"></em></button>'
            // }
        ]

    });

    // $('#purchases').on('click', 'tr #btn2', function () {
    //     var id = tablepurchases.row(this.parentNode).data().purchaseId;
    //     console.log(id);

    //     if (confirm("Do you want to delete this purchase history ?") == true) {
    //         deletePurchaseHistory(id);
    //     } else {
    //         alert("Purchase history not deleted");
    //     }
    // });

    //     // Delete account
    //     function deletePurchaseHistory(id) {
    //         $.ajax({
    //             url: "http://localhost:8081/api/purchasehistory/delete/" + id,
    //             type: "DELETE",
    //             headers: { "Authorization": "Bearer " + token },
    //             contentType: "application/json",
    //             // cors: true,
    //             success: function (data) {
    //                 alert("Account deleted!");
    //             }
    //         });
    //     };





});