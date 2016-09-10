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