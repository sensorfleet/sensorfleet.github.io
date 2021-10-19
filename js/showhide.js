function showHide(shID) {
  if (document.getElementById(shID)) {
    if (document.getElementById(shID + "-show").style.display != "none") {
      document.getElementById(shID + "-show").style.display = "none";
      document
        .getElementById(shID)
        .classList.replace("more-hidden", "more-visible");
    } else {
      document.getElementById(shID + "-show").style.display = "inline";
      document
        .getElementById(shID)
        .classList.replace("more-visible", "more-hidden");
    }
  }
}
