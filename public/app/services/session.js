"use strict";

angular.module("schoolines").service("Session", function() {
	this.create = function (token) {
		this.token = token;
	}

	this.destroy = function(token) {
		this.token = null;
	}
});

