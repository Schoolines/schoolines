var express = require('express');
var querystring = require('querystring');
var request = require('request');
var router = express.Router();
var sequelize = require('sequelize');
var models = require("../models");

var ivle_api_key = "UY5RaT4yK3lgWflM47CJo";

/* Get user data */
router.post("/createUser", function(req, res, next){
    var profileLink = "https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?";
    var args = querystring.stringify({APIKey: ivle_api_key, AuthToken: req.body.token});
    request(profileLink + args, function(error, response, body) {

        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body).Results[0];
            json_data.AuthToken = req.body.token;
            // Temporary cos we no school data
            json_data.School = 'National University of Singapore';

            var createUserUrl = req.protocol + '://' + req.get('host') + '/userManagement/createUserDB';
            // Can send directly to create new user
            request.post({url: createUserUrl, form: json_data},
                function(err, httpResponse, body){
                    res.sendStatus(200);
                });

        } else {
            console.log("ERROR HERE");
            next(error);
        }
    });
});


/* Get modules */
router.post("/getModules", function(req, res, next) {
    var moduleLink = "https://ivle.nus.edu.sg/api/Lapi.svc/Modules?";
    var args = querystring.stringify({APIKey: ivle_api_key, AuthToken: req.body.token});
    request(moduleLink + args, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body).Results;
            var module_codes = [];
            for (i = 0; i < json_data.length; i++) {
                module_codes.push(json_data[i].CourseCode);
            }

            res.status(200).send(JSON.stringify(module_codes));
        } else {
            next(error);
        }
    });
});

router.post("/createUserDB", function(req, res){
    models.User.findOne({
        where: {
            matricNumber: req.body.UserID
        }
    }).then(function(user){
        var School = models.School;
        if(user == null){
            models.User.create({
                name: req.body.Name,
                authToken: req.body.AuthToken,
                faculty: req.body.Faculty,
                email: req.body.Email,
                firstMajor: req.body.FirstMajor,
                secondMajor: req.body.SecondMajor,
                matriculationYear: req.body.MatriculationYear,
                gender: req.body.Gender == "Male",
                exp: 0,
                matricNumber: req.body.UserID,
            //     // School: {
            //     //     name: req.body.School
            //     // }
            // }, {
            //     include: [models.School]
            }).then(function(){
                res.sendStatus(201);
            });


        }else{
            console.log("user already exists");
            res.status(201).send({
                status: "exist"
            })
        }
    });
});

module.exports = router;
