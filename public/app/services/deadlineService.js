'use strict';

angular.module("schoolines").factory("DeadlineService", function($http, $httpParamSerializer, $location, $localStorage, Session) {
    var deadlineService = {};


    deadlineService.create = function(deadline) {
        deadline["userId"] = Session.userId;
        deadline["token"] = Session.token;
        var postParam = {
            deadline: deadline
        }

        return $http.post("/deadlineManagement/create", postParam).then(function(res) {
            return res.status;
        });
    }

    /* Get Deadline */
    deadlineService.getDeadline = function() {
        var moduleCodes = $localStorage.modules;
        if (moduleCodes) {
            return $http.get('/deadlineManagement/getDeadlines?' + $httpParamSerializer(moduleCodes)).then(
                function successCallback(response) {
                    $localStorage.deadlines = response.data;
                },
                function errorCallback(response) {
                    console.log("Encountered Error: ", response.statusText);
                });
        } else {
            console.log("No module codes in localStorage");
        }
    }

    deadlineService.deleteDeadline = function(id) {
        var postParam = {
            token: Session.token,
            id: id
        }
        return $http.post('/deadlineManagement/delete', postParam).then(function(res) {
            return res.data;
        });
    }

    return deadlineService;
})
