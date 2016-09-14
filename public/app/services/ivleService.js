"use strict";

angular.module("schoolines").factory("IVLEService", function($http, $location, $httpParamSerializer, Session){
    var ivleService = {};
    const ivle_api_key = "UY5RaT4yK3lgWflM47CJo";

    /* Login Function */
    ivleService.getLoginUrl = function() {
    	var loginLink = "https://ivle.nus.edu.sg/api/login/?";
    	var urlPath = $location.absUrl();
    	var params = $httpParamSerializer({apikey: ivle_api_key, url: urlPath});

    	return loginLink + params;
    }

    /* Create User */
    ivleService.createUser = function(token) {
        return $http.post('/userManagement/createUser', {token: token}).then(function(res){
            return res.data;
        });
    }

    /* Get Modules */
    ivleService.getModules = function(token) {
        return $http.post('/userManagement/getModules', {token: token}).then(
            function successCallback(response) {
                return Session.saveModules(response.data);
            }, function errorCallback(response) {
                console.log("Encountered Error: ", response.statusText);
            });
    }

    return ivleService;
});
