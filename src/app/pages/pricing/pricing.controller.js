(function () {
  'use strict';

  angular
    .module('cil01Frontend')
    .controller('PricingController', PricingController);

  /** @ngInject */
  function PricingController($timeout, $rootScope, $window, ScrollMagic, cilBreakpointStore, cilApiService, initData, _) {
    var vm = this;
    vm.isMonthPlan = true;
    vm.inputFocused = false;
    vm.placeholder = 'Email';
    vm.isCollapsed = true;
    vm.submitSignup = submitSignup;

    vm.initData = initData;
    vm.basic = vm.initData.basic[0];
    vm.faqs = _.sortBy(vm.initData.faq, ['fields.id'], ['asc']);
    vm.importantFaqs = getImportantFaq(2);

    vm.features = [
      'Website ordering',
      'Mobile ordering',
      'Order management',
      'Branded webstore',
      'Reporting',
      'Customer support',
      'Menu management',
      'Paypal / Cash payment',
      'Takeout / Delivery option'
    ];

    vm.bpChangeCallback = bpChangeCallback;

    function bpChangeCallback(bp) {
      vm.isMobile = bp === 'mobile';
    }

    cilBreakpointStore.breakPointChanged(vm.bpChangeCallback);

    function getImportantFaq(num) {
      var res = [];
      for (var i = 0; i < num; i++) {
        res.push(vm.faqs.shift());
      }
      return res;
    }

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
      if (!validateEmail($email.value)) {
        $timeout(function () {
          vm.emailErr = true;
        });
      }
    });

    // init controller
    var controller = new ScrollMagic.Controller();

    $timeout(function () {
      if(vm.isMobile){
        new ScrollMagic.Scene({
          triggerElement: ".pricing__options",
          triggerHook: "onLeave",
          duration: 1154,
          offset: -80
        }).setPin(".pricing__options", {pushFollowers: false})
          .setTween(".pricing__tooltip", 0.1, {visibility: "hidden"})
          // .addIndicators()
          .addTo(controller);
      }
    });

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function submitSignup() {
      if (validateEmail($email.value)) {
        $timeout(function () {
          vm.emailErr = false;

          cilApiService.signup({email: $email.value}).then(function success(){
            $rootScope.$broadcast('notify/signup/success');
          });

        });
      } else {
        $timeout(function () {
          vm.emailErr = true;
        });
      }
    }

  }
})();
