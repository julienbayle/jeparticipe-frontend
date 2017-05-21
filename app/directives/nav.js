'use strict';

angular.module('jeParticipeApp')
	.directive('nav', function($routeParams) {
		return {
			restrict: 'E',
			scope: {
			},
			link: function(scope, element, attrs) {
				 scope.$on('$routeChangeSuccess', function (event, current, previous) {
			         scope.code = $routeParams.code;
			     });
			},
			templateUrl: "directives/nav.html"
		}
	});