var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var models = require("../models");

router.post("/create", function(req, res){
    models.Deadline.create(req.body.deadline).then(function(){
        res.sendStatus(201);
    });
});

/* Get Deadlines given a list of module codes */
router.get("/getDeadlines", function(req, res) {
	var modules = [];
	for (i in req.query) {
		modules.push(req.query[i]);
	}

	models.sequelize.Promise.all([
        models.Deadline.findAll({
            where: {
                module: modules,
            }
        }),
    ]).spread(function(allDeadlines) {
        var deadlineArray = [];
        for (var deadline of allDeadlines) {
            deadlineArray.push({
                title: deadline.Deadline.title,
                description: deadline.Deadline.description,
                module: deadline.Deadline.module,
                due: deadline.Deadline.title
            });
        }

		res.send({
			deadlineArray: JSON.stringify(deadlineArray)
		});
	});
});

module.exports = router;
