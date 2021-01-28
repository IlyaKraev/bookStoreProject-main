$(document).ready(function () {
    $("#addcoins").click(async function (e) {
        e.preventDefault(); //STOP default action
        console.log("works")
        var jsonData = {};
        $.ajaxSetup({
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });
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
        var enteredamount2 = document.getElementById("tokens").innerText
        var currency = document.getElementById("currency").innerText
        console.log(enteredamount2)
        console.log(username);
        var jsonDatas = {};
        jsonDatas["expirationDate"] = document.getElementById("expirationDate").value
        jsonDatas["cardNumber"] = document.getElementById("cardnumber").value
        jsonDatas["typeOfTransaction"] = "ebuy"
        jsonDatas["nameOnCard"] = document.getElementById("holder").value
        jsonDatas["typeOfCard"] = "visa"
        jsonDatas["cvvCode"] = document.getElementById("cvc").value
        jsonDatas["currencySpent"] = currency
        console.log(jsonDatas)
        setTimeout(function () {
            swal({
                title: "Transaction in progress",
                text: "The bank is checking the transaction details, please be patient",
                type: "info",
                confirmButtonText: "OK"
            },
            );
        }, 1000);
        $.ajax({
            url: "http://ra1.anystream.eu:1090/dummybank/api/card/checkcardvalidity",
            type: "POST",
            dataType: "text",
            contentType: "application/json; charset=UTF-8",
            cache: false,
            data: JSON.stringify(jsonDatas),
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            success: function (res) {
                console.log()
                var obj = JSON.parse(res)
                console.log(obj)
                $.each(obj, function (i, v) {
                    console.log(v)
                    if (v.includes("Successful")) {
                        setTimeout(function () {
                            swal({
                                title: "Success!",
                                text: "The bank has authorised your payment",
                                type: "success",
                                confirmButtonText: "OK"
                            },
                            );
                        }, 1000);
                        $.get("http://ra1.anystream.eu:1090/bookstore/api/account/getaccountidbyusername/" + username, function (data) {
                            console.log(data)
                            console.log(data.accountId)
                            console.log(v)
                            console.log(i)
                            var enteredamount = document.getElementById("tokens").innerText
                            console.log("Entered Amount is " + enteredamount)
                            jsonData["eurosSpent"] = enteredamount * 0.8;
                            jsonData["purchasedCoins"] = enteredamount
                            jsonData["accountId"] = data.accountId
                            console.log(jsonData)
                            console.log(jsonData)
                            console.log(JSON.stringify(jsonData))
                            $.ajax({
                                url: "http://ra1.anystream.eu:1090/bookstore/api/purchasehistory/new",
                                type: "POST",
                                dataType: "text",
                                contentType: "application/json; charset=UTF-8",
                                cache: false,
                                headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
                                data: JSON.stringify(jsonData),
                                success: function (res) {
                                    setTimeout(function () { 
                                        swal({
                                          title: "Transaction successful!",
                                          text: "You have recharged your account with coins!",
                                          type: "success",
                                          confirmButtonText: "OK"
                                        },
                                        function(isConfirm){
                                          if (isConfirm) {
                                            window.location.href = "index.html";
                                          }
                                        }); }, 1000);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.log(jqXHR)
                                    console.log(textStatus)
                                    console.log(errorThrown)
                                }
                            });

                        });
                    } else {
                        setTimeout(function () {
                            swal({
                                title: "Sorry!",
                                text: "The bank has not authorised your payment, please try again.",
                                type: "error",
                                confirmButtonText: "OK"
                            },
                            );
                        }, 1000);
                    }

                })

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR)
                console.log(textStatus)
                console.log(errorThrown)
            }
        });
    });

});