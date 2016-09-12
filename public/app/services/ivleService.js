"use strict";

angular.module("schoolines").factory("IVLEService", function($http, $location, $httpParamSerializer){
    var ivleService = {};
    const ivle_api_key = "UY5RaT4yK3lgWflM47CJo";

    /* Login Function */
    ivleService.getLoginUrl = function() {
    	var loginLink = "https://ivle.nus.edu.sg/api/login/?";
    	var urlPath = $location.absUrl();
    	var params = $httpParamSerializer({apikey: ivle_api_key, url: urlPath});

    	return loginLink + params;
    }

    /* Get User Profile Data */
    ivleService.getUserInfo = function(token) {
        var profileLink = "https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?";
        var params = $httpParamSerializer({APIKey: ivle_api_key, AuthToken: token});
        $http.get(profileLink + params).then(function(response) {
            console.log(response);
            if (response.statusCode == 200) {
                var json_data = JSON.parse(body).Results[0];
                json_data.AuthToken = token;

                // Temporary cos we no school data
                json_data.School = 'National University of Singapore'; 

                // Can send directly to create new user
                // request.post(req.protocol + '://' + req.get('host') + '/api/createUser').form(json_data);
                console.log(json_data);
            } else {
                throw error;
            }
        });
    };

    // /* Function to get modules */
    // ivleService.getUserModules = function(token) {
    //     var profileLink = "https://ivle.nus.edu.sg/api/Lapi.svc/Modules?";
    //     var args = querystring.stringify({APIKey: ivle_api_key, AuthToken: token});
    //     request(profileLink + args, function(error, response, body) {
    //             if (!error && response.statusCode == 200) {
    //                 var json_data = JSON.parse(body).Results;

    //                 // Can send directly to create new user
    //                 // request.post(req.protocol + '://' + req.get('host') + '/api/createUser').form(json_data);
    //                 var module_codes = [];
    //                 for (i = 0; i < json_data.length; i++) {
    //                     module_codes.push(json_data[i].CourseCode);
    //                 }
                    
    //                 console.log(module_codes);
    //             } else {
    //                 throw error;
    //             }
    //         }); 
    // }

    return ivleService;
});
