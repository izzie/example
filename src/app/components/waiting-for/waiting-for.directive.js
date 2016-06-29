(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilWaitingFor', cilWaitingFor);

  /** @ngInject */
  function cilWaitingFor() {
    var directive = {
      restrict: 'E',
      scope: {
        title: '@',
        btn: '@'
      },
      templateUrl: 'app/components/waiting-for/waiting-for.html',
      controller: WaitingForController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function WaitingForController(cilModal) {
      var vm = this;
      vm.signup = signup;

      function signup() {
        cilModal.openSignup();
      }

    }
  }

})();
