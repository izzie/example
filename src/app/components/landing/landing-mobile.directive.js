(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilLandingMobile', cilLandingMobile);

  /** @ngInject */
  function cilLandingMobile() {
    var directive = {
      restrict: 'E',
      scope: {
        landing: '='
      },
      templateUrl: 'app/components/landing/landing-mobile.html',
      controller: LandingMobileController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function LandingMobileController($timeout, $window, ScrollMagic, cilModal) {
      var vm = this;
      vm.signup = signup;

      function signup() {
        cilModal.openSignup();
      }

      // Returns a random integer between min (included) and max (included)
      // Using Math.round() will give you a non-uniform distribution!
      function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // Random landing Background
      // angular.element($window.document.getElementsByClassName('random-bg')).addClass('random-bg' + getRandomIntInclusive(1, 5));
      var randomId = getRandomIntInclusive(0, 4);
      vm.randomBg = vm.landing.landingBackgrounds[randomId].fields.file.url;

      // init controller
      var controller = new ScrollMagic.Controller();

      // build scene
      $timeout(function () {
        new ScrollMagic.Scene({
          triggerElement: '.homepage--mobile',
          triggerHook: "onLeave",
          duration: '38%'
        }).setPin('.description-container', {pushFollowers: false})
          // .addIndicators()
          .addTo(controller);
      }, 1000);

    }
  }

})();
