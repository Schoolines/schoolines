"use strict"

var schoolines = angular.module("schoolines", [
    "ngRoute","ngMaterial", "ngCookies", "ngResource", "ngStorage" , "ngMaterialDatePicker"
]);

schoolines.config(["$routeProvider", "$locationProvider", "$mdThemingProvider",
    function($routeProvider, $locationProvider, $mdThemingProvider) {
        $routeProvider.
        when("/", {
            templateUrl: "/app/components/index/index.html",
            controller: "indexController",
            resolve: {
                isAuthenticated: function(AuthService) {
                    // return AuthService.isAuthenticated();
                }
            }
        }).
        when("/deadlineCreate", {
            templateUrl: "/app/components/deadlineCreate/deadlineCreate.html",
            controller: "deadlineCreateController",
        }).
        when("/deadlineDetail",{
            templateUrl: "/app/components/deadlineDetail/deadlineDetail.html",
            controller: "deadlineDetailController"
        }).
        when("/splash", {
            templateUrl: "/app/components/splashScreen/splashScreen.html",
            controller: "splashScreenController"
        }).
        otherwise({
            redirectTo: "/"
        });

        $mdThemingProvider.theme('default').primaryPalette('blue-grey');
    	$mdThemingProvider.enableBrowserColor({
          theme: 'default', // Default is 'default'
          palette: 'red', // Default is 'primary', any basic material palette and extended palettes are available
          hue: '200' // Default is '800'
        });
    }
]);

schoolines.run();
