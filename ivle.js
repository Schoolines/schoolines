const querystring = require('querystring');

// IVLE API Key : Should store in config file
const ivle_api_key = "UY5RaT4yK3lgWflM47CJo";

module.exports = {
	loginUrl: function (req) {
		var loginLink = "https://ivle.nus.edu.sg/api/login/?";
		var urlPath = req.protocol + '://' + req.get('host') + req.originalUrl;
		var args = querystring.stringify({apikey: ivle_api_key, url: urlPath});
		return loginLink + urlPath + args;
	}
};