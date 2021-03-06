var express = require('express');
var querystring = require('querystring');
var request = require('request');
var router = express.Router();
var sequelize = require('sequelize');
var models = require("../models");

var ivle_api_key = "UY5RaT4yK3lgWflM47CJo";

/* Get user data */
router.post("/createUser", function(req, res, next) {
    var profileLink = "https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?";
    var args = querystring.stringify({
        APIKey: ivle_api_key,
        AuthToken: req.body.token
    });
    request(profileLink + args, function(error, response, body) {

        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body).Results[0];
            console.log('JSONHERE', json_data);
            json_data.AuthToken = req.body.token;
            // Temporary cos we no school data
            json_data.School = 'National University of Singapore';

            models.User.findOne({
                where: {
                    matricNumber: json_data.UserID
                }
            }).then(function(user) {
                var School = models.School;
                if (user == null) {
                    models.User.create({
                        name: json_data.Name,
                        authToken: json_data.AuthToken,
                        faculty: json_data.Faculty,
                        email: json_data.Email,
                        firstMajor: json_data.FirstMajor,
                        secondMajor: json_data.SecondMajor,
                        matriculationYear: json_data.MatriculationYear,
                        gender: json_data.Gender == "Male",
                        exp: 0,
                        matricNumber: json_data.UserID,
                        //     // School: {
                        //     //     name: json_data.School
                        //     // }
                        // }, {
                        //     include: [models.School]
                    }).then(function(result) {
                        res.status(201).send({
                            status: "success",
                            userId: result.id
                        });
                    });


                } else {
                    models.User.update({
                        authToken: json_data.AuthToken
                    }, {
                        where: {
                            id: user.id
                        }
                    }).then(function() {
                        console.log("user already exists");
                        res.status(201).send({
                            status: "exist",
                            userId: user.id
                        })
                    });

                }
            });

        } else {
            res.status(400).send({
                status: "failed"
            })
        }
    });
});


/* Get modules */
router.post("/getModules", function(req, res, next) {
    var moduleLink = "https://ivle.nus.edu.sg/api/Lapi.svc/Modules?";
    var args = querystring.stringify({
        APIKey: ivle_api_key,
        AuthToken: req.body.token
    });
    request(moduleLink + args, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_data = JSON.parse(body).Results;
            var module_codes = [];
            for (i = 0; i < json_data.length; i++) {
                module_codes.push(json_data[i].CourseCode);
            }

            res.status(200).send({
                modulesCodes: module_codes,
                status: "success"
            });
        } else {
            res.status(400).send({
                status: "failed"
            });
        }
    });
});

module.exports = router;
