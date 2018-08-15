(function(window) {
  "use strict";

  function Controller(model, view) {
    var self = this;

    self.model = model;
    self.view = view;

    self.view.bind("submit", function(article) {
      self._submitItem(article);
    });
  }

  Controller.prototype.setPage = function(locationHash) {
    var route = locationHash.split("/")[1];
    var page = route || "articles";

    this.view.render("setPage", page);

    if (page === "articles") {
      this._getArticleAndSetView()
    }
  };

  Controller.prototype._getArticleAndSetView = function() {
    var self = this;
    self.model.getAll(function(articles) {
      self.view.render("showArticles", articles)
    });
  }

  Controller.prototype._submitItem = function(article) {
    var self = this;
    self.model.create(article, function(addedArticle) {
      self._changeLocation("#/articles");
      self.view.render("setPage", "articles");
    });
  };

  Controller.prototype._changeLocation = function(location) {
    if (history.pushState) {
      history.pushState(null, null, location);
    } else {
      location.hash = location;
    }
  };

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
