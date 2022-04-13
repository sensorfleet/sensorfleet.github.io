(function () {
  var $mainNav = $(".main-nav");

  window.addEventListener("load", function () {
    initDropdowns();
    initStickyNav();
  });

  window.addEventListener("scroll", function () {
    updateStickyNav();
  });

  $("#navbar-collapse").on("show.bs.collapse", function () {
    $mainNav.addClass("is-expanded");
  });

  $("#navbar-collapse").on("hidden.bs.collapse", function () {
    $mainNav.removeClass("is-expanded");
  });

  function initDropdowns() {
    if (window.location.pathname === "/") {
      return;
    }
    $mainNav.find(".dropdown-item").each(function (_index, element) {
      var $dropdown = $(element).closest(".dropdown-menu");
      var $element = $(element);

      if ($element.attr("href").match(window.location.pathname)) {
        $element.addClass("active");
        if ($(window).width() < 768) {
          $dropdown.addClass("show");
        }
      }
    });
  }

  function initStickyNav() {
    $mainNav.css({ transition: "none" });
    updateStickyNav();
    setTimeout(() => $mainNav.css({ transition: "" }));
  }

  function updateStickyNav() {
    $mainNav.toggleClass("is-sticky", window.pageYOffset >= 30);
  }
})();
