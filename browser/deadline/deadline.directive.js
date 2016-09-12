'use strict';
app.directive('deadline', function() {
	return {
		restrict: 'E',
		templateUrl: '../browser/deadline/deadline.html',
		controller: 'deadlineCtrl'
	}
});