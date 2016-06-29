(function () {
  'use strict';

  angular
    .module('cil01Frontend')
    .factory('cilApiService', cilApiService);

  /** @ngInject */
  function cilApiService($http, env, $q, $rootScope, _) {

    var contentfulConfig = {
      space: '1fgbfnb4rzxx',
      accessToken: '87a68fe9d3e074e8eaef759698988b0b2ca6d6094b8c4641b20133cd7e23bf95'
    };

    var contentfulData = {
      items: [],
      assets: [],
      howitworks: [],
      homepage: {
        basic: [],
        customers: []
      },
      pricing: {
        basic: [],
        faq: []
      },
      career: {
        basic: [],
        openings: []
      }
    };

    function signup(args) {
      var _url = env === 'dev' ? 'http://api.dev-cilantro.wiredcraft.net:3001/api/employees/gmsend' : 'http://api.dev-cilantro.wiredcraft.net:3001/api/employees/gmsend';

      return $http({
        method: 'POST',
        url: _url,
        data: args
      });
    }

    function login() {
      return env === 'dev' ? 'http://pizza-test.dev.responsivehero.de/#/login' : 'http://pizza-test.dev.responsivehero.de/#/login'
    }

    function getAllAssets() {
      var promise;
      if (!contentfulData.assets.length) {
        var _url = 'https://cdn.contentful.com/spaces/' + contentfulConfig.space +
          '/assets?access_token=' + contentfulConfig.accessToken;

        promise = $http({
          method: 'GET',
          url: _url
        }).then(function (responsive) {
          if (responsive.status === 200) {
            contentfulData.assets = responsive.data.items;
            return contentfulData.assets;
          }else{
            return $rootScope.$broadcast('notify/api/error', {
              status: responsive.status,
              statusText: responsive.statusText
            });
          }
        });
      } else {
        promise = $q.resolve(contentfulData.assets);
      }
      return promise;
    }

    function getAllContent(which) {
      var _url = 'https://cdn.contentful.com/spaces/' + contentfulConfig.space +
        '/entries?access_token=' + contentfulConfig.accessToken;
      return $http({
        method: 'GET',
        url: _url
      }).then(function (responsive) {
        if (responsive.status === 200) {
          contentfulData.items = responsive.data.items;
          contentfulData.howitworks = _.filter(contentfulData.items, function (o) {
            return o.sys.contentType.sys.id === 'howItWorks';
          });
          contentfulData.homepage.basic = _.filter(contentfulData.items, function (o) {
            return o.sys.contentType.sys.id === 'homepage';
          });
          contentfulData.homepage.customers = _.filter(contentfulData.items, function (o) {
            return o.sys.contentType.sys.id === 'customers';
          });
          contentfulData.pricing.basic = _.filter(contentfulData.items, function (o) {
            return o.sys.contentType.sys.id === 'pricing';
          });
          contentfulData.pricing.faq = _.filter(contentfulData.items, function (o) {
            return o.sys.contentType.sys.id === 'faq';
          });
          contentfulData.career.basic = _.filter(contentfulData.items, function (o) {
            return o.sys.contentType.sys.id === 'career';
          });
          contentfulData.career.openings = _.filter(contentfulData.items, function (o) {
            return o.sys.contentType.sys.id === 'careerOpenings';
          });
          $rootScope.signUpDescription = contentfulData.homepage.basic[0].fields.signUpDescription;
          return which ? contentfulData[which] : contentfulData.items;
        } else {
          return $rootScope.$broadcast('notify/api/error', {
            status: responsive.status,
            statusText: responsive.statusText
          });
        }
      });
    }

    function getHowItWorksContent() {
      var promise;
      if (!contentfulData.howitworks.length) {
        promise = getAllContent('howitworks');
      } else {
        promise = $q.resolve(contentfulData.howitworks);
      }
      return promise;
    }

    function getHomepageContent() {
      var promise;
      if (!contentfulData.homepage.basic.length || !contentfulData.homepage.customers.length) {
        promise = getAllContent('homepage');
      } else {
        promise = $q.resolve(contentfulData.homepage);
      }
      return promise;
    }

    function getPricingContent() {
      var promise;
      if (!contentfulData.pricing.basic.length || !contentfulData.pricing.faq.length) {
        promise = getAllContent('pricing');
      } else {
        promise = $q.resolve(contentfulData.pricing);
      }
      return promise;
    }

    function getCareerContent() {
      var promise;
      if (!contentfulData.career.basic.length || !contentfulData.career.openings.length) {
        promise = getAllContent('career');
      } else {
        promise = $q.resolve(contentfulData.career);
      }
      return promise;
    }

    return {
      signup: signup,
      login: login,
      getAllAssets: getAllAssets,
      getHowItWorksContent: getHowItWorksContent,
      getHomepageContent: getHomepageContent,
      getPricingContent: getPricingContent,
      getCareerContent: getCareerContent
    };

  }
})();
