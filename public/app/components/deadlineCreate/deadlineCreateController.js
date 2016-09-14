'use strict'

angular.module("schoolines").controller("deadlineCreateController", ["$route", "$scope", "$location", "AuthService", "DeadlineService", "Session",
    function($route, $scope, $location, AuthService, DeadlineService, Session) {
        AuthService.autologin().then(function(){
            $scope.deadline = {};
            $scope.deadline.userId = Session.userId;
        });


        $scope.createDeadline = function(){
            DeadlineService.create($scope.deadline).then(function(res){
                $route.reload();
                $location.path('/');
            });
        };
    }
]);
