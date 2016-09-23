'use strict';
angular.module("schoolines")
    .controller('indexController', ["$scope", "$localStorage", "$timeout", "OnlineStatusService",
        "$mdSidenav", "$log", "$location", "$routeParams", "$window", "IVLEService", "DeadlineService", "AuthService", "Session",
        function($scope, $localStorage, $timeout, OnlineStatusService, $mdSidenav, $log, $location, $routeParams, $window, IVLEService, DeadlineService, AuthService, Session) {

            $scope.title = "Schoolines";
            $window.ga('send', 'pageview', {
                page: $location.url()
            });

            AuthService.autologin().then(function() {
                console.log(Session.token);
                console.log(Session.userId);
            });

            var onlineStatus = OnlineStatusService;
            $scope.redirectTo = function(url) {
                DeadlineService.deadlineDetail = null;
                    if (onlineStatus.isOnline()) {
                        $location.path(url);
                    } else {
                        sweetAlert("Oops...", "Service not available offline.", "error");
                    }
                }
                // Save token to session
                // first time log in
                // if ($routeParams.token) {
                //     IVLEService.createUser(Session.token);
                //
                //     AuthService.login($routeParams.token);
                //     IVLEService.createUser(Session.token).then(function(){
                //         var userId = Session.userId;
                //
                //         $location.url('/');
                //     });
                // }


        }
    ]);
