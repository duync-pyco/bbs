(function(window) {
  "use strict";

  var htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var escapeHtmlChar = function(chr) {
    return htmlEscapes[chr];
  };

  var reUnescapedHtml = /[&<>"'`]/g;
  var reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

  var escape = function(string) {
    return string && reHasUnescapedHtml.test(string)
      ? string.replace(reUnescapedHtml, escapeHtmlChar)
      : string;
  };

  function Template() {
    this.defaultTemplate =
      '<li class="item-article" data-id={{id}}>' +
      "<h2>{{title}}</h2>" +
      "<p>Posted by {{author}} - {{email}}</p>" +
      "<p>Updated at: {{updatedAt}} - Views: {{views}}</p>" +
      "<p>{{content}}</p>" +
      "</li>";
  }

  Template.prototype.showArticles = function(articles) {
    var i, l;
    var view = "";

    for (i = 0, l = articles.length; i < l; i++) {
      var template = this.defaultTemplate;

      template = template.replace("{{id}}", articles[i].id);
      template = template.replace("{{title}}", escape(articles[i].title));
      template = template.replace("{{author}}", escape(articles[i].author));
      template = template.replace("{{email}}", escape(articles[i].email));
      template = template.replace(
        "{{updatedAt}}",
        escape(articles[i].updatedAt)
      );
      template = template.replace("{{views}}", articles[i].views);
      template = template.replace("{{content}}", escape(articles[i].content));

      view = view + template;
    }

    return view;
  };

  window.app = window.app || {};
  window.app.Template = Template;
})(window);
