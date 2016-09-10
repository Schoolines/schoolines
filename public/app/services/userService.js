'use strict'

angular.module("schoolines").factory("UserService", function($http, $location){
    var userService = {};

    userService.createUser = function(user){
        var postParam = user;
        return $http.post("/userManagement/createUser", postParam).then(function(res){
            return res.data;
        });
    }
})
