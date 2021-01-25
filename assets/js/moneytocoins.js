$(document).ready(function () {
    $("#addcoins").click(function (e) {
        console.log("works")
        var jsonData = {};
        $.ajaxSetup({
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });
        var username = localStorage.getItem("username")
        console.log(username);
        $.getJSON("http://localhost:8081/api/account/getaccountidbyusername/" + username, function (data) {
            $.each(data, function (i, v) {
                console.log(v)
                console.log(i)
                var enteredamount = document.getElementById("enteredamount").value
                jsonData["eurosSPent"] = enteredamount
                jsonData["purchasedCoins"] = enteredamount
                jsonData["accountId"] = v
                console.log(jsonData)
                console.log(jsonData)
                console.log(JSON.stringify(jsonData))
                $.ajax({
                    url: "http://localhost:8081/api/purchasehistory/new",
                    type: "POST",
                    dataType: "text",
                    contentType: "application/json; charset=UTF-8",
                    cache: false,
                    data: JSON.stringify(jsonData),
                    success: function (res) {
                        console.log(res)
                        alert("Your coins have been successfully added!")
                        window.location.href = "index.html";
        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR)
                        console.log(textStatus)
                        console.log(errorThrown)
                    }
                });
            });
        });

        

        e.preventDefault(); //STOP default action

    });

});