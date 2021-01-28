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
        var username = document.getElementById("username").value
        var psw = document.getElementById("txtpassword").value
        var pswconfirm = document.getElementById("txtConfirmPassword").value

        var guesttoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJbUk9MRV9VU0VSXHJcbl0iLCJleHAiOjE2MTIyMDIyMjJ9.clBy4JZW1yZTWehWQULxx3go8PnkDQxfvWFr9jR4SW4-aK8SLB0CnB6Dx9bsyLHPQN26i0GhoNsJxH-A4YaEQg"

        if (psw === pswconfirm) {
            $.ajax({
                url: "http://ra1.anystream.eu:1090/bookstore/api/account/new",
                headers: { "Authorization": "Bearer " + guesttoken },
                type: "POST",
                dataType: "text",
                contentType: "application/json; charset=UTF-8",
                cache: false,
                data: JSON.stringify(jsonData),
                success: function (res) {
                  console.log(res)
                  setTimeout(function () { 
                    swal({
                      title: "Welcome!",
                      text: "You have successfully registered! Press ok to log in!",
                      type: "success",
                      confirmButtonText: "OK"
                    },
                    function(isConfirm){
                      if (isConfirm) {
                        window.location.href = "login.html";
                      }
                    }); }, 1000);
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
        } else {
            alert("Please insert the correct confirm password!")
        }
        e.preventDefault(); //STOP default action
    });
});

