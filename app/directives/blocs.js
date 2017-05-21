'use strict';

angular.module('jeParticipeApp')
	.directive('blocs', function(JeParticipe) {
		return {
			restrict: 'E',
			scope: {
				blocs: '=data',
				defaultconfig: '=defaultconfig'
			},
			templateUrl: "directives/blocs.html"
		}
	})