'use strict'

angular.module("schoolines").controller("deadlineDetailController",
["$scope", "$location", "DeadlineService",
function($scope, $location, DeadlineService){
    $scope.deadline = DeadlineService.deadlineDetail;
}])
