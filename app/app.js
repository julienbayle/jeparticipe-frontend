'use strict';

angular
  .module('jeParticipeApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angulartics',
    'angulartics.google.analytics',
    'angular-json-editor'
  ])
  .config(function($routeProvider, $locationProvider, $analyticsProvider) {

    $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
    $analyticsProvider.withAutoBase(true); /* Records full path */

    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        templateUrl: 'controllers/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/event/:code', {
        templateUrl: 'controllers/event.html',
        controller: 'EventCtrl',
        controllerAs: 'event'
      })
      .when('/event/:code/staff', {
        templateUrl: 'controllers/staff.html',
        controller: 'StaffCtrl',
        controllerAs: 'staff'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('NavCtrl', function($scope, $routeParams) {
    this.code = $routeParams.code;
  });