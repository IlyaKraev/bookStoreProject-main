$(document).ready(function () {
    $("#formregister").submit(function (e) {
        var jsonData = {};
        var formData = $("#formregister").serializeArray();
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
        console.log(jsonData)
        var username = document.getElementById("username").value
        var psw = document.getElementById("txtpassword").value
        var pswconfirm = document.getElementById("txtConfirmPassword").value

        var guesttoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJbUk9MRV9VU0VSXHJcbl0iLCJleHAiOjE2MTIyMDIyMjJ9.clBy4JZW1yZTWehWQULxx3go8PnkDQxfvWFr9jR4SW4-aK8SLB0CnB6Dx9bsyLHPQN26i0GhoNsJxH-A4YaEQg"



        console.log(jsonData)
        console.log(psw + " " + pswconfirm)
        if (psw === pswconfirm) {
            $.ajax({
                url: "http://localhost:8081/api/account/new",
                headers: { "Authorization": "Bearer " + guesttoken },
                type: "POST",
                dataType: "text",
                contentType: "application/json; charset=UTF-8",
                cache: false,
                data: JSON.stringify(jsonData),
                success: function (res) {
                    console.log(res)
                    alert("Welcome " + username + " you have successfully registered ");
                    window.location.href = "index.html";
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("error")
                    console.log(jqXHR)
                    console.log(textStatus)
                    console.log(errorThrown)
                }
            });
        } else {
            alert("Please insert the correct confirm password!")
        }
        e.preventDefault(); //STOP default action

    });

});

