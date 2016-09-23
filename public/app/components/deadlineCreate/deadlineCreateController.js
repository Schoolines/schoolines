'use strict'

angular.module("schoolines").config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD/MM/YYYY');
    };
}).controller("deadlineCreateController", ["$route", "$scope", "$location", "$localStorage", "AuthService", "DeadlineService", "Session", "OnlineStatusService", "IVLEService", "$window",
    function($route, $scope, $location, $localStorage, AuthService, DeadlineService, Session, OnlineStatusService, IVLEService, $window) {
        $scope.onlineStatus = OnlineStatusService;
        $scope.$watch('onlineStatus.isOnline()', function(online) {
            if (!online) {
                sweetAlert("Oops...", "Service not available offline.", "error");
                $location.path("/");
            }
        });

        $window.ga('send', 'pageview', {
            page: $location.url()
        });
        AuthService.autologin().then(function() {
            $scope.deadline = (!!DeadlineService.deadlineDetail) ? DeadlineService.deadlineDetail : {};
            $scope.deadline.userId = Session.userId;
            if (!!DeadlineService.deadlineDetail) {
                var datetime = DeadlineService.deadlineDetail.date.split(" ");
                var date = datetime[0].split('/');

                var time = datetime[1].split(":");
                $scope.myDate = new Date();
                $scope.myDate.setDate(date[0]);
                $scope.myDate.setMonth(date[1]);
                $scope.myDate.setFullYear(date[2]);
                $scope.deadline.timeStr = new Date(1970, 0, 1, time[0], time[1], 0);
                $scope.deadline.timeStrMob = new Date(1970, 0, 1, time[0], time[1], 0);



                console.log($scope.deadline.timeStrMob);

            } else {
                $scope.myDate = new Date();
            }



        });

        IVLEService.getModules(Session.token).then(function() {
            $scope.modules = $localStorage.modules;
        });

        $scope.redirectTo = function(url) {
            $location.path(url);
        }
        $scope.createDeadline = function() {
            $scope.deadline.due = $scope.myDate;
            var timeObj;
            if ($scope.deadline.timeStr != undefined) {
                timeObj = $scope.deadline.timeStr;
            } else {
                timeObj = $scope.deadline.timeStrMob;
            }

            $scope.deadline.due.setHours(timeObj.getHours());
            $scope.deadline.due.setMinutes(timeObj.getMinutes());
            console.log("after", $scope.deadline.due);
            $scope.deadline.due = $scope.deadline.due.toString();
            console.log("deadline", $scope.deadline);
            DeadlineService.create($scope.deadline).then(function(res) {
                if (res == 401) {
                    sweetAlert("Oops...", "Seems like you are not authenticated\n Press OK to login agian", "error");
                    $location.path("/splash");
                } else {
                    sweetAlert("Deadline Created!", "Thank you for contributing to Schoolines", "success");
                    $route.reload();
                    $location.path('/');
                }

            });
        };
    }
]);
