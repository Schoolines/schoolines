"use strict";

angular.module("schoolines").factory("IVLEService", function($http, $location, $httpParamSerializer){
    var ivleService = {};

    /* Login Function */
    ivleService.getLoginUrl = function() {
    	var loginLink = "https://ivle.nus.edu.sg/api/login/?";

    	var ivle_api_key = "UY5RaT4yK3lgWflM47CJo";
    	var urlPath = $location.absUrl();
    	var params = $httpParamSerializer({apikey: ivle_api_key, url: urlPath});

    	return loginLink + params;
    }

    return ivleService;
});
