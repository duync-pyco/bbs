(function(window) {
  "use strict";

  function Model(name) {
    this._dbName = name;

    if (!localStorage.getItem(name)) {
      localStorage.setItem(name, JSON.stringify([]));
    }
  }

  Model.prototype.getAll = function(callback) {
    var articles = localStorage.getItem(this._dbName);

    callback = callback || function() {};
    callback(JSON.parse(articles));
  };

  Model.prototype.create = function(article, callback) {
    var articles = JSON.parse(localStorage.getItem(this._dbName));

    article.id = new Date().getTime();
    articles.push(article);
    localStorage.setItem(this._dbName, JSON.stringify(articles));

    callback = callback || function() {};
    callback(article)
  };

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
