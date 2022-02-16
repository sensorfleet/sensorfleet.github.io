window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  if (currentScrollPos < 30) {
    $(".navbar").css("background-color", "transparent");
  } else {
    $(".navbar").css("background-color", "#202529");
  }
};
