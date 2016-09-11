"use strict"

var schoolines = angular.module("schoolines", [
    "ngRoute", "ngCookies", "ngResource"
]);

schoolines.config(["$routeProvider", "$locationProvider",
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when("/", {
            templateUrl: "/app/components/index/index.html",
            controller: "indexController",
            resolve: {
                isAuthenticated: function(AuthService) {
                    return AuthService.isAuthenticated();
                }
            }
        }).
        when("/deadlineCreate", {
            templateUrl: "/app/components/deadlineCreate/deadlineCreate.html",
            controller: "deadlineCreateController",
        }).
        otherwise({
            redirectTo: "/"
        });
    }
]);

schoolines.run();
