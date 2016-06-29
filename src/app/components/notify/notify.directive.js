(function () {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilNotify', cilNotify);

  /** @ngInject */
  function cilNotify() {
    var directive = {
      restrict: 'E',
      scope: {},
      templateUrl: 'app/components/notify/notify.html',
      controller: NotifyController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NotifyController($scope, $timeout, TweenMax) {
      var vm = this;
      vm.hasError = false;

      function showNotify() {
        TweenMax.to('.notify', 0.5, {top: 0}, 0);
        TweenMax.to('.header', 0.5, {top: '32px'}, 0);
      }

      function hideNotify(delay) {
        var _delay = delay || 3000;
        $timeout(function () {
          TweenMax.to('.notify', 0.5, {top: '-32px'}, 0);
          TweenMax.to('.header', 0.5, {top: '0'}, 0);
        }, _delay);
      }

      $scope.$on('notify/signup/success', function () {
        $timeout(function () {
          vm.msg = 'Email sent to your mailbox';
          showNotify();
          hideNotify(3000);
        });
      });

      $scope.$on('notify/api/error', function (event, args) {
        $timeout(function () {
          vm.hasError = true;
          vm.msg = args.status + ': ' + args.statusText;
          showNotify();
        });
      });

    }
  }

})();
