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
			let query = "select * from states";
			mysql.read( query, function (error, results, fields) {
					console.log(results);
					res.locals.states = results;
					res.render('register');
			});
	})
	router.post('/', (req, res, next)=>{
			console.log(req.body);
			let query = "INSERT INTO users values('"+ utils.getUniqueId() + "', '" + req.body.name + "', '" + req.body.email + "', md5('" + req.body.password + "'), '" + req.body.state + "', NULL, NULL, FROM_UNIXTIME("+  utils.getCurrentTime() +"), FROM_UNIXTIME("+ utils.getCurrentTime()+ "))";
			console.log(query);
			mysql.insert( query, function (error, results, fields) {
						res.redirect("/");
			});
		});
  /*router.post('/', service.create);
  router.put('/:userid', service.update);
  router.delete('/:userid', service.delete);
	*/
  return router;
}
