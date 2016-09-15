"use strict";

angular.module("schoolines").factory("AuthService", function($http, $location, $cookies, IVLEService, Session, $window, $q, $routeParams, $localStorage){
    var authService = {};

    authService.autologin = function(){
        if($cookies.get("token")){
            Session.create($cookies.get("token"));
            Session.userId = $cookies.get("userId");

            $localStorage.token = $cookies.get("token");
            $localStorage.userId = $cookies.get("userId");
            return $q.resolve();
        }else if($routeParams.token){
            this.login($routeParams.token);
            return $q.resolve();
        }else{
            //$window.location.href = IVLEService.getLoginUrl();
        }
    };

    authService.login = function(token){
        Session.create(token);
        IVLEService.createUser(Session.token).then(function(){
            var userId = Session.userId;


            $cookies.put("token", token);
            Session.isLoggedIn = true;
            $localStorage.token = token;

            $location.url('/');
        });

    };
    return authService;
});
