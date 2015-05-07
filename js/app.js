(function(){
  'use strict';

  var ContentManager = {
    init: function(e) {
      // When body has `update` event trigger,
      document.querySelector('body').addEventListener('update', this.updateArticleContentFromUrl);
      // When DOM is ready (here), attempt to load content from url hash.
      this.updateArticleContentFromUrl(e);


      // When an article is loaded from Github, listen to clicks and dispatch `body.update`
      [].map.call(document.querySelectorAll('[data-anywhere]'), function(container) {
        container.addEventListener('update', function(e) {
          [].map.call(e.target.querySelectorAll('a'), function(a) {
            a.addEventListener('click', function(e) {
              document.querySelector('body').dispatchEvent(
                new CustomEvent('update', {'detail': {'target': a}}
              ));
          });
        });
      });
    });
    },

    getArticle: function() {
      if(!this._article) {
        this._article = document.querySelector('main > article');
      }
      return this._article;
    },

    getPageFromUrl: function(e) {
      var href = e && e.detail ? e.detail.target.href : document.location.href;
      var pos = href.indexOf('#');
      var page = pos >= 0 ? href.substr(pos + 1) : '';
      return page;
    },

    // Refresh the content from the url hash.
    updateArticleContentFromUrl: function(e) {
      // `this` is the dom listener, not the ContentManager.
      var pageName = ContentManager.getPageFromUrl(e);
      var article = ContentManager.getArticle();
      if(pageName) {
        article.attributes['data-anywhere'].value = pageName;
        article.update();
      }
    },
  };


  window.addEventListener('load', function(e) {
    ContentManager.init();
  });
})();
