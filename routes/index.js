var express = require('express');
var https = require('https');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("layout");
});

// START IVLE //
const querystring = require('querystring');

// IVLE API Key : Should store in config file
const ivle_api_key = "UY5RaT4yK3lgWflM47CJo";

/* Login Function */
function loginUrl(req) {
	var loginLink = "https://ivle.nus.edu.sg/api/login/?";
	var urlPath = req.protocol + '://' + req.get('host') + req.originalUrl;
	var args = querystring.stringify({apikey: ivle_api_key, url: urlPath});
	return loginLink + args;
}

/* Function to get user data */
function getUserInfo(token, req) {
	var profileLink = "https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?";
	var args = querystring.stringify({APIKey: ivle_api_key, AuthToken: token});
	request(profileLink + args,	function(error, response, body) {
			if (!error && response.statusCode == 200) {
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

/* Function to get modules */
function getUserModules(token) {
	var profileLink = "https://ivle.nus.edu.sg/api/Lapi.svc/Modules?";
	var args = querystring.stringify({APIKey: ivle_api_key, AuthToken: token});
	request(profileLink + args,	function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var json_data = JSON.parse(body).Results;

				// Can send directly to create new user
				// request.post(req.protocol + '://' + req.get('host') + '/api/createUser').form(json_data);
				var module_codes = [];
				for (i = 0; i < json_data.length; i++) {
					module_codes.push(json_data[i].CourseCode);
				}
				
				console.log(module_codes);
			} else {
				throw error;
			}
	 	});	
}

/* GET login page. */
router.get('/login', function(req, res, next) {
	var fullUrl = loginUrl(req);
	var token = req.query.token;

	// getUserInfo(token, req);
	getUserModules(token);

	res.render("login", {path: fullUrl});
});
// END IVLE //

module.exports = router;
