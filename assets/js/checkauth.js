var auth = localStorage.getItem("auth");
console.log(auth)
if (auth != "ready") {
    window.open("../404.html", "_self");
 }