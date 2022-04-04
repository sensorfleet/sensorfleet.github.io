(function () {
  window.addEventListener("DOMContentLoaded", onLoad);

  function onLoad() {
    document.addEventListener("click", function (event) {
      if (event.target.closest("#menu-button")) {
        menu().classList.toggle("show");
      } else {
        menu().classList.remove("show");
      }
    });
  }

  function menu() {
    return document.querySelector("#menu");
  }
})();
