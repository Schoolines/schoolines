var express = require('express');
var https = require('https');
var request = require('request');
var router = express.Router();

// IVLE API Key : Should store in config file
const ivle_api_key = "UY5RaT4yK3lgWflM47CJo";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("layout");
});

/* GET login page. */
router.get('/login', function(req, res, next) {
	var fullUrl = req.protocol + '://' + req.get('host') + '/home';
	res.render("login", {api_key: ivle_api_key, path: fullUrl});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
	var token = req.query.token
	getUserInfo(token, req);
	res.render("home");
});

/* Function to get user data */
function getUserInfo(token, req) {
	request('https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?APIKey=' +
		ivle_api_key + '&AuthToken=' + token, 
		function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var json_data = JSON.parse(body).Results[0];
				json_data.AuthToken = token;
				json_data.School = 'National University of Singapore'; // 
				request.post(req.protocol + '://' + req.get('host') + '/api/createUser').form(json_data);
				console.log(json_data);
			} else {
				throw error;
			}
	 	});
};

module.exports = router;
