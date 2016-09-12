"use strict"

angular.module("schoolines").controller("indexController", ["$scope", "$location", "$routeParams", "$window", "IVLEService", "Session", 
	function($scope, $location, $routeParams, $window, IVLEService, Session) {
    $scope.title = "this is schoolines app";
    $scope.link = function(){
    	console.log("haha");
    	$window.location.href = IVLEService.getLoginUrl();
    }

    // Save token to session
    if ($routeParams.token) {
    	Session.create($routeParams.token);
    	IVLEService.getUserInfo(Session.token);
    }

    // Create a new user

}]);
