(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Enable html5Mode
    $locationProvider.html5Mode(false);
  }

})();
