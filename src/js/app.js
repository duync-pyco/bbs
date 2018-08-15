(function() {
  "use strict";

  function BBS() {
    this.view = new app.View();
    this.controller = new app.Controller(this.view);
  }

  var bbs = new BBS();

  function setPage() {
    bbs.controller.setPage(document.location.hash);
  }

  $on(window, "load", setPage);
  $on(window, "hashchange", setPage);
})();
