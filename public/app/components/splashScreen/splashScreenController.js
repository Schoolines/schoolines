'use strict'

angular.module("schoolines").controller("splashScreenController", ['$location', '$scope', function($location,$scope){
	$scope.images = ["/images/bgbanner-long.png","/images/bgbanner-port.png","/images/nus.jpg","/images/homework.jpg"];
    $scope.login = function(){
        $location.path('/');
    }
}])
