'use strict';

/**
 * @ngdoc function
 * @name escaFeteFinAnneeApp.factory:JeParticipe
 * @description
 * # API
 */
angular.module('jeParticipeApp')
  .constant('API', 'https://www.circuleo.fr/api')
  .factory('JeParticipe', function($http, API, $routeParams) {
    var JeParticipe = {};

    function getEventCode() {
      return $routeParams.code;
    }

    JeParticipe.login = function(username, password) {
      return $http.post(API + '/login', {
        username: username,
        password: password
      });
    };

    JeParticipe.getActivity = function(activityCode) {
      return $http.get(API + '/event/' + $routeParams.code + '/activity/' + activityCode);
    };

    JeParticipe.getConfig = function() {
      return $http.get(API + '/event/' + getEventCode() + '/config');
    };

    JeParticipe.setConfig = function(config) {
      return $http.put(API + '/event/' + getEventCode() + '/config', config);
    };

    JeParticipe.addParticipant = function(activityCode, publicText, privateText) {
      var data = {
        "text": publicText,
        "adminText": privateText
      };
      return $http.put(API + '/event/' + getEventCode() + '/activity/' + activityCode + '/participant', data);
    };

    JeParticipe.deleteParticipant = function(activityCode, code) {
      return $http.get(API + '/event/' + getEventCode() + '/activity/' + activityCode + '/participant/' + code + '/delete');
    };

    JeParticipe.updateState = function(activityCode, state) {
      return $http.put(API + '/event/' + getEventCode() + '/activity/' + activityCode + '/state/' + state);
    };

    JeParticipe.createEvent = function(code, email) {
      return $http.post(API + '/event', {
        code: code,
        userEmail: email
      })
    }

    return JeParticipe;
  });