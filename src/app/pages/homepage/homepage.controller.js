(function () {
  'use strict';

  angular
    .module('cil01Frontend')
    .controller('HomepageController', homepageController);

  /** @ngInject */
  function homepageController(cilBreakpointStore, initData, assetsData, _) {
    var vm = this;
    vm.bpChangeCallback = bpChangeCallback;
    vm.assetsData = assetsData;
    vm.basic = initData.basic[0];

    function mappingCustomersAssets() {
      var result = [];
      for (var i = 0, len = vm.customers.length; i < len; i++) {
        var value = vm.customers[i];
        var _avatar = _.find(vm.assetsData, function (o) {
          return o.sys.id === value.fields.avatar.sys.id;
        });
        result.push({
          id: value.fields.id,
          name: value.fields.name,
          description: value.fields.description,
          avatar: _avatar
        });
      }
      return result;
    }

    function mappingAnimationAssets(id) {
      var result = _.find(vm.assetsData, function (o) {
        return o.sys.id === id;
      });
      return result;
    }

    function mappingRandomBg() {
      var result = [];
      var bgs = vm.basic.fields.landingBackgrounds;
      for (var i = 0, len = bgs.length; i < len; i++) {
        var value = bgs[i];
        var _bg = _.find(vm.assetsData, function (o) {
          return o.sys.id === value.sys.id;
        });
        result.push(_bg);
      }
      return result;
    }

    function bpChangeCallback(bp) {
      vm.isMobile = bp === 'mobile';
    }

    cilBreakpointStore.breakPointChanged(vm.bpChangeCallback);

    vm.customers = _.sortBy(initData.customers, ['fields.id'], ['asc']);
    vm.customers = mappingCustomersAssets();
    vm.steps = {
      stepsHeadline: vm.basic.fields.stepsHeadline,
      stepTitle1: vm.basic.fields.stepTitle1,
      stepTitle2: vm.basic.fields.stepTitle2,
      stepTitle3: vm.basic.fields.stepTitle3,
      stepDescription1: vm.basic.fields.stepDescription1,
      stepDescription2: vm.basic.fields.stepDescription2,
      stepDescription3: vm.basic.fields.stepDescription3
    };
    vm.landing = {
      animationImageDesktop1: mappingAnimationAssets(vm.basic.fields.animationImageDesktop1.sys.id),
      animationImageDesktop2: mappingAnimationAssets(vm.basic.fields.animationImageDesktop2.sys.id),
      animationImageDesktop3: mappingAnimationAssets(vm.basic.fields.animationImageDesktop3.sys.id),
      animationImageDesktop4: mappingAnimationAssets(vm.basic.fields.animationImageDesktop4.sys.id),
      animationImageMobile1: mappingAnimationAssets(vm.basic.fields.animationImageMobile1.sys.id),
      animationImageMobile2: mappingAnimationAssets(vm.basic.fields.animationImageMobile2.sys.id),
      animationImageMobile3: mappingAnimationAssets(vm.basic.fields.animationImageMobile3.sys.id),
      animationImageMobile4: mappingAnimationAssets(vm.basic.fields.animationImageMobile4.sys.id),
      animationDescription2: vm.basic.fields.animationDescription2,
      animationDescription3: vm.basic.fields.animationDescription3,
      animationDescription4: vm.basic.fields.animationDescription4,
      animationTitle2: vm.basic.fields.animationTitle2,
      animationTitle3: vm.basic.fields.animationTitle3,
      animationTitle4: vm.basic.fields.animationTitle4,
      animationLabel2: vm.basic.fields.animationLabel2,
      animationLabel3: vm.basic.fields.animationLabel3,
      animationLabel4: vm.basic.fields.animationLabel4,
      landingStartButton: vm.basic.fields.landingStartButton,
      landingTitle: vm.basic.fields.landingTitle,
      landingDescription: vm.basic.fields.landingDescription,
      landingBackgrounds: mappingRandomBg()
    };

  }
})();
