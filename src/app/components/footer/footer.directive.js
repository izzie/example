(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilFooter', cilFooter);

  /** @ngInject */
  function cilFooter() {
    var directive = {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/footer/footer.html',
      controller: FooterController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FooterController($location) {
      var vm = this;
      vm.$location = $location;
    }
  }

})();
