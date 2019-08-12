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
					console.log(results);
					res.locals.states = results;
					res.render('parameters');
			});
		} else {
				res.redirect("/");
		}
	})
	router.post('/', (req, res, next)=>{
			console.log(req.body);
			var sess = req.session;
			let query = "update users set ";
			if(!!req.body.state)
				query+= "current_state='"+ req.body.state + "' ";
			if(!!req.body.latitude)
				query+= ", latitude="+ req.body.latitude ;
			if(!!req.body.longitude)
				query+= ", longitude="+ req.body.longitude;
			if(!!req.body.date)
				sess.current_date = req.body.date;
			if(!!req.body.time)
				sess.current_time = req.body.time;
			query += " where userid='" + req.session.sessId + "'";
			mysql.insert( query, function (error, results, fields) {
						if(!!req.body.latitude && !!req.body.longitude){
								let query2 = "insert into user_location values('" + req.session.sessId + "',FROM_UNIXTIME("+ utils.getCurrentTime()+ ")," + req.body.latitude + "," + req.body.longitude + ")";
								console.log(query2);
								mysql.insert( query2, function (error2, results2, fields2) {
										res.redirect("/");
								});
						} else {
								res.redirect("/");
						}
			});
		});
  /*router.post('/', service.create);
  router.put('/:userid', service.update);
  router.delete('/:userid', service.delete);
	*/
  return router;
}
