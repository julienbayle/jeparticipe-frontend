'use strict';

angular.module('jeParticipeApp')
	.filter('sumOfValue', function() {
		return function(data, key) {
			if (angular.isUndefined(data) || angular.isUndefined(key))
				return 0;
			var sum = 0;
			angular.forEach(data, function(value) {
				sum = sum + parseInt(value[key]);
			});
			return sum;
		}
	});