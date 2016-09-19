'use strict'

angular.module("schoolines").controller("deadlineCreateController",
["$route", "$scope", "$location","$localStorage" ,"AuthService", "DeadlineService", "Session", "IVLEService", "$window",
    function($route, $scope, $location,$localStorage, AuthService, DeadlineService, Session, IVLEService, $window) {
        $window.ga('send', 'pageview', { page: $location.url() });
        AuthService.autologin().then(function(){
            $scope.deadline = {};
            $scope.deadline.userId = Session.userId;
            $scope.myDate = new Date();
        });

        IVLEService.getModules(Session.token).then(function(){
            $scope.modules= $localStorage.modules;
        });

        $scope.redirectTo = function(url){
            $location.path(url);
        }
        $scope.createDeadline = function(){
            $scope.deadline.due = $scope.myDate;
            $scope.deadline.due.setHours($scope.deadline.hour);
            $scope.deadline.due.setMinutes($scope.deadline.min);
            $scope.deadline.due = $scope.deadline.due.toString();
            DeadlineService.create($scope.deadline).then(function(res){
                $route.reload();
                $location.path('/');
            });
        };
    }
]);
