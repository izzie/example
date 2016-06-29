(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilCustomersDesktop', cilCustomersDesktop);

  /** @ngInject */
  function cilCustomersDesktop() {
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        customers: '='
      },
      templateUrl: 'app/components/customers/customers-desktop.html',
      controller: CustomersDesktopController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CustomersDesktopController(Swiper) {
      // Our customers - Slide
      new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 100
      });
    }
  }

})();
