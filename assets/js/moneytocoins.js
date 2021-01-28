$(document).ready(function () {
    $("#addcoins").click( async function (e) {
     
        e.preventDefault(); //STOP default action
        console.log("works")
        var jsonData = {};
        $.ajaxSetup({
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });
        
        const options = {
            type: "GET",
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            contentType: "application/json"
        }
    
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

        console.log(username);

        const user = await fetch('http://ra1.anystream.eu:1090/bookstore/api/account/getaccountidbyusername/' + username, options)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    
                });
            }
        );;
        const userId = await user.json();
        console.log(userId)
        alert("halt")
        // $.getJSON("http://http://ra1.anystream.eu:1090/bookstore/api/account/getaccountidbyusername/" + username, function (data) {
        // alert("One")    
        // $.each(data, function (i, v) {
        //         console.log(v)
        //         console.log(i)
        //         var enteredamount = document.getElementById("enteredamount").value
        //         jsonData["eurosSPent"] = enteredamount
        //         jsonData["purchasedCoins"] = enteredamount
        //         jsonData["accountId"] = v
        //         console.log(jsonData)
        //         console.log(jsonData)
        //         console.log(JSON.stringify(jsonData))
        //         $.ajax({
        //             url: "http://ra1.anystream.eu:1090/bookstore/api/purchasehistory/new",
        //             type: "POST",
        //             dataType: "text",
        //             contentType: "application/json; charset=UTF-8",
        //             cache: false,
        //             data: JSON.stringify(jsonData),
        //             success: function (res) {
        //                 alert("Two")    
        //                 console.log(res)
        //                 alert("Your coins have been successfully added!")
        //                 window.location.href = "index.html";
        
        //             },
        //             error: function (jqXHR, textStatus, errorThrown) {
        //                 console.log(jqXHR)
        //                 console.log(textStatus)
        //                 console.log(errorThrown)
        //             }
        //         });
        //     });
        // });

        

    });

});