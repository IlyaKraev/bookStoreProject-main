var ENCRYPTION = ENCRYPTION || (function () {
    var bookId = '';
    return {
        init: function (BOOKID) {
            bookId = BOOKID;
            console.log(BOOKID)
        },
        Download: function () {
            switch (bookId) {
                case 1:
                    return "asdf.html"
                  break;
                case 2:
                    return "asdf.html"
                  break;
                case 3:
                    return "asdf.html"
                  break;
                case 4:
                    return "asdf.html"
                  break;
                case 5:
                    return "asdf.html"
                  break;
                case 6:
                    return "asdf.html"
                  break;
                case 7:
                    return "asdf.html"
                  break;
                case 8:
                    return "asdf.html"
                  break;
                case 10:
                    return "https://www.dropbox.com/s/h9nnoev7ff6p8yg/The%20Hobbit%20%28illustrated%20by%20Alan%20Lee%29%20by%20Tolkien%20J.R.R.%20%28z-lib.org%29.epub?dl=0"
                default:
                    return "404.html"
              }                      
        }
    };
}());
