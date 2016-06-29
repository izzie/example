(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .service('cilModal', leessModal);

  /** @ngInject */
  function leessModal($uibModal) {
    var modalInstance = {};

    return {
      openSignup: openSignup,
      closeModal: closeModal
    };

    function openSignup() {
      modalInstance['signup'] = $uibModal.open({
        animation: true,
        // backdrop: 'static',
        windowClass: 'cil-modal__modal',
        backdropClass: 'cil-modal__backdrop',
        template: '<div cil-signup></div>',
        controller: function(){},
        controllerAs: 'vm'
      });
    }

    function closeModal(name){
      modalInstance[name].dismiss();
    }

  }
})();
