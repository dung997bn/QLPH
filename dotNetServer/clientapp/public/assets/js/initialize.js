document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems, null);

  var elems = document.querySelectorAll(".carousel");
  M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true,
  });

  var elemsModal = document.querySelectorAll(".modal");
  M.Modal.init(elemsModal, {
    dismissible: false,
    preventScrolling: true,
  });

  var elemsTabs = document.querySelectorAll(".tabs");
  M.Tabs.init(elemsTabs, {
    swipeable: true,
    index: 0,
  });

  var elems = document.querySelectorAll("select");
  M.FormSelect.init(elems, null);
});
