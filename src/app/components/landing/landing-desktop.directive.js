(function () {
  'use strict';

  angular
    .module('cil01Frontend')
    .directive('cilLandingDesktop', cilLandingDesktop);

  /** @ngInject */
  function cilLandingDesktop() {
    var directive = {
      restrict: 'E',
      scope: {
        landing: '='
      },
      templateUrl: 'app/components/landing/landing-desktop.html',
      controller: LandingDesktopController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function LandingDesktopController($window, $timeout, ScrollMagic, TimelineMax, Power2, cilModal, cilBreakpointStore) {
      var vm = this;
      vm.signup = signup;
      vm.seeFeature = seeFeature;
      vm.currentDimension = cilBreakpointStore.getCurrentDimension();
      vm.scaleRatio = 1;
      vm.bpChangeCallback = bpChangeCallback;

      var $stage = $window.document.getElementsByClassName('stage');
      var $header = $window.document.querySelector('.homepage__header');

      function bpChangeCallback(bp, dimension) {
        vm.isMobile = bp === 'mobile';

        if (dimension.width / dimension.height > 1024 / 768) {
          vm.scaleRatio = 1 - Math.abs((dimension.height - 768)) / 768;

        } else if (dimension.width / dimension.height < 1024 / 768) {
          vm.scaleRatio = 1 - Math.abs((dimension.width - 1024)) / 1024;

        } else {
          vm.scaleRatio = 1;
        }

        var stageLength = $stage.length;
        while (stageLength--) {
          $stage[stageLength].style.cssText = 'transform: scale(' + vm.scaleRatio + ')';
        }

      }

      cilBreakpointStore.breakPointChanged(vm.bpChangeCallback);


      // Returns a random integer between min (included) and max (included)
      // Using Math.round() will give you a non-uniform distribution!
      function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // Random landing Background
      // angular.element($element[0].querySelector('.random-bg')).addClass('random-bg' + getRandomIntInclusive(1, 5));
      var randomId = getRandomIntInclusive(0, 4);
      vm.randomBg = vm.landing.landingBackgrounds[randomId].fields.file.url;
      
      // init controller
      var controller = new ScrollMagic.Controller();

      // define movement of panels
      var animate1 = new TimelineMax()
        .to(['.homepage__panel--landing .description', '.homepage__panel--landing .indicator'], 0.15, {
          opacity: '0',
          delay: 0.15,
          ease: Power2.easeIn,
          immediateRender: false
        })
        .to('.homepage__panel--landing', 0.25, {opacity: 0, ease: Power2.easeIn})
        .to('.feature1--desktop', 0.25, {opacity: 1, ease: Power2.easeOut, onComplete: function () {
          angular.element($header).removeClass('header--nobg');
        }, onReverseComplete: function () {
          angular.element($header).addClass('header--nobg');
        }});

      var animate2 = new TimelineMax()
        .to('.feature1--desktop', 0.25, {opacity: 0, ease: Power2.easeIn})
        .to('.feature2--desktop', 0.25, {opacity: 1, ease: Power2.easeOut})
        .fromTo(['.feature2--desktop .desc--3', '.feature2--desktop .desc--4'], 0.15, {opacity: 0}, {
          opacity: 1,
          ease: Power2.easeOut,
          immediateRender: false
        });

      var animate3 = new TimelineMax()
        .to('.feature2--desktop', 0.25, {opacity: 0, ease: Power2.easeIn})
        .to('.feature3--desktop', 0.25, {opacity: 1, ease: Power2.easeOut})
        .fromTo(['.feature3--desktop .desc--5', '.feature3--desktop .desc--6'], 0.15, {opacity: 0}, {
          opacity: 1,
          ease: Power2.easeOut,
          immediateRender: false
        });

      var animate4 = new TimelineMax()
        .to('.feature3--desktop', 0.25, {opacity: 0, ease: Power2.easeIn})
        .to('.feature4--desktop', 0.25, {opacity: 1, ease: Power2.easeOut})
        .fromTo(['.feature4--desktop .desc--1', '.feature4--desktop .desc--2'], 0.15, {opacity: 0}, {
          opacity: 1,
          ease: Power2.easeOut,
          immediateRender: false
        });

      // build scene
      $timeout(function () {
        new ScrollMagic.Scene({
          triggerElement: ".homepage__animated",
          triggerHook: "onLeave",
          duration: 2300
        }).setPin(".homepage__animated")
        // .addIndicators()
          .addTo(controller);

        new ScrollMagic.Scene({
          triggerElement: ".homepage__placeholder--1",
          triggerHook: "onLeave"
        }).setTween(animate1)
        // .addIndicators({name: "1"})
          .addTo(controller);

        new ScrollMagic.Scene({
          triggerElement: ".homepage__placeholder--2",
          triggerHook: "onLeave"
        }).setTween(animate2)
        // .addIndicators({name: "2"})
          .addTo(controller);

        new ScrollMagic.Scene({
          triggerElement: ".homepage__placeholder--3",
          triggerHook: "onLeave"
        }).setTween(animate3)
        // .addIndicators({name: "3"})
          .addTo(controller);

        new ScrollMagic.Scene({
          triggerElement: ".homepage__placeholder--4",
          triggerHook: "onLeave"
        }).setTween(animate4)
        // .addIndicators({name: "4"})
          .addTo(controller);

      });

      function seeFeature() {
        controller.scrollTo('.homepage__placeholder--1');
      }

      function signup() {
        cilModal.openSignup();
      }

    }
  }

})();
