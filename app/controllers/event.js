'use strict';

angular.module('jeParticipeApp')
	.controller('EventCtrl', function(JeParticipe, $http) {
		var self = this;
		JeParticipe.getConfig().then(function(data) {
			self.config = data.data;
		}, function(data) {
			self.appMessage = "Application indisponible ou événement inconnu, merci de contacter votre organisateur."
		})
	});