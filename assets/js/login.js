$(document).ready(function () {
    $("#loginBtn").click(function (e) {
        console.log("works")
        var jsonData = {};
        var formData = $("#userForm").serializeArray();

        $.each(formData, function () {
            if (jsonData[this.name]) {
                if (!jsonData[this.name].push) {
                    jsonData[this.name] = [jsonData[this.name]];
                }

                jsonData[this.name].push(this.value);
            } else {
                jsonData[this.name] = this.value;
            }

        });
        var username = document.getElementById("username").value

        console.log(jsonData)
        console.log(JSON.stringify(jsonData))
        $.ajax({
            url: "http://localhost:8081/login",
            type: "POST",
            dataType: "text",
            contentType: "application/json; charset=UTF-8",
            cache: false,
            data: JSON.stringify(jsonData),
            success: function (res) {

                console.log(res)
                localStorage.setItem("token", res)
                localStorage.setItem("username", username)
                alert("Welcome " + username + " you have successfully logged in press ok to continue ");
                if (username === "admin") { localStorage.setItem("auth", "ready") }
                window.location.href = "index.html";

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error")
                console.log(jqXHR)
                console.log(textStatus)
                console.log(errorThrown)
            }
        });

        e.preventDefault(); //STOP default action

    });

});