$(document).ready(function () {
    var token = localStorage.getItem("token")
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Authors

    // Create new author
    $("#addauthor").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#author"));
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/author/new",
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
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.")
            }
        });
        e.preventDefault(); //STOP default action

    });

    // Update Author
    if ($('body').is('.updateauthor')) {
        const params = new URLSearchParams(window.location.search);
        let authorId = params.get("authorid");
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/author/getbyid/" + authorId,
            type: 'GET',
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                var obj = data;
                FormDataJson.fillFormFromJsonValues(document.querySelector("#authorupdate"), obj.author);
            }
        });
    };


    //Submit update
    $("#updatea").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#authorupdate"));
        let id = FormDataJson.getInputValue(document.querySelector("#authorId"))
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/author/update/" + id,
            type: "PUT",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                alert("Author Updated.")
                window.location.href = "viewauthors.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.")
            }
        });
        e.preventDefault();

    });


    // View Authors
    var tablea = $('#authors').DataTable({
        "pageLength": 10,
        "sPaginationType": "full_numbers",
        ajax: {
            url: 'http://ra1.anystream.eu:1090/bookstore/api/author/getall',
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
            alert("Author was not deleted.");
        }
    });

    // Delete author
    function deleteAuthor(id) {
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/author/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            // cors: true,
            success: function (data) {
                alert("Author deleted!");
            }
        });
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Publishers

    // New publisher

    $("#addpublisher").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#publisher"));
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/publisher/new",
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
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.")
            }
        });
        e.preventDefault(); //STOP default action

    });

    // Update Publisher
    if ($('body').is('.updatepublisher')) {
        const params = new URLSearchParams(window.location.search);
        let publisherId = params.get("publisherid");
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/publisher/getbyid/" + publisherId,
            type: 'GET',
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                FormDataJson.fillFormFromJsonValues(document.querySelector("#publisherupdate"), data.publisher);
            }
        });
    };

    //Submit update
    $("#updatep").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#publisherupdate"));
        let id = FormDataJson.getInputValue(document.querySelector("#publisherId"))
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/publisher/update/" + id,
            type: "PUT",
            contentType: "application/json",
            // cors: true,
            dataType: "json",
            headers: { "Authorization": "Bearer " + token },
            data: JSON.stringify(jsonData),
            success: function () {
                alert("Publisher Updated.")
                window.location.href = "viewpublishers.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.")
            }
        });
        e.preventDefault();
    });

    // View Publishers
    var tablep = $('#publishers').DataTable({
        ajax: {
            url: 'http://ra1.anystream.eu:1090/bookstore/api/publisher/getall',
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
            alert("Publisher was not deleted");
        }
    });

    // Delete publisher
    function deletePublisher(id) {
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/author/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            // cors: true,
            success: function (data) {
                alert("Publisher deleted!");
            }
        });
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

        fetch('http://ra1.anystream.eu:1090/bookstore/api/publisher/getall', options)
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

        fetch('http://ra1.anystream.eu:1090/bookstore/api/author/getall', options)
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

        fetch('http://ra1.anystream.eu:1090/bookstore/api/pricing/getall', options)
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

        fetch('http://ra1.anystream.eu:1090/bookstore/api/category/getall', options)
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

        fetch('http://ra1.anystream.eu:1090/bookstore/api/language/getall', options)
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
                        }
                    });
                }
            );
    }


    $("#addbook").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#book"));
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/book/new",
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
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.");
            }
        });
        e.preventDefault(); //STOP default action

    });

    // Update Book
    if ($('body').is('.updatebook')) {
        const params = new URLSearchParams(window.location.search);
        let bookId = params.get("bookid");

        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/book/getbyid/" + bookId,
            type: 'GET',
            headers: { "Authorization": "Bearer " + token },
            success: async function (data) {
                var obj = data;
                FormDataJson.fillFormFromJsonValues(document.querySelector("#bookupdate"), obj.book);
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

                await fetch('http://ra1.anystream.eu:1090/bookstore/api/publisher/getall', options)
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
                await fetch('http://ra1.anystream.eu:1090/bookstore/api/author/getall', options)
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

                await fetch('http://ra1.anystream.eu:1090/bookstore/api/pricing/getall', options)
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

                await fetch('http://ra1.anystream.eu:1090/bookstore/api/category/getall', options)
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

                await fetch('http://ra1.anystream.eu:1090/bookstore/api/language/getall', options)
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
        alert("Loading...");
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/book/update/" + id,
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
            url: 'http://ra1.anystream.eu:1090/bookstore/api/book/getall',
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
            { 'data': "rating" },
            { 'data': "isbn13" },
            {
                'data': null, render: function (data, type, row) {
                    var all = '';
                    for (i = 0; i < data.authors.length; i++) {
                        all += data.authors[i].firstName + ' ' + data.authors[i].lastName + ' ';
                    }
                    return all
                }
            },
            { 'data': "pricing.startingPrice" },
            {
                searchable: false,
                title: "Edit Pricing",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-success\"><em class=\"fa fa-pencil\"></em></button>'
            },
            { 'data': "publisher.name" },
            {
                'data': null, render: function (data, type, row) {
                    var all = '';
                    for (i = 0; i < data.categories.length; i++) {
                        all += data.categories[i].type + ' ';
                    }
                    return all
                }
            }, {
                'data': null, render: function (data, type, row) {
                    var all = '';
                    for (i = 0; i < data.languages.length; i++) {
                        all += data.languages[i].languageType + ' ';
                    }
                    return all
                }
            },
            {
                searchable: false,
                title: "Edit",
                orderable: false,
                defaultContent: '<button id="btn1" class=\"btn btn-success\"><em class=\"fa fa-pencil\"></em></button>'
            }
        ]

    });

    $('#books').on('click', 'tr #btn1', function () {
        var id = tableb.row(this.parentNode).data().bookId;
        window.location.href = 'updatebook.html?bookid=' + id + '';
    });
    $('#books').on('click', 'tr #btn2', function () {
        var id = tableb.row(this.parentNode).data().pricing.pricingId;
        window.location.href = '../../pricing/updatepricing.html?pricingid=' + id + '';
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Categories

    // Create new category
    $("#addcategory").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#category"));
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/category/new",
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
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.")
            }
        });
        e.preventDefault(); //STOP default action

    });

    if ($('body').is('.updatecategory')) {
        const params = new URLSearchParams(window.location.search);
        let catid = params.get("categoryid");
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/category/getbyid/" + catid,
            type: 'GET',
            headers: { "Authorization": "Bearer " + token },
            success: function (data) {
                FormDataJson.fillFormFromJsonValues(document.querySelector("#catupdate"), data.category);
            }
        });
    };
    // TO DO POST UPDATE CATEGORY

    // View Categories
    var tablecat = $('#categories').DataTable({
        "pageLength": 10,
        "sPaginationType": "full_numbers",
        ajax: {
            url: 'http://ra1.anystream.eu:1090/bookstore/api/category/getall',
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
            alert("Category not deleted.");
        }
    });

    // Delete category
    function deleteCategory(id) {
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/category/delete/" + id,
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
            url: "http://ra1.anystream.eu:1090/bookstore/api/language/new",
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
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.");
            }
        });
        e.preventDefault(); //STOP default action
    });

    // View Languages
    var tablelang = $('#languages').DataTable({
        "pageLength": 10,
        "sPaginationType": "full_numbers",
        ajax: {
            url: 'http://ra1.anystream.eu:1090/bookstore/api/language/getall',
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

    // TO DO POST UPDATE LANGUAGE

    // Delete language
    function deleteLanguage(id) {
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/language/delete/" + id,
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
            url: "http://ra1.anystream.eu:1090/bookstore/api/order/new",
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
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.");
            }
        });
        e.preventDefault(); //STOP default action
    });


    // Update Publisher
    if ($('body').is('.updateorder')) {
        const params = new URLSearchParams(window.location.search);
        let orderid = params.get("orderid");
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/order/getbyid/" + orderid,
            headers: { "Authorization": "Bearer " + token },
            type: 'GET',
            success: function (data) {
                FormDataJson.fillFormFromJsonValues(document.querySelector("#orderupdate"), data.order);
            }
        });
    };


    //Submit update
    $("#updateo").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#orderupdate"));
        let id = FormDataJson.getInputValue(document.querySelector("#orderId"))
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/order/update/" + id,
            type: "PUT",
            contentType: "application/json",
            // cors: true,
            headers: { "Authorization": "Bearer " + token },
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                window.location.href = "vieworders.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.")
            }
        });
        e.preventDefault();
    });

    // View orders
    var tableor = $('#orders').DataTable({
        ajax: {
            url: 'http://ra1.anystream.eu:1090/bookstore/api/order/getall',
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
                title: "View Details",
                orderable: false,
                defaultContent: '<button id="btn2" class=\"btn btn-info\"><em class=\"fa fa-eye\"></em></button>'
            }
        ]

    });

    $('#orders').on('click', 'tr #btn2', function () {
        var id = tableor.row(this.parentNode).data().orderId;
        loadOrderDetails(id);
        $("#details").attr("hidden", false);
    });


    function loadOrderDetails(id) {
        
        var tableord = $('#ordersd').DataTable({
            ajax: {
                url: "http://ra1.anystream.eu:1090/bookstore/api/orderdetails/getbyorderid/" + id,
                dataSrc: 'orderDetailsList',
                type: "GET",
                headers: { "Authorization": "Bearer " + token },
                responsive: true,
                paging: false,
                searching: false,
                contentType: "application/json"
            },
            columns: [
                { 'data': "orderDetailsId" },
                { 'data': "order.orderId" },
                // { 'data': "book.bookId" },
                { 'data': "originalPrice" },
                { 'data': "discountRate" },
                { 'data': "totalPrice" }
            ]
        });

        $('#closetable').on('click', function () {
            tableord.destroy();
            $("#details").attr("hidden", true);
            location.reload();
        });


    };


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Pricings

    // New Pricing
    $("#addpricing").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#pricing"));
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/pricing/new",
            type: "POST",
            contentType: "application/json",
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
            url: "http://ra1.anystream.eu:1090/bookstore/api/pricing/getbyid/" + pricingid,
            headers: { "Authorization": "Bearer " + token },
            type: 'GET',
            success: function (data) {
                FormDataJson.fillFormFromJsonValues(document.querySelector("#updatepricing"), data.pricing);
                var dates = data.pricing.startingDate;
                var sd = new Date(Date.parse(dates));
                var sdf = sd.format("yyyy-mm-dd");
                var dated = data.pricing.endingDate;
                var ed = new Date(Date.parse(dated));
                var edf = ed.format("yyyy-mm-dd");
                FormDataJson.setInputValue(document.querySelector("#startingDate"), sdf);
                FormDataJson.setInputValue(document.querySelector("#endingDate"), edf);
            }
        });
    };

    //Submit update
    $("#updatepr").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#updatepricing"));
        let id = FormDataJson.getInputValue(document.querySelector("#pricingId"))
        console.log(jsonData)
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/pricing/update/" + id,
            type: "PUT",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + token
            },
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                window.history.go(-1);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.");
            }
        });
        e.preventDefault();
    });

    // View pricings
    var tablepr = $('#pricings').DataTable({
        ajax: {
            url: 'http://ra1.anystream.eu:1090/bookstore/api/pricing/getall',
            dataSrc: 'pricingList',
            type: "GET",
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            contentType: "application/json"
        },
        columns: [
            { 'data': "pricingId" },
            { 'data': "startingPrice" },
            { 'data': "discount" },
            { 'data': "startingDate" },
            { 'data': "endingDate" },
            {
                searchable: false,
                title: "Edit",
                orderable: false,
                defaultContent: '<button id="btn1" class=\"btn btn-success\"><em class=\"fa fa-pencil\"></em></button>'
            }
        ]
    });


    $('#pricings').on('click', 'tr #btn1', function () {
        var id = tablepr.row(this.parentNode).data().pricingId;
        window.location.href = 'updatepricing.html?pricingid=' + id + '';
    });

    // $('#pricings').on('click', 'tr #btn2', function () {
    //     var id = tablepr.row(this.parentNode).data().pricingId;

    //     if (confirm("Do you want to delete pricing " + id + "?") == true) {
    //         deletePricing(id);
    //         window.location.href = 'viewpricings.html'
    //     } else {
    //         alert("Pricing not deleted");
    //     }
    // });

    // function deletePricing(id) {
    //     $.ajax({
    //         url: "http://ra1.anystream.eu:1090/bookstore/api/pricing/delete/" + id,
    //         type: "DELETE",
    //         headers: { "Authorization": "Bearer " + token },
    //         contentType: "application/json",
    //         success: function (data) {
    //             alert("Pricing deleted!");
    //         }
    //     });
    // };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Roles
    // New role
    $("#addrole").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#role"));

        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/role/new",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            headers: { "Authorization": "Bearer " + token },
            data: JSON.stringify(jsonData),
            success: function () {
                alert("Role successfully added!");
                window.location.href = "viewroles.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.")
            }
        });
        e.preventDefault(); //STOP default action
    });

    // Update Role
    if ($('body').is('.roleupdate')) {
        const params = new URLSearchParams(window.location.search);
        let roleid = params.get("roleid");
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/role/getbyid/" + roleid,
            type: 'GET',
            success: function (data) {
                FormDataJson.fillFormFromJsonValues(document.querySelector("#updaterl"), data.role);
            }
        });
    };

    //Submit update
    $("#updaterole").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#updaterl"));
        let id = FormDataJson.getInputValue(document.querySelector("#roleId"))
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/role/update/" + id,
            type: "PUT",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            // cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function (jsonData) {
                window.location.href = "viewroles.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.")
            }
        });
        e.preventDefault();
    });


    // View roles
    var tableroles = $('#roles').DataTable({
        ajax: {
            url: 'http://ra1.anystream.eu:1090/bookstore/api/role/getall',
            dataSrc: 'roles',
            headers: { "Authorization": "Bearer " + token },
            responsive: true,
            type: "GET",
            contentType: "application/json"
        },
        columns: [
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
            url: "http://ra1.anystream.eu:1090/bookstore/api/role/delete/" + id,
            type: "DELETE",
            headers: { "Authorization": "Bearer " + token },
            contentType: "application/json",
            success: function (data) {
                alert("Role deleted!");
            }
        });
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Accounts

    // View accounts
    var tableaccounts = $('#accounts').DataTable({
        ajax: {
            url: 'http://ra1.anystream.eu:1090/bookstore/api/account/getall',
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
            { 'data': "coins" }
        ]

    });


    // Update account
    if ($('body').is('.accountupdate')) {

        var token = localStorage.getItem("token")
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var decrypted = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        console.log(decrypted)
        var splitusrn = decrypted.split(":")[1].split(",")[0]
        var removefront = splitusrn.substring(1)
        var username = removefront.slice(0, -1)

        $.getJSON("http://ra1.anystream.eu:1090/bookstore/api/account/getaccountidbyusername/" + username, function (data) {
            $.getJSON("http://ra1.anystream.eu:1090/bookstore/api/account/getbyid/" + data.accountId, function (data) {
                FormDataJson.fillFormFromJsonValues(document.querySelector("#updateaccount"), data.account);
                var dates = data.account.dateOfBirth;
                var dob = new Date(Date.parse(dates));
                var fdob = dob.format("yyyy-mm-dd");
                console.log(data);
                FormDataJson.setInputValue(document.querySelector("#dateOfBirth"), fdob);
                FormDataJson.setInputValue(document.querySelector("#coins"), data.account.coins);
                FormDataJson.setInputValue(document.querySelector("#roleId"), data.account.role.roleId);

            });
        });
    };

    //Submit update
    $("#updateacc").click(function (e) {
        let jsonData = FormDataJson.formToJson(document.querySelector("#updateaccount"));
        let id = FormDataJson.getInputValue(document.querySelector("#accountId"))
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/account/update/" + id,
            type: "PUT",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function () {
                window.location.href = "userpage.html";
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error handling request.");
            }
        });
        e.preventDefault();
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Purchase history
    var tablepurchases = $('#purchases').DataTable({
        ajax: {
            url: 'http://ra1.anystream.eu:1090/bookstore/api/purchasehistory/getall',
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
        ]
    });


});