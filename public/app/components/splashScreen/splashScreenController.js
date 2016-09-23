'use strict'

angular.module("schoolines").controller("splashScreenController", ['$location', '$scope', '$window', 'IVLEService', function($location, $scope, $window, IVLEService) {
    $scope.images = ["/images/bgbanner-long.png", "/images/bgbanner-port.png", "/images/nus.jpg", "/images/homework.jpg"];

    $scope.login = function() {
        $window.location.href = IVLEService.getLoginUrl();
    }
}])
