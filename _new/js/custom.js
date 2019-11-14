
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (currentScrollPos < 30) {
    $(".navbar").css("background-color", "transparent");
  }
  else {
    $(".navbar").css("background-color", "#202529");
  }
}
