var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var models = require("../models");

router.post("/create", function(req, res){
    models.Deadline.create(req.body.deadline).then(function(){
        res.send({
            status: "created"
        });
    });
});

module.exports = router;
