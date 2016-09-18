'use strict'

angular.module("schoolines").controller("deadlineDetailController",
["$scope", "$location", "$localStorage", "DeadlineService", "$window",
function($scope, $location, $localStorage, DeadlineService, $window){
    $scope.deadline = DeadlineService.deadlineDetail;

    if(!!$localStorage.hiddenDeadlines && $localStorage.hiddenDeadlines.includes($scope.deadline.id)){
        $scope.isHidden = true;
    }else{
        $scope.isHidden = false;
    }

    $window.ga('send', 'pageview', { page: $location.url() });

    $scope.redirectTo = function(url){
        $location.path(url);
    }

    $scope.hideDeadline = function(id){
        if(!!$localStorage.hiddenDeadlines){
            $localStorage.hiddenDeadlines.push(id);
        }else{
            $localStorage.hiddenDeadlines = [id];
        }

        $location.path('/');
    }


    $scope.unhideDeadline = function(id){
        $localStorage.hiddenDeadlines.splice($localStorage.hiddenDeadlines.indexOf(id), 1);
        $location.path('/');
    }
}])
