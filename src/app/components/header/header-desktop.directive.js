(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilHeaderDesktop', cilHeaderDesktop);

  /** @ngInject */
  function cilHeaderDesktop() {
    var directive = {
      restrict: 'E',
      scope: {
        noBg: '='
      },
      templateUrl: 'app/components/header/header-desktop.html',
      controller: HeaderDesktopController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function HeaderDesktopController(cilModal, cilApiService, $location) {
      var vm = this;
      vm.$location = $location;
      vm.signup = signup;
      vm.login = cilApiService.login();
      
      function signup() {
        cilModal.openSignup();
      }
    }
  }

})();
