'use strict';
angular.module("schoolines")
    .controller('indexController', ["$scope", "$localStorage", "$timeout", "$mdSidenav", "$log", "$location", "$routeParams", "$window", "IVLEService", "DeadlineService", "AuthService", "Session",
            function($scope, $localStorage, $timeout, $mdSidenav, $log, $location, $routeParams, $window, IVLEService, DeadlineService, AuthService, Session) {
                AuthService.autologin().then(function(){
                    console.log(Session.token);
                    console.log(Session.userId);
                });
                $scope.link = function() {
                        $window.location.href = IVLEService.getLoginUrl();
                    }
                    // Save token to session
                    // first time log in
                if ($routeParams.token) {
                    $location.url('/');
                    IVLEService.createUser(Session.token);

                    AuthService.login($routeParams.token);
                    IVLEService.createUser(Session.token).then(function(){
                        var userId = Session.userId;

                        $location.url('/');
                    });
                }


            }])
        .controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
            $scope.close = function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav('left').close()
                    .then(function() {
                        $log.debug("close LEFT is done");
                    });

            };
        })
        .controller("deadlineCtrl", function($mdSidenav, $scope,$timeout, $log, AuthService, IVLEService, Session, DeadlineService, $localStorage) {
            AuthService.autologin().then(function(){

                IVLEService.getModules(Session.token).then(function() {
                    DeadlineService.getDeadline();
                    $scope.deadlines = JSON.parse($localStorage.deadlines.deadlineArray);
                    for(var d of $scope.deadlines){
                        // TODO change color
                        d.color = "red";
                    }
                });
            });

                // $scope.deadlines = [{
                //     "module": "cs3216",
                //     "date": "2016/9/12",
                //     "title": "some title",
                //     "desc": "some desc",
                //     "color": "#FFEB3B"
                // }, {
                //     "module": "cs3234",
                //     "date": "2016/9/12",
                //     "title": "another title",
                //     "desc": "another desc",
                //     "color": "#CDDC39"
                // }, {
                //     "module": "cs3234",
                //     "date": "2016/9/12",
                //     "title": "hw2",
                //     "desc": "13/9/2016",
                //     "color": "#CDDC39"
                // }];

                $scope.toggleLeft = buildDelayedToggler('left');
                /**
                 * Supplies a function that will continue to operate until the
                 * time is up.
                 */
                function debounce(func, wait, context) {
                    var timer;

                    return function debounced() {
                        var context = $scope,
                            args = Array.prototype.slice.call(arguments);
                        $timeout.cancel(timer);
                        timer = $timeout(function() {
                            timer = undefined;
                            func.apply(context, args);
                        }, wait || 10);
                    };
                }


                /**
                 * Build handler to open/close a SideNav; when animation finishes
                 * report completion in console
                 */
                function buildDelayedToggler(navID) {
                    return debounce(function() {
                        // Component lookup should always be available since we are not using `ng-if`
                        $mdSidenav(navID)
                            .toggle()
                            .then(function() {
                                $log.debug("toggle " + navID + " is done");
                            });
                    }, 200);
                }

                function buildToggler(navID) {
                    return function() {
                        // Component lookup should always be available since we are not using `ng-if`
                        $mdSidenav(navID)
                            .toggle()
                            .then(function() {
                                $log.debug("toggle " + navID + " is done");
                            });
                    }
                }

        });
