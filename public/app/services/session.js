"use strict";

angular.module("schoolines").service("Session", function() {
	this.create = function (token) {
		this.token = token;
		this.isLoggedIn = true;
	}

	this.saveModules = function(modules) {
		this.modules = modules;
	}
	this.destroy = function(token) {
		this.token = null;
		this.isLoggedIn = false;
	}
});
