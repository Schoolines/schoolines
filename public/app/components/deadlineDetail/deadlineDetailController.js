'use strict'

angular.module("schoolines").controller("deadlineDetailController",
["$scope", "$location", "DeadlineService", "$window",
function($scope, $location, DeadlineService, $window){
    $scope.deadline = DeadlineService.deadlineDetail;
    $window.ga('send', 'pageview', { page: $location.url() });

    $scope.redirectTo = function(url){
        $location.path(url);
    }
}])
