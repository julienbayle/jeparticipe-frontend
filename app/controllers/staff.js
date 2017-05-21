'use strict';

angular.module('jeParticipeApp')
  .config(function(JSONEditorProvider) {
    JSONEditorProvider.configure({
      defaults: {
        options: {
          iconlib: 'bootstrap3',
          theme: 'bootstrap3'
        }
      }
    });
  })
  .controller('StaffCtrl', function($scope, $http, JeParticipe, Auth) {
    var self = this;

    $scope.pageConfig = JeParticipe.getConfig();
    $scope.pageConfigSchema = $http.get('schema.json');

    self.login = function() {
      JeParticipe.login(self.userlogin, self.userpassword)
        .then(function() {}, function() {
          self.message = "Identifiant ou mot de passe incorrect";
          self.messageClass = "alert alert-warning";
        })
    }

    self.logout = function() {
      Auth.logout && Auth.logout()
    }

    self.isAuthed = function() {
      return Auth.isAuthed ? Auth.isAuthed() : false
    }
  
    $scope.onSubmit = function () {
       JeParticipe.setConfig($scope.editor.getValue()).then(function(response) {
          self.message="OK";
          self.messageClass= "alert alert-success";
        }, function(data) {
          self.message="Erreur";
          self.messageClass = "alert alert-warning";
        })
    }

  });