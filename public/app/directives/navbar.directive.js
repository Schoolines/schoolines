'use strict';

app.directive('navbar', function() {
	return {
		restrict: 'E',
		templateUrl: '/browser/navbar/navbar.html',
		controller: 'NavbarCtrl'
	}
});