(function(window) {
  "use strict";

  function Model(name) {
    this._dbName = name;

    if (!localStorage.getItem(name)) {
      localStorage.setItem(name, JSON.stringify(data));
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
    article.updatedAt = new Date().toString();
    article.views = 0;
    articles.push(article);

    localStorage.setItem(this._dbName, JSON.stringify(articles));

    callback = callback || function() {};
    callback(article);
  };

  Model.prototype.update = function(article, callback) {
    var articles = JSON.parse(localStorage.getItem(this._dbName));
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].id === article.id) {
        for (var key in article) {
          articles[i][key] = article[key];
        }
        break;
      }
    }
    localStorage.setItem(this._dbName, JSON.stringify(articles));

    callback = callback || function() {};
    callback(article);
  };

  window.app = window.app || {};
  window.app.Model = Model;
})(window);

var data = [
  {
    title: "Lorem Ipsum 01",
    author: "Duy Nguyen",
    email: "duy.nguyencong@pycogroup.com",
    content:
      "Integer at sapien finibus risus auctor condimentum vitae in lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean nec leo vitae dui hendrerit hendrerit. Phasellus fringilla elit libero, vel euismod purus luctus varius. Sed condimentum vel ipsum sed ultricies. Phasellus nunc ex, venenatis quis fringilla vitae, feugiat fermentum est. Cras feugiat purus eget erat pulvinar, ac auctor diam ullamcorper. Etiam sed mauris pretium, maximus tellus vitae, aliquet leo.",
    id: 1534391403647,
    updatedAt: "Wed Aug 15 2018 19:49:35 GMT+0700 (Indochina Time)",
    views: 2
  },
  {
    title: "Lorem Ipsum 02",
    author: "Duy Nguyen",
    email: "duy.nguyencong@pycogroup.com",
    content:
      "Integer at sapien finibus risus auctor condimentum vitae in lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean nec leo vitae dui hendrerit hendrerit. Phasellus fringilla elit libero, vel euismod purus luctus varius. Sed condimentum vel ipsum sed ultricies. Phasellus nunc ex, venenatis quis fringilla vitae, feugiat fermentum est. Cras feugiat purus eget erat pulvinar, ac auctor diam ullamcorper. Etiam sed mauris pretium, maximus tellus vitae, aliquet leo.",
    id: 1534391403649,
    updatedAt: "Wed Aug 15 2018 19:49:35 GMT+0700 (Indochina Time)",
    views: 7
  },
  {
    title: "Lorem Ipsum 03",
    author: "Duy Nguyen",
    email: "duy.nguyencong@pycogroup.com",
    content:
      "Integer at sapien finibus risus auctor condimentum vitae in lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean nec leo vitae dui hendrerit hendrerit. Phasellus fringilla elit libero, vel euismod purus luctus varius. Sed condimentum vel ipsum sed ultricies. Phasellus nunc ex, venenatis quis fringilla vitae, feugiat fermentum est. Cras feugiat purus eget erat pulvinar, ac auctor diam ullamcorper. Etiam sed mauris pretium, maximus tellus vitae, aliquet leo.",
    id: 1534391403655,
    updatedAt: "Wed Aug 15 2018 19:49:35 GMT+0700 (Indochina Time)",
    views: 2
  },
  {
    title: "Lorem Ipsum 04",
    author: "Duy Nguyen",
    email: "duy.nguyencong@pycogroup.com",
    content:
      "Integer at sapien finibus risus auctor condimentum vitae in lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean nec leo vitae dui hendrerit hendrerit. Phasellus fringilla elit libero, vel euismod purus luctus varius. Sed condimentum vel ipsum sed ultricies. Phasellus nunc ex, venenatis quis fringilla vitae, feugiat fermentum est. Cras feugiat purus eget erat pulvinar, ac auctor diam ullamcorper. Etiam sed mauris pretium, maximus tellus vitae, aliquet leo.",
    id: 1534391403678,
    updatedAt: "Wed Aug 15 2018 19:49:35 GMT+0700 (Indochina Time)",
    views: 1
  }
];
