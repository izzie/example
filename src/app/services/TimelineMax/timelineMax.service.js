(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .service('TimelineMax', timelineMaxController);

  /** @ngInject */
  function timelineMaxController($window) {
    return $window.TimelineMax;
  }

  angular
    .module('cil01Frontend')
    .service('TweenMax', tweenMaxController);

  /** @ngInject */
  function tweenMaxController($window) {
    return $window.TweenMax;
  }

  angular
    .module('cil01Frontend')
    .service('Linear', linearController);

  /** @ngInject */
  function linearController($window) {
    return $window.Linear;
  }

  angular
    .module('cil01Frontend')
    .service('Power2', power2rController);

  /** @ngInject */
  function power2rController($window) {
    return $window.Power2;
  }

})();
