'use strict';

angular.module('jeParticipeApp')
	.controller('HomeCtrl', function(JeParticipe) {
		var self = this;
		self.create = function() {
			JeParticipe.createEvent(self.name, self.email).then(function(response) {
				self.message = "Vous avez du courrier !";
				self.messageClass = "alert alert-success";
			}, function(data) {
				self.message = data.data.Error;
				self.messageClass = "alert alert-warning";
			})
		}

	})