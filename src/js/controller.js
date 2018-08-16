(function(window) {
  "use strict";

  function Controller(model, view) {
    var self = this;

    self.model = model;
    self.view = view;

    self.total = 0;
    self.pageSize = 2;
    self.pageIndex = 1;

    self.view.bind("submit", function(article) {
      self._submitItem(article);
    });

    self.view.bind("onPageSizeSelectChange", function(size) {
      self._changePageSize(size);
    });

    self.view.bind("onNextPage", function() {
      var newStart = self.pageIndex * self.pageSize;
      if (newStart > self.total - 1) return;

      ++self.pageIndex;
      self._updateHashSizeAndIndex();
    });

    self.view.bind("onPreviousPage", function() {
      if (self.pageIndex < 2) return;
      --self.pageIndex;
      self._updateHashSizeAndIndex();
    });

    self.view.bind("onArticleClick", function(id) {
      self._navigateToViewArticle(id);
    });
  }

  Controller.prototype._navigateToViewArticle = function(id) {
    this._changeLocation("#/article/" + id);
    this.view.render("setPage", 'article');
    this._getArticleAndSetView(id);
  };

  Controller.prototype._getArticleAndSetView = function(id) {
    var self = this;
    self.model.getAll(function(articles) {
      var article = articles.find(function(value) {
        return value.id == id;
      });
      if (article) {
        article.views++;
        // TODO: Save to database
        self.view.render("showArticle", article);
      } else {
        self.view.render("showArticleNotFound");
      }
    });
  };

  Controller.prototype._updateHashSizeAndIndex = function() {
    this._changeLocation("#/articles/" + this.pageSize + "/" + this.pageIndex);
    this._getArticlesAndSetView();
  };

  Controller.prototype._changePageSize = function(size) {
    this.pageSize = parseInt(size, 10);
    this.pageIndex = 1;
    this._updateHashSizeAndIndex();
  };

  Controller.prototype.setPage = function(locationHash) {
    var route = locationHash.split("/")[1];
    var page = route || "new-article";

    this.view.render("setPage", page);

    if (page === "articles") {
      var size = locationHash.split("/")[2];
      var index = locationHash.split("/")[3];
      if (!size || !index) {
        this._changeLocation(
          "#/articles/" + this.pageSize + "/" + this.pageIndex
        );
      } else {
        this.pageSize = parseInt(size, 10);
        this.pageIndex = parseInt(index, 10);
      }
      this._getArticlesAndSetView();
    } else if (page === "article") {
      var id = locationHash.split("/")[2];
      this._getArticleAndSetView(id);
    }
  };

  Controller.prototype._getArticlesAndSetView = function() {
    var self = this;
    self.model.getAll(function(articles) {
      self.total = articles.length;

      var start = (self.pageIndex - 1) * self.pageSize;
      var end = start + self.pageSize;

      var sortedArticles = articles.sort(function(a, b) {
        return a.id < b.id;
      });
      var slicedArticles = sortedArticles.slice(start, end);

      self.view.render("showArticles", slicedArticles);
      self.view.render("changeSizeAndIndex", {
        size: self.pageSize,
        index: self.pageIndex
      });
    });
  };

  Controller.prototype._submitItem = function(article) {
    var self = this;
    self.model.create(article, function(addedArticle) {
      self._changeLocation("#/articles");
      self.view.render("setPage", "articles");
      self._getArticleAndSetView();
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
