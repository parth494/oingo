let express = require('express')
let router = express.Router()
let mysql = require("./../../libs/mysql")
let utils = require("./../../libs/utils").utils;

var session;
//let service = require("./../../services/user").router;
module.exports = (express) => {
	let router = express.Router();
	//USER CRUD
	router.get('/', (req, res, next)=>{
			if(!!req.session.sessId){
					res.locals.userid = req.session.sessId;
					res.locals.username = req.session.username;
					let query = "select * from states";
					mysql.read( query, function (error, results, fields) {
							res.locals.states = results;
							query = "select * from tags";
							mysql.read( query, function (error2, results2, fields2) {
									res.locals.tags = results2;
									res.render('createfilter');
							});
					});
			}else {
				res.render("login");
			}

	})
	router.get('/me', (req, res, next)=>{
			if(!!req.session.sessId){
					res.locals.userid = req.session.sessId;
					res.locals.username = req.session.username;
					let query = "select * from filters where userid = '" + req.session.sessId + "'";
					mysql.read( query, function (error, results, fields) {
							res.locals.filters = results;
							res.render('myfilters');
					});
			}else {
				res.render("login");
			}

	})
	router.post('/', (req, res, next)=>{
				console.log(req.body);
				let scheduleid = "'" + utils.getUniqueId() + "'";
				let insert_schedule = true;
				if(!req.body.type || !req.body.frequency || !req.body.fromdate || !req.body.todate)
					insert_schedule = false;
				let query = "INSERT INTO schedules values("+ scheduleid + ", '"+ req.body.type + "', " + req.body.frequency + ", '" + req.body.repeat + "', '"+  req.body.fromtime +"', '"+ req.body.totime + "', '" + req.body.fromdate + "', '" +
				req.body.todate + "', FROM_UNIXTIME("+ utils.getCurrentTime() +"), FROM_UNIXTIME("+ utils.getCurrentTime()+ "))";
				if(!insert_schedule)
					scheduleid = null;
				let visibility = req.body.visibility;
				if(!visibility)
					visibility = null;
				else {
					visibility = "'" + visibility + "'";
				}
				let latitude = req.body.latitude;
				let longitude = req.body.longitude;
				let radius = req.body.radius;
				if(!latitude || !longitude || !radius){
						latitude = null;
						longitude = null;
						radius = null;
				}
				let tag = req.body.tag;
				if(!tag)
					tag = null;
				else {
					tag = "'" + tag + "'";
				}
				let query2 = "INSERT INTO filters values('"+ utils.getUniqueId() + "', '" + req.session.sessId + "', '" + req.body.state + "', " + visibility + ", " + latitude + ", " + longitude + ", " + radius
				+ ", " + scheduleid + ", " + tag + ", FROM_UNIXTIME("+  utils.getCurrentTime() +"), FROM_UNIXTIME("+ utils.getCurrentTime()+ "))";
				console.log(query);
				console.log(query2);
				//PUT TAGS TOO
				if(!!insert_schedule){
					mysql.insert( query, function (error, results, fields) {
								mysql.insert(query2, function(error2, results2, fields2){
										res.redirect("/");
								})
					});
				} else {
						mysql.insert(query2, function(error2, results2, fields2){
								res.redirect("/");
						})
				}

		});
  /*router.post('/', service.create);
  router.put('/:userid', service.update);
  router.delete('/:userid', service.delete);
	*/
  return router;
}
