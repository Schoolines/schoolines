'use strict'

angular.module("schoolines").controller("deadlineCreateController", ["$route", "$scope", "$location", "AuthService", "DeadlineService", "Session", "IVLEService",
    function($route, $scope, $location, AuthService, DeadlineService, Session, IVLEService) {
        AuthService.autologin().then(function(){
            $scope.deadline = {};
            $scope.deadline.userId = Session.userId;
        });

        IVLEService.getModules(Session.token).then(function(){
            $scope.modules= Session.modules;
            console.log($scope.modules);
        });
        $scope.createDeadline = function(){
            DeadlineService.create($scope.deadline).then(function(res){
                $route.reload();
                $location.path('/');
            });
        };
    }
]);
