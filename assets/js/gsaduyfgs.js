$(document).ready(function () {

    var token = localStorage.getItem("token")
    const options = {
        type: "GET",
        headers: { "Authorization": "Bearer " + token },
        contentType: "application/json"
    }

    var booktobuy = localStorage.getItem("book");
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


    if ($('body').is('.transactionpage')) {
        var tokenstobuy = localStorage.getItem("quantity", value);
        $('#tokens').text(tokenstobuy);
        $('#currency').text(tokenstobuy * 0.87);

    }



    if ($('body').is('.checkoutpage')) {
        window.addEventListener('load', async function () {
            setTimeout(function () {
                swal({
                    title: "Success!",
                    text: "Your transaction is in progress!",
                    type: "info",
                    confirmButtonText: "OK"
                },
                );
            }, 1000);
            const book = await fetch('http://ra1.anystream.eu:1090/bookstore/api/book/getbyid/' + booktobuy, {
                type: "GET",
                contentType: "application/json"
            })
        
            const asd = await book.json();

            FormDataJson.setInputValue(document.querySelector("#bookId"), asd.book.bookId);

            $('#title').text(asd.book.title);
            $('#pricing').prepend("Cost: " + asd.book.pricing.startingPrice);
            $('#rating').append(asd.book.rating + "/5");
            $('#price').prepend(asd.book.pricing.startingPrice);
            $('#discount').prepend(asd.book.pricing.discount * asd.book.pricing.startingPrice);
            $('#totalcost').prepend(asd.book.pricing.startingPrice - (asd.book.pricing.discount * asd.book.pricing.startingPrice));
            $('#productimg').attr('src', "assets/img/books/book-" + asd.book.bookId + ".jpg");
        });
    };

    $("#payment").click(async function (e) {
        e.preventDefault(); //STOP default action

        const user = await fetch('http://ra1.anystream.eu:1090/bookstore/api/account/getaccountidbyusername/' + username, options);
        const userId = await user.json();

        FormDataJson.setInputValue(document.querySelector("#accountId"), userId.accountId);

        let jsonData = FormDataJson.formToJson(document.querySelector("#checkoutform"));
        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/api/order/new",
            type: "POST",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: async function () {
                const order = await fetch('http://ra1.anystream.eu:1090/bookstore/api/order/getbyaccountid/' + userId.accountId, {
                    type: "GET",
                    headers: { "Authorization": "Bearer " + token },
                    contentType: "application/json"
                })
                const thisorder = await order.json();
                let last = thisorder.orders.pop();
                FormDataJson.setInputValue(document.querySelector("#orderId"), last.orderId);

                let data = FormDataJson.formToJson(document.querySelector("#orderdetails"));
                setTimeout(function () {
                    swal({
                        title: "Success!",
                        text: "Sending order...",
                        type: "info",
                        confirmButtonText: "OK"
                    },
                    );
                }, 1000);
                $.ajax({
                    url: "http://ra1.anystream.eu:1090/bookstore/api/orderdetails/new",
                    type: "POST",
                    contentType: "application/json",
                    headers: { "Authorization": "Bearer " + token },
                    cors: true,
                    dataType: "json",
                    data: JSON.stringify(data),
                    success: async function () {
                        const receipt = await fetch('http://ra1.anystream.eu:1090/bookstore/api/receipt/' + last.orderId, {
                            type: "GET",
                            headers: { "Authorization": "Bearer " + token },
                            contentType: "application/json"
                        })
                        const invoice = await receipt.json();
                        console.log(invoice.receipt);
                        setTimeout(function () {
                            swal({
                                title: "Your transaction is complete!!",
                                text: "You have purchased: " + invoice.receipt.bookTitles + "\ " +
                                    " Cost: " + invoice.receipt.totalCoins,
                                type: "success",
                                confirmButtonText: "OK"
                            },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        window.location.href = "user/userpage.html";
                                    }
                                }
                            );
                        }, 1000);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        setTimeout(function () { 
                            swal({
                              title: "Sorry!",
                              text: "Something is wrong, please try again!",
                              type: "error",
                              confirmButtonText: "OK"
                            },
                            function(isConfirm){
                              if (isConfirm) {
                                window.location.href = "index.html";
                              }}
                            ); }, 1000);
                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                setTimeout(function () { 
                    swal({
                      title: "Sorry!",
                      text: "Something is wrong, please try again!",
                      type: "error",
                      confirmButtonText: "OK"
                    },
                    function(isConfirm){
                      if (isConfirm) {
                        window.location.href = "index.html";
                      }
                    }); }, 1000);
            }
        });

    });



    if ($('body').is('.buytokens')) {
        var value;

        document.getElementById("v10").addEventListener("click", function () {
            value = 10;
            $('#total').text(value);
            $('#currency').text(value * 0.87);
        });
        document.getElementById("v20").addEventListener("click", function () {
            value = 20;
            $('#total').text(value);
            $('#currency').text(value * 0.87);
        });
        document.getElementById("v50").addEventListener("click", function () {
            value = 50;
            $('#total').text(value);
            $('#currency').text(value * 0.87);
        });
        document.getElementById("v100").addEventListener("click", function () {
            value = 100;
            $('#total').text(value);
            $('#currency').text(value * 0.87);
        });
        document.getElementById("v200").addEventListener("click", function () {
            value = 200;
            $('#total').text(value);
            $('#currency').text(value * 0.87);
        });
        document.getElementById("v500").addEventListener("click", function () {
            value = 500;
            $('#total').text(value);
            $('#currency').text(value * 0.87);
        });


        console.log(value)
        $("#begintransaction").click(function (e) {
            if (value != null) {
                localStorage.setItem("quantity", value);
                window.location.href = "transaction.html";
            } else {
                alert("Please select an option!");
            }
        });
    };

});