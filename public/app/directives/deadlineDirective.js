'use strict';
angular.module("schoolines").directive('deadline', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/directives/deadline.html',
		controller: 'deadlineCtrl'
	}
});
