'use strict'

angular.module("schoolines").factory("DeadlineService", function($http, $location, UserService){
    var deadlineService = {};

    deadlineService.create = function(deadline){
        // deadline["contributorId"] = Session.userId;
        var postParam = {
            deadline: deadline
        }

        return $http.post("/deadlineManagement/create", postParam).then(function(res){
            return res;
        });
    }

    return deadlineService;
})
