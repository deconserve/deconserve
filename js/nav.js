(function() {
  'use strict';
  window.addEventListener('load', function(e) {
    // Hamburger nav.
    var nav = document.querySelector('header > nav');
    var button = document.createElement('button');
    nav.classList.add('collapsed')
    nav.classList.add('init');
    var parent = nav.parentElement;
    parent.insertBefore(button, nav);
    button.addEventListener('click', function(e) {
      nav.classList.toggle('collapsed');
      nav.classList.remove('init');
    });

    // Click on nav item folds the nav.
    nav.addEventListener('update', function(e) {
      [].map.call(nav.querySelectorAll('a'), function(a) {
        a.addEventListener('click', function(e) {
          nav.classList.add('collapsed');
        });
      });
    });
  });
})();
