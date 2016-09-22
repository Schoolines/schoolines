'use strict'

angular.module("schoolines").factory("OnlineStatusService", ["$window", "$rootScope",
    function($window, $rootScope) {
        var onlineStatusService = {};
        onlineStatusService.onLine = $window.navigator.onLine;

        onlineStatusService.isOnline = function() {
            return onlineStatus.onLine;
        }

        $window.addEventListener("online", function() {
            onlineStatusService.onLine = true;
            $rootScope.$digest();
        }, true);

        $window.addEventListener("offline", function() {
            onlineStatusService.onLine = false;
            $rootScope.$digest();
        }, true);


        return onlineStatusService;
    }
]);
