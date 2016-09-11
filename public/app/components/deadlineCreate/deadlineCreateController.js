'use strict'

angular.module("schoolines").controller("deadlineCreateController", ["$scope", "$location", "AuthService", "DeadlineService",
    function($scope, $location, AuthService, DeadlineService) {
        AuthService.autologin();

        $scope.deadline = {};
        $scope.createDeadline = function(){
            DeadlineService.create($scope.deadline).then(function(res){
                console.log("created");
            });
        };
    }
]);
