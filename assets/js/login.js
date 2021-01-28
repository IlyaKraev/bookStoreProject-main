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

        $.ajax({
            url: "http://ra1.anystream.eu:1090/bookstore/login",
            type: "POST",
            dataType: "text",
            contentType: "application/json; charset=UTF-8",
            cache: false,
            data: JSON.stringify(jsonData),
            success: function (res) {
                console.log(res)
                localStorage.setItem("token", res)
                setTimeout(function () { 
                    swal({
                      title: "Welcome!",
                      text: "You have successfully logged in press ok to continue!",
                      type: "success",
                      confirmButtonText: "OK"
                    },
                    function(isConfirm){
                      if (isConfirm) {
                        window.location.href = "index.html";
                      }
                    }); }, 1000);
                var base64Url = res.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var roleCheck = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                console.log(roleCheck)
                if (roleCheck.includes("ROLE_ADMIN")) {
                    localStorage.setItem("auth", "ready")
                    console.log("works auth ready!")
                } else if (roleCheck.includes("ROLE_USER")) {
                    localStorage.setItem("auth", "client")
                    console.log("works auth client!")
                }

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
                        window.location.href = "login.html";
                      }
                    }); }, 1000);
                console.log(jqXHR)
                console.log(textStatus)
                console.log(errorThrown)
            }
        });

        e.preventDefault(); //STOP default action

    });

});