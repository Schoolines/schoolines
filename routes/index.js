var express = require('express');
var https = require('https');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("layout");
});

module.exports = router;
