(function(window) {
  "use strict";

  function View() {
    this.pages = {
      articles: qs(".articles"),
      "new-article": qs(".new-article")
    };
  }

  View.prototype.render = function(viewCommand, parameter) {
    var self = this;
    var viewCommands = {
      setPage: function() {
        Object.keys(self.pages).forEach(page => {
          self.pages[page].style.display =
            page === parameter ? "block" : "none";
        });
      }
    };

    viewCommands[viewCommand]();
  };

  window.app = window.app || {};
  window.app.View = View;
})(window);
