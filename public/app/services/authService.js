"use strict";

angular.module("schoolines").factory("AuthService", function($http, $location){
    var authService = {};

    authService.autologin = function(){

    };

    authService.isAuthenticated = function(){
        // check if logged in

        return true;
    }

    return authService;
});
