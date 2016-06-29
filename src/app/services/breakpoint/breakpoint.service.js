(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .service('cilBreakpointStore', cilBreakpointStore);

  /** @ngInject */
  function cilBreakpointStore($window, $timeout) {

    var $body = $window.document.getElementsByTagName('body')[0];

    return {
      getCurrentBreakpoint: getCurrentBreakpoint,
      getCurrentDimension: getCurrentDimension,
      breakPointChanged: breakPointChanged
    };

    function breakPointChanged(cb){

      function breakointChangeHandler(){
        $timeout(function(){
          cb(getCurrentBreakpoint(), getCurrentDimension());
        });
      }

      // init
      breakointChangeHandler();

      angular.element($window).bind('resize', breakointChangeHandler);
      angular.element($window).bind('blur', breakointChangeHandler);
      angular.element($window).bind('focus', breakointChangeHandler);
    }

    function getCurrentBreakpoint() {
      if ($window.matchMedia('(min-width: 769px)').matches) {
        return 'desktop';
      }
      if ($window.matchMedia('(max-width: 768px)').matches) {
        return 'mobile';
      }
    }

    function getCurrentDimension() {
      return {
        width: $body.clientWidth,
        height: $body.clientHeight
      };
    }

  }
})();
