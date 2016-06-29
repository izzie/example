(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilSignup', cilSignup);

  /** @ngInject */
  function cilSignup() {
    var directive = {
      restrict: 'A',
      scope: {

      },
      templateUrl: 'app/components/signup/signup.html',
      controller: SignupController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SignupController(cilModal, $timeout, $window, $rootScope, cilApiService) {
      var vm = this;
      vm.inputFocused = false;
      vm.placeholder = 'Email';
      vm.emailErr = false;
      vm.closeSignup = closeSignup;
      vm.submitSignup = submitSignup;
      vm.signUpDescription = $rootScope.signUpDescription;

      var $email = angular.element($window.document.getElementsByName('email'))[0];

      $email.addEventListener('focusin', function () {
        $timeout(function () {
          vm.inputFocused = true;
          vm.placeholder = '';
          vm.emailErr = false;
        });
      });

      $email.addEventListener('focusout', function () {
        //validate email
        if(!validateEmail($email.value)){
          $timeout(function () {
            vm.emailErr = true;
          });
        }
      });

      function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

      function submitSignup() {
        if(validateEmail($email.value)){
          $timeout(function () {
            vm.emailErr = false;
            cilApiService.signup({email: $email.value}).then(function success(){
              closeSignup();
              $rootScope.$broadcast('notify/signup/success');
            });
          });
        }else{
          $timeout(function () {
            vm.emailErr = true;
          });
        }
      }

      function closeSignup() {
        cilModal.closeModal('signup');
      }

    }
  }

})();
