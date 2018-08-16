(function(window) {
  "use strict";

  function View(template) {
    this.template = template;
    this.pages = {
      articles: qs(".articles"),
      "new-article": qs(".new-article"),
      article: qs(".article")
    };

    this.$articleForm = qs(".form-article");
    this.$formTitle = qs("#form-title");
    this.$formAuthor = qs("#form-author");
    this.$formEmail = qs("#form-email");
    this.$formContent = qs("#form-content");
    this.$articleList = qs(".list-article");
    this.$pageSizeSelect = qs(".select-page-size");
    this.$backButton = qs(".button-back");
    this.$nextButton = qs(".button-next");
    this.$pageIndexSpan = qs(".span-page-index");
    this.$articleBody = qs(".article-body");
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
        self.$articleList.innerHTML = self.template.showArticles(parameter);
      },
      changeSizeAndIndex: function() {
        var opts = self.$pageSizeSelect;
        for (var i = 0; i < opts.length; ++i) {
          if (opts[i].value == parameter.size) {
            break;
          }
        }
        self.$pageSizeSelect.selectedIndex = i;

        self.$pageIndexSpan.innerHTML = "Page " + parameter.index;
      },
      showArticle: function() {
        self.$articleBody.innerHTML = self.template.showArticle(parameter);
      },
      showArticleNotFound: function() {
        self.$articleBody.innerHTML = undefined;
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
    } else if (event === "onPageSizeSelectChange") {
      $on(self.$pageSizeSelect, "change", function(event) {
        event.preventDefault();
        handler(self.$pageSizeSelect.value);
      });
    } else if (event === "onNextPage") {
      $on(self.$nextButton, "click", function(event) {
        event.preventDefault();
        handler();
      });
    } else if (event === "onPreviousPage") {
      $on(self.$backButton, "click", function(event) {
        event.preventDefault();
        handler();
      });
    } else if (event === "onArticleClick") {
      $delegate(self.$articleList, 'li h2', 'click', function () {
        handler(self._itemId(this))
      });
    }
  };

  View.prototype._itemId = function (element) {
    var li = $parent(element, 'li');
		return parseInt(li.dataset.id, 10);
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
