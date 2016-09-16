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
            },
            include: [models.User]
        }),
    ]).spread(function(allDeadlines) {
        var deadlineArray = [];
        var convertDate = function(date){
            var d = new Date(date);
            var formattedDate =  d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()
             + " " +d.getHours() + ":" + d.getMinutes();

             if(d.getMinutes() < 10) formattedDate += "0";

             return formattedDate;
        }
        for (var deadline of allDeadlines) {
            deadlineArray.push({
                id: deadline.id,
                title: deadline.title,
                des: deadline.description,
                module: deadline.module,
                date: convertDate(deadline.due),
                contributor: deadline.User.name
            });
        }
		res.send({
			deadlineArray: JSON.stringify(deadlineArray)
		});
	});
});

module.exports = router;
