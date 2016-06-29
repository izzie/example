(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilStepsDesktop', cilStepsDesktop);

  /** @ngInject */
  function cilStepsDesktop() {
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        steps: '='
      },
      templateUrl: 'app/components/steps/steps-desktop.html',
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
