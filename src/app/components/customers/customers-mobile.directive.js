(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilCustomersMobile', cilCustomersMobile);

  /** @ngInject */
  function cilCustomersMobile() {
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        customers: '='
      },
      templateUrl: 'app/components/customers/customers-mobile.html',
      controller: CustomersMobileController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CustomersMobileController(Swiper) {
      // Our customers - Slide
      new Swiper('.swiper-container--mobile', {
        pagination: '.swiper-pagination--mobile',
        paginationClickable: true
      });
    }
  }

})();
