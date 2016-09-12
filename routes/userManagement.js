var express = require('express');
var querystring = require('querystring');
var request = require('request');
var router = express.Router();
var sequelize = require('sequelize');
var models = require("../models");

/* Function to get user data */
router.post("/createUser", function(req, res){
    var token = req.body.token;
    var profileLink = "https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?";
    var args = querystring.stringify({APIKey: ivle_api_key, AuthToken: token});
    request(profileLink + args, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body).Results[0];
            json_data.AuthToken = token;

            // Temporary cos we no school data
            json_data.School = 'National University of Singapore';

            // Can send directly to create new user
            request.post('/userManagement/createUserDB').form(json_data);
        } else {
            throw error;
        }
    });
});

/* Function to get modules */
function getUserModules(token) {
    var profileLink = "https://ivle.nus.edu.sg/api/Lapi.svc/Modules?";
    var args = querystring.stringify({APIKey: ivle_api_key, AuthToken: token});
    request(profileLink + args, function(error, response, body) {
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

router.post("/createUserDB", function(req, res){
    models.User.findOne({
        where: {
            matricNumber: req.body.matricNumber
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
                gender: req.body.Gender,
                exp: 0,
                matricNumber: req.body.UserID,
                School: {
                    name: req.body.School
                }
            }, {
                include: [models.School]
            }).then(function(){
                res.send({
                    status: "created"
                });
            });


        }else{
            console.log("user already exists");
            res.send({
                status: "exist"
            })
        }
    });
});

module.exports = router;
