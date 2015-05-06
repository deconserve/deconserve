window.addEventListener('load', function(e) {
  'use strict';

  var article = document.querySelector('main > article');

  // Get the hash from url
  function getPageFromUrl(e) {
    var href = e.detail ? e.detail.target.href : document.location.href;
    var pos = href.indexOf('#');
    var page = pos >= 0 ? href.substr(pos + 1) : '';
    return page;
  }

  // Refresh the content from the url hash.
  function updateArticleContentFromUrl(e) {
    var pageName = getPageFromUrl(e);
    if(pageName) {
      article.attributes['data-anywhere'].value = pageName;
      article.update();
    }
    debugger;
  }

  // When body has `update` event trigger,
  document.querySelector('body').addEventListener('update', updateArticleContentFromUrl);

  // When DOM is ready (here), attempt to load content from url hash.
  updateArticleContentFromUrl(e);

  document.querySelector('header nav').addEventListener('update', function(e) {
    [].map.call(document.querySelectorAll('header nav a'), function(a) {
      a.addEventListener('click', function(e) {
        document.querySelector('body').dispatchEvent(new CustomEvent('update', {
          'detail': {'target': a}
        }));
      });
    });
  });

});
