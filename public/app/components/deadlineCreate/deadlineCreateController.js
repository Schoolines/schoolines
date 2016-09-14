'use strict'

angular.module("schoolines").controller("deadlineCreateController", ["$scope", "$location", "AuthService", "DeadlineService", "Session",
    function($scope, $location, AuthService, DeadlineService, Session) {
        AuthService.autologin().then(function(){
            $scope.deadline = {};
            $scope.deadline.userId = Session.userId;
        });


        $scope.createDeadline = function(){
            DeadlineService.create($scope.deadline).then(function(res){
                console.log("created");
            });
        };
    }
]);
