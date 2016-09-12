"use strict"

angular.module("schoolines").controller("indexController", ["$scope", "$location", "$routeParams", "$window", "IVLEService", "DeadlineService", "Session", 
	function($scope, $location, $routeParams, $window, IVLEService, DeadlineService, Session) {
    $scope.title = "this is schoolines app";
    $scope.link = function(){
    	$window.location.href = IVLEService.getLoginUrl();
    }

    // Save token to session
    if ($routeParams.token) {
    	$location.url('/');
    	Session.create($routeParams.token);
    	IVLEService.createUser(Session.token);
    	IVLEService.getModules(Session.token);
        DeadlineService.getDeadline();
    }
    
    // Create a new user

}]);
