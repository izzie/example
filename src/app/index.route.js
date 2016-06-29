(function() {
  'use strict';

  angular
    .module('cil01Frontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/pages/homepage/homepage.html',
        controller: 'HomepageController',
        controllerAs: 'vm',
        resolve: {
          initData: function (cilApiService) {
            return cilApiService.getHomepageContent();
          },
          assetsData: function (cilApiService) {
            return cilApiService.getAllAssets();
          }
        }
      })
      .when('/how-it-works', {
        templateUrl: 'app/pages/how-it-works/how-it-works.html',
        controller: 'HowItWorksController',
        controllerAs: 'vm',
        resolve: {
          initData: function (cilApiService) {
            return cilApiService.getHowItWorksContent();
          }
        }
      })
      .when('/pricing', {
        templateUrl: 'app/pages/pricing/pricing.html',
        controller: 'PricingController',
        controllerAs: 'vm',
        resolve: {
          initData: function (cilApiService) {
            return cilApiService.getPricingContent();
          }
        }
      })
      .when('/careers', {
        templateUrl: 'app/pages/careers/careers.html',
        controller: 'CareersController',
        controllerAs: 'vm',
        resolve: {
          initData: function (cilApiService) {
            return cilApiService.getCareerContent();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
