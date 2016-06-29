(function () {
  'use strict';

  angular
    .module('cil01Frontend')
    .controller('CareersController', CareersController);

  /** @ngInject */
  function CareersController(cilBreakpointStore, initData, _) {
    var vm = this;
    vm.bpChangeCallback = bpChangeCallback;

    vm.initData = initData;
    vm.description = vm.initData.basic[0].fields.description;
    vm.openings = _.orderBy(vm.initData.openings, ['fields.category', 'fields.position'], ['asc', 'asc']);
    vm.openings = _.transform(vm.openings, function (result, value, key) {
      result[value.fields.category] = result[value.fields.category] || {};
      result[value.fields.category][key] = value;
    }, {});

    function bpChangeCallback(bp) {
      vm.isMobile = bp === 'mobile';
    }

    cilBreakpointStore.breakPointChanged(vm.bpChangeCallback);
  }
})();
