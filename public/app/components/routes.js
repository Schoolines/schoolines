'use strict';

angular.config(function($stateProvider){

	$stateProvider.state('deadline', {
		url: '/',
		templateUrl: '/deadlineList/deadline.html',
		controller: 'deadlineCtrl'
	});
	
	$stateProvider.state('addDeadline', {
		url: '/create',
		templateUrl: '/deadlineCreate/deadlineCreate.html',
		controller: 'addCtrl'
	});
});
