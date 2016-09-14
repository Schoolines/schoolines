"use strict";

angular.module("schoolines").factory("AuthService", function($http, $location, $cookies, IVLEService, Session, $window, $q){
    var authService = {};

    authService.autologin = function(){
        if(!!$cookies.get("token")){
            Session.create($cookies.get("token"));
            Session.userId = $cookies.get("userId");
            return $q.resolve();
        }else{
            $window.location.href = IVLEService.getLoginUrl();
        }
    };

    authService.login = function(token){
		Session.create(token);
        $cookies.put("token", token);
        Session.isLoggedIn = true;
    };
    return authService;
});
