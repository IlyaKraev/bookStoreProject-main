$(document).ready(function () {

    var token = localStorage.getItem("token")
    const options = {
        type: "GET",
        headers: { "Authorization": "Bearer " + token },
        contentType: "application/json"
    }


    var booktobuy = localStorage.getItem("book");
    
    var username = localStorage.getItem("username");

        
    if ($('body').is('.checkoutpage')) {
        window.addEventListener('load', async function () {
            const book = await fetch('http://localhost:8081/api/book/getbyid/'+booktobuy, {
                type: "GET",
                contentType: "application/json"
        })
        const asd = await book.json();
        
        FormDataJson.setInputValue(document.querySelector("#bookId"),  asd.book.bookId);
        FormDataJson.setInputValue(document.querySelector("#originalPrice"), asd.book.pricing.startingPrice);
        FormDataJson.setInputValue(document.querySelector("#discountRate"),  asd.book.pricing.discount);
        FormDataJson.setInputValue(document.querySelector("#totalCoins"), asd.book.pricing.startingPrice - asd.book.pricing.discount);
        FormDataJson.setInputValue(document.querySelector("#totalPrice"), asd.book.pricing.startingPrice - asd.book.pricing.discount);
        
        $('#title').text(asd.book.title);
        $('#pricing').prepend("Cost: "+asd.book.pricing.startingPrice);
        $('#rating').append(asd.book.rating+"/5");
        $('#price').prepend(asd.book.pricing.startingPrice);
        $('#discount').prepend(asd.book.pricing.discount);
        $('#totalcost').prepend(asd.book.pricing.startingPrice - asd.book.pricing.discount);
        $('#productimg').attr('src', "assets/img/books/book-" + asd.book.bookId + ".jpg");
    }, false);
    
};

    $("#payment").click( async function (e) {
        e.preventDefault(); //STOP default action
        
        const user = await fetch('http://localhost:8081/api/account/getaccountidbyusername/' + username, options);
        const userId = await user.json();
        
        FormDataJson.setInputValue(document.querySelector("#accountId"), userId.accountId);
        
        
        let jsonData = FormDataJson.formToJson(document.querySelector("#checkoutform"));
        $.ajax({
            url: "http://localhost:8081/api/order/new",
            type: "POST",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            cors: true,
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: async function () {
                alert("Order successfully added!");
                const order = await fetch('http://localhost:8081/api/order/getbyaccountid/'+userId.accountId, {
                    type: "GET",
                    headers: { "Authorization": "Bearer " + token },
                    contentType: "application/json"
                })
                const thisorder = await order.json();
                let last = thisorder.orders.pop();
                FormDataJson.setInputValue(document.querySelector("#orderId"), last.orderId);

                let data = FormDataJson.formToJson(document.querySelector("#orderdetails"));
                alert("Sending order...")
                $.ajax({
                    url: "http://localhost:8081/api/orderdetails/new",
                    type: "POST",
                    contentType: "application/json",
                    headers: { "Authorization": "Bearer " + token },
                    cors: true,
                    dataType: "json",
                    data: JSON.stringify(data),
                    success: function () {
                        alert("Order details successfully added!");
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) { }
                });


                
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });

    });



    if ($('body').is('.buytokens')) {
        var value;

        document.getElementById("v10").addEventListener("click", function() {
            value = 10;
          });
        document.getElementById("v20").addEventListener("click", function() {
            value = 20;
          });
        document.getElementById("v50").addEventListener("click", function() {
            value = 50;
          });
        document.getElementById("v100").addEventListener("click", function() {
            value = 100;
          });
        document.getElementById("v200").addEventListener("click", function() {
            value = 200;
          });
        document.getElementById("v500").addEventListener("click", function() {
            value = 500;
          });

          $("#begintransaction").click(function (e) {
            if(value!=null){
                localStorage.setItem("quantity", value);
                window.location.href = "transaction.html";
            } else {
                alert("Please select an option!");
            }


        });
    };

});