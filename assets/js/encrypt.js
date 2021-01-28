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
        case 10:
          return "https://www.dropbox.com/s/h9nnoev7ff6p8yg/The%20Hobbit%20%28illustrated%20by%20Alan%20Lee%29%20by%20Tolkien%20J.R.R.%20%28z-lib.org%29.epub?dl=0"
          break;
        case 46:
          return "https://www.dropbox.com/s/5rgi7zsj1sm8dqv/Listen%2C%20Little%20Man%20%28Noonday%2C%20271%29%20by%20Wilhelm%20Reich%20%28z-lib.org%29.pdf?dl=0"
          break;
        case 47:
          return "https://www.dropbox.com/s/7oum8bmug2foy8t/Atlas%20Shrugged%20by%20Ayn%20Rand%20%28z-lib.org%29.epub?dl=0"
        default:
          return "404.html"
      }
    }
  };
}());
