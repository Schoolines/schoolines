var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var models = require("../models");

router.post("/createUser", function(req, res){
    models.User.findOne({
        where: {
            matricNumber: req.body.matricNumber
        }
    }).then(function(user){
        var School = models.School;
        if(user == null){
            models.User.create({
                name: req.body.name,
                authToken: req.body.authToken,
                faculty: req.body.faculty,
                email: req.body.email,
                firstMajor: req.body.firstMajor,
                secondMajor: req.body.secondMajor,
                matriculationYear: req.body.matriculationYear,
                gender: req.body.gender,
                exp: 0,
                matricNumber: req.body.matricNumber
                School: {
                    name: req.body.school
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
