'use strict'

angular.module("schoolines").controller("deadlineDetailController",
["$scope", "$location", "DeadlineService",
function($scope, $location, DeadlineService){
    $scope.deadline = DeadlineService.deadlineDetail;

    $scope.redirectTo = function(url){
        $location.path(url);
    }
}])
