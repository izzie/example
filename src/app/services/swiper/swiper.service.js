(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .service('Swiper', swiperController);

  /** @ngInject */
  function swiperController($window) {
    return $window.Swiper;
  }
})();
