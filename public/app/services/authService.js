"use strict";

angular.module("schoolines").factory("AuthService", function($http, $location, $cookies, Session){
    var authService = {};

    authService.autologin = function(){
        if(Session.token != null && $cookies.get("token") != null){
            $location.path('/');

        }else{

        }
    };

    authService.login = function(token){
		Session.create(token);
        $cookies.put(token, token);
    };
    return authService;
});
