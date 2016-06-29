(function () {
  'use strict';

  angular
    .module('cil01Frontend')
    .controller('HowItWorksController', HowItWorksController);

  /** @ngInject */
  function HowItWorksController(cilBreakpointStore, TweenMax, $window, initData) {
    var vm = this;
    vm.initData = initData[0];
    var $howitworks__list = $window.document.getElementById('howitworks__list');

    vm.bpChangeCallback = bpChangeCallback;

    function bpChangeCallback(bp, dimension) {
      vm.isMobile = bp === 'mobile';

      var _cw = dimension.width * 0.76;

      if( _cw< 780 && dimension.width > 768){
        var _ratio = $window.Math.abs(_cw - 780)/780;
        _ratio = _ratio > 0.2 ? 0.2 : _ratio;
        var _top = $howitworks__list.offsetHeight * _ratio/2;

        TweenMax.set('.howitworks__content ul', {scale: (1 - _ratio), top: (0 - _top)});
        TweenMax.set('.howitworks__content', {height: $howitworks__list.offsetHeight * (1-_ratio) + 290});

      }else if(dimension.width <= 768){
        TweenMax.set('.howitworks__content ul', {scale: 1});
        TweenMax.set('.howitworks__content', {height: 'auto'});
      }

    }

    cilBreakpointStore.breakPointChanged(vm.bpChangeCallback);

  }
})();
