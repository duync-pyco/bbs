(function(window) {
  "use strict";

  function View() {
    this.pages = {
      articles: qs(".articles"),
      "new-article": qs(".new-article")
    };

    this.$articleForm = qs(".form-article");
    this.$formTitle = qs("#form-title");
    this.$formAuthor = qs("#form-author");
    this.$formEmail = qs("#form-email");
    this.$formContent = qs("#form-content");
    this.$articleList = qs(".list-article")
  }

  View.prototype.render = function(viewCommand, parameter) {
    var self = this;
    var viewCommands = {
      setPage: function() {
        Object.keys(self.pages).forEach(page => {
          self.pages[page].style.display =
            page === parameter ? "block" : "none";
        });
      },
      showArticles: function() {
        self.$articleList.innerHTML = JSON.stringify(parameter)
      }
    };

    viewCommands[viewCommand]();
  };

  View.prototype.bind = function(event, handler) {
    var self = this;

    if (event === "submit") {
      $on(
        self.$articleForm,
        "submit",
        function(event) {
          event.preventDefault();
          var article = self._getArticleAndClearForm();
          handler(article);
        },
        false
      );
    }
  };

  View.prototype._getArticleAndClearForm = function() {
    var self = this;

    var article = {
      title: self.$formTitle.value,
      author: self.$formAuthor.value,
      email: self.$formEmail.value,
      content: self.$formContent.value
    };

    self.$formTitle.value = "";
    self.$formAuthor.value = "";
    self.$formEmail.value = "";
    self.$formContent.value = "";

    return article;
  };

  window.app = window.app || {};
  window.app.View = View;
})(window);
