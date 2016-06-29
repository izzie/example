(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .service('_', lodashController);

  /** @ngInject */
  function lodashController($window) {
    return $window._;
  }
})();
