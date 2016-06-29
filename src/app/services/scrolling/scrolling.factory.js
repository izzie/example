(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .factory('cilScrolling', cilScrollingService);

  /** @ngInject */
  function cilScrollingService($window) {

    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || $window.event;
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }

    function enable() {
      if ($window.removeEventListener)
        $window.removeEventListener('DOMMouseScroll', preventDefault, false);
      $window.onmousewheel = $window.document.onmousewheel = null;
      $window.onwheel = null;
      $window.ontouchmove = null;
      $window.document.onkeydown = null;
    }

    function disable() {
      if ($window.addEventListener) // older FF
        $window.addEventListener('DOMMouseScroll', preventDefault, false);
      $window.onwheel = preventDefault; // modern standard
      $window.onmousewheel = $window.document.onmousewheel = preventDefault; // older browsers, IE
      $window.ontouchmove  = preventDefault; // mobile
      $window.document.onkeydown  = preventDefaultForScrollKeys;
    }

    return {
      enable: enable,
      disable: disable
    };

  }
})();
