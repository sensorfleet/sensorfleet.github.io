(function () {
  window.addEventListener("DOMContentLoaded", onLoad);

  function onLoad() {
    document.addEventListener("click", function (event) {
      if (event.target.closest("#use-cases-button")) {
        useCasesMenu().classList.toggle("show");
      } else {
        useCasesMenu().classList.remove("show");
      }
    });
  }

  function useCasesMenu() {
    return document.querySelector("#use-cases-menu");
  }
})();
