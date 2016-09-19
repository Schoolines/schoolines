'use strict'

angular.module("schoolines").controller("splashScreenController", ['$location', function($location){
    $scope.login = function(){
        $location.path('/');
    }
}])
