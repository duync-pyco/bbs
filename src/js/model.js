(function(window) {
  "use strict";

  function Model(name) {
    this._dbName = name;

    if (!localStorage.getItem(name)) {
      localStorage.setItem(name, JSON.stringify([]));
    }
  }

  Model.prototype.getAll = function(callback) {
    var items = localStorage.getItem(this._dbName);

    callback = callback || function() {};
    callback(JSON.parse(items));
  };

  Model.prototype.create = function(item) {
    var items = JSON.parse(localStorage.getItem(this._dbName));

    item.id = new Date().getTime();
    items.push(item);
    localStorage.setItem(this._dbName, JSON.stringify(items));
  };

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
