(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilHeaderMobile', cilHeaderMobile);

  /** @ngInject */
  function cilHeaderMobile() {
    var directive = {
      restrict: 'E',
      scope: {

      },
      templateUrl: 'app/components/header/header-mobile.html',
      controller: HeaderMobileController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function HeaderMobileController(cilModal, $timeout, TimelineMax, Linear, $location) {
      var vm = this;
      vm.$location = $location;
      vm.signup = signup;
      vm.menuIsCollapsed = true;
      vm.toggleMenu = toggleMenu;

      var collapsenimation = new TimelineMax();

      function toggleMenu() {
        $timeout(function () {
          vm.menuIsCollapsed = !vm.menuIsCollapsed;
          if(vm.menuIsCollapsed){
            collapsenimation.set('.header__menu--mobile ul', {display: 'none'})
              .to('.header__menu--mobile div', 0.3, {height: '0', ease: Linear.easeNone})
              .set('.header__menu--mobile', {display: 'none'});
          }else{
            collapsenimation.set('.header__menu--mobile', {display: 'block'})
              .to('.header__menu--mobile div', 0.3, {height: '58%', ease: Linear.easeNone})
              .set('.header__menu--mobile ul', {display: 'block'});
          }
        });
      }

      function signup() {
        cilModal.openSignup();
      }
    }
  }

})();
