'use strict';

var app = angular.module('mainApp', ['ui.router', 'ngMaterial'])
.config(function ($urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.when('','/');
    
    // Returns to landing page if user types an undefined url
	$urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('default').primaryPalette('red');
	$mdThemingProvider.enableBrowserColor({
      theme: 'default', // Default is 'default'
      palette: 'red', // Default is 'primary', any basic material palette and extended palettes are available
      hue: '200' // Default is '800'
    });
    
})
