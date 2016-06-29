(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilStepsMobile', cilStepsMobile);

  /** @ngInject */
  function cilStepsMobile() {
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        steps: '='
      },
      templateUrl: 'app/components/steps/steps-mobile.html',
      controller: StepsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function StepsController() {

    }
  }

})();
