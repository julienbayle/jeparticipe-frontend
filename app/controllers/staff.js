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
    $scope.message = "";
    $scope.messageClass = "";

    self.login = function() {
      JeParticipe.login(self.userlogin, self.userpassword)
        .then(function() {
          self.message = "";
          self.messageClass = "alert alert-warning";
        }, function() {
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
          $scope.message = "Configuration mise à jour";
          $scope.messageClass = "alert alert-success";
        }, function(data) {
          $scope.message="Erreur lors de la mise à jour";
          $scope.messageClass = "alert alert-warning";
        })
    }

  });