'use strict';

angular.module('jeParticipeApp')
  .factory('authInterceptor', function(API, Auth) {
    return {
      // automatically attach Authorization header
      request: function(config) {
        var token = Auth.getToken();
        if (config.url.indexOf(API) === 0 && Auth.isAuthed()) {
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
      },

      // If a token was sent back, save it
      response: function(res) {
        if (res.config.url.indexOf(API) === 0 && res.data.token) {
          Auth.saveToken(res.data.token);
        }

        return res;
      },
    }
  })

.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})

.service('Auth', function($window) {
  var self = this;

  self.parseJwt = function(token) {
    try {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    } catch (err) {
      return null;
    }
  }

  self.saveToken = function(token) {
    $window.localStorage['jwtToken'] = token;
  }

  self.getToken = function() {
    return $window.localStorage['jwtToken'];
  }

  self.isAuthed = function() {
    var token = self.getToken();
    if (token) {
      var params = self.parseJwt(token);
      if (params != null && !angular.isUndefined(params.exp) && Math.round(new Date().getTime() / 1000) <= params.exp) {
        return true;
      }
      self.logout();
    }
    return false;
  }

  self.logout = function() {
    $window.localStorage.removeItem('jwtToken');
  }
});
