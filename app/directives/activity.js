'use strict';

angular.module('jeParticipeApp')
  .directive('activity', function(JeParticipe, Auth) {
    return {
      restrict: 'E',
      scope: {
        config: '=config',
        defaultconfig: '<defaultconfig'
      },
      link: function(scope, element, attrs) {
        var $this = scope;

        $this.message = "";
        $this.messageClass = "";
        $this.loaded = false;
        $this.showAddParticipantForm = false;
        $this.code = $this.config.code
        $this.min = $this.config.min || $this.defaultconfig.min;
        $this.max = $this.config.max || $this.defaultconfig.max;
        $this.fields = $this.config.fields || $this.defaultconfig.fields;

        JeParticipe.getActivity($this.code).then(function(response) {
          updateParticipants(response.data.Participants)
          $this.state = response.data.State;
          $this.loaded = true;
        });

        // Update participant list and compute usefull variables
        function updateParticipants(participants) {
          $this.participants = angular.fromJson(participants);

          // active participant count
          var activeParticipantCount = 0;
          for (var i = 0; i < participants.length; i++) {
            if (isBeforeNow(participants[i].deletedAt)) {
              activeParticipantCount++;
            }
          }
          $this.config.activeParticipantCount = activeParticipantCount;
          $this.config.missingParticipantCount = $this.min - activeParticipantCount > 0 ? $this.min - activeParticipantCount : 0;
        }

        // Add a participant form handler
        function addParticipant() {
          var publicText = "";
          var privateText = "";
          $this.message = "";
          $this.messageClass = "";

          angular.forEach($this.fields, function(field) {
            if (!angular.isString(field.value) || (angular.isString(field.regexp) && !(new RegExp(field.regexp)).test(field.value))) {
              $this.message += ($this.message != "" ? "<br/>" : "") + field.msgRegexpError;
              $this.messageClass = "alert alert-warning";
            }

            if (field.private) {
              privateText += (privateText != "" ? " " : "") + field.value;
            } else {
              publicText += (publicText != "" ? " " : "") + field.value;
            }
          });

          if ($this.messageClass != "") {
            return false;
          }

          JeParticipe.addParticipant($this.code, publicText, privateText).then(function(response) {
            $this.message = $this.config.msgAdded || $this.defaultconfig.msgAdded;
            $this.messageClass = "alert alert-success";
            updateParticipants(response.data.Participants);
          }, function(data) {
            apiError();
          })

          $this.showAddParticipantForm = false;
        }

        // Delete participant handler
        function deleteParticipant(code) {
          JeParticipe.deleteParticipant($this.code, code).then(function(response) {
            $this.message = $this.config.msgDeletion || $this.defaultconfig.msgDeletion;
            $this.messageClass = "alert alert-success";
            for (var i = $this.participants.length; i--;) {
              if ($this.participants[i].code === code) {
                $this.participants.splice(i, 1);
              }
            }
            updateParticipants($this.participants)
          }, function(data) {
            apiError();
          })
        }

        // Show a specific message in case of API error
        function apiError() {
          $this.message = $this.config.msgAPIError || $this.defaultconfig.msgAPIError;
          $this.messageClass = "alert alert-warning";
        }

        // Change state handler
        function updateState(state) {
          JeParticipe.updateState($this.code, state).then(function(data) {
            $this.message = "Etat mis à jour";
            $this.messageClass = "alert alert-success";
            $this.state = state;
          }, function(data) {
            apiError();
          })
        }

        function isBeforeNow(dateString) {
          var date = new Date(dateString);
          return date.getTime() > (new Date()).getTime();
        }

        $this.addParticipant = addParticipant;
        $this.deleteParticipant = deleteParticipant;
        $this.updateState = updateState;
        $this.isBeforeNow = isBeforeNow;

        $this.isAuthed = function() {
          return Auth.isAuthed ? Auth.isAuthed() : false
        }
      },

      templateUrl: "directives/activity.html"
    };
  });