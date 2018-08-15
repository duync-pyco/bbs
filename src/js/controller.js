(function(window) {
  "use strict";

  function Controller(model, view) {
    var self = this;

    self.model = model;
    self.view = view;
  }

  Controller.prototype.setPage = function(locationHash) {
    var route = locationHash.split("/")[1];
    var page = route || "articles";

    this.view.render("setPage", page);
  };

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
