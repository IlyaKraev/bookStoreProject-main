var client = localStorage.getItem("auth");
if (client === null) {
    pleaseLogin();
} else if (client === "client") {
    console.log("Welcome user!")
} else if (client === "ready") {
    console.log("Welcome admin!")
}

function pleaseLogin(){
        window.open("login.html", "_self");
}


