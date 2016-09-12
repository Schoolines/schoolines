"use strict"

angular.module("schoolines").controller("indexController", ["$scope", "$location", "$routeParams", "IVLEService", function($scope, $location, $routeParams, IVLEService) {
    $scope.title = "this is schoolines app";
    $scope.link = function(){
    	$location.path(IVLEService.getLoginUrl());
    }
}]);
