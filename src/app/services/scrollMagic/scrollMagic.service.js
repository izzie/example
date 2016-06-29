(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .service('ScrollMagic', scrollMagicController);

  /** @ngInject */
  function scrollMagicController($window) {
    return $window.ScrollMagic;
  }
})();
