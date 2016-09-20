'use strict'

angular.module("schoolines").controller("deadlineDetailController", ["$scope", "$location", "$localStorage", "DeadlineService", "AuthService", "Session", "$window",
    function($scope, $location, $localStorage, DeadlineService, AuthService, Session, $window) {
        AuthService.autologin().then(function() {
            $scope.deadline = DeadlineService.deadlineDetail;


            if (!$scope.deadline) {
                alert("Please access this page from the main page\n Click OK to go to main page");
                $location.path("/");
            }

            $scope.isContributor = Session.userId == $scope.deadline.userId;


            if (!!$localStorage.hiddenDeadlines && $localStorage.hiddenDeadlines.includes($scope.deadline.id)) {
                $scope.isHidden = true;
            } else {
                $scope.isHidden = false;
            }

            $window.ga('send', 'pageview', {
                page: $location.url()
            });

            $scope.redirectTo = function(url) {
                $location.path(url);
            }

            $scope.hideDeadline = function(id) {
                if (!!$localStorage.hiddenDeadlines) {
                    $localStorage.hiddenDeadlines.push(id);
                } else {
                    $localStorage.hiddenDeadlines = [id];
                }

                $location.path('/');
            }


            $scope.unhideDeadline = function(id) {
                $localStorage.hiddenDeadlines.splice($localStorage.hiddenDeadlines.indexOf(id), 1);
                $location.path('/');
            }

            $scope.deleteDeadline = function(id) {
                $localStorage.deadlines.deadlineArray.splice($localStorage.deadlines.deadlineArray.indexOf(
                    ($localStorage.deadlines.deadlineArray.filter(function(d) {
                        return d.id == id;
                    }))[0]
                ), 1);
                DeadlineService.deleteDeadline(id).then(function() {
                    $location.path('/');
                });

            }
        })

    }
])
