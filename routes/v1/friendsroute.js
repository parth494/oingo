let express = require('express')
let router = express.Router()
let mysql = require("./../../libs/mysql");
let utils = require("./../../libs/utils").utils;
var session;
//let service = require("./../../services/user").router;
module.exports = (express) => {
	let router = express.Router();
	//USER CRUD
	router.get('/', (req, res, next)=>{
			let quer = "SELECT userid, name from users where userid in (select f1.user2 from friends f1 inner join friends f2 on f1.user1 = f2.user2 and f1.user2 = f2.user1 and f1.user1 = '"+req.session.sessId+"')";
			let quer2 = "select userid, name from users where userid in ( select f.user1 from friends f where f.user2 = '" + req.session.sessId + "' AND f.user1 NOT IN( select f1.user2 from friends f1 inner join friends f2 on f1.user1 = f2.user2 and f1.user2 = f2.user1 AND f1.user1='"+req.session.sessId+"'))"
			let querC = "SELECT userid from users where userid in (select f1.user2 from friends f1 inner join friends f2 on f1.user1 = f2.user2 and f1.user2 = f2.user1 and f1.user1 = '"+req.session.sessId+"')";
			let quer2C = "select userid from users where userid in ( select f.user2 from friends f where f.user1 = '" + req.session.sessId + "' AND f.user2 NOT IN( select f1.user2 from friends f1 inner join friends f2 on f1.user1 = f2.user2 and f1.user2 = f2.user1 AND f1.user1='"+req.session.sessId+"'))"
			let quer2D = "select userid from users where userid in ( select f.user1 from friends f where f.user2 = '" + req.session.sessId + "' AND f.user1 NOT IN( select f1.user2 from friends f1 inner join friends f2 on f1.user1 = f2.user2 and f1.user2 = f2.user1 AND f1.user1='"+req.session.sessId+"'))"
			let quer3 = "SELECT userid, name from users where userid not in ("+querC+") and userid not in ("+quer2C+") and userid not in ("+quer2D+") and userid <> '" + req.session.sessId + "'";
			let cb3 = function (error, results, fields) {
					console.log(results);
					res.locals.users = results;
					res.render("friends");
			};
			let cb2 = function (error, results, fields) {
					console.log(results);
					res.locals.pending = results;
					console.log(quer3);
					mysql.read(quer3 , cb3)
			};
			let cb1 = function (error, results, fields) {
					console.log(results);
					res.locals.friends = results;
					mysql.read(quer2 , cb2)
			};
			if(!!req.session.sessId){
					res.locals.userid = req.session.sessId;
					res.locals.username = req.session.username;
					mysql.read(quer , cb1)
			}else {
				res.render("login");
			}
		});
	router.get('/accept', (req, res, next)=>{
			if(!!req.session.sessId){
				res.locals.userid = req.session.sessId;
				res.locals.username = req.session.username;
				let query = "INSERT INTO friends VALUES('" + utils.getUniqueId() + "', '" + req.session.sessId + "', '" + req.query.userid + "', FROM_UNIXTIME("+ utils.getCurrentTime()+ "))";
				console.log(query);
				mysql.read( query, function (error, results, fields) {
						res.redirect("/");
				})
			}else {
				res.render("login");
			}
		});
  /*router.post('/', service.create);
  router.put('/:userid', service.update);
  router.delete('/:userid', service.delete);
	*/
  return router;
}
