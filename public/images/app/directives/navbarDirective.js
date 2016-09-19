'use strict';

angular.module("schoolines").directive('navbar', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/directives/navbar.html',
		controller: ["$location", "$scope", function($location, $scope){

		}]
	}
});
