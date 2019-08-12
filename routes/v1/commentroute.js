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
				let query = "select * from tags";
				mysql.read( query, function (error, results, fields) {
							res.locals.tags = results;
							res.render('createnote');
				});
			}
			else{
					res.render("login");
			}
	})
	router.post('/', (req, res, next)=>{
			console.log(req.body);
			let commentid = utils.getUniqueId();
			let query2 = "INSERT INTO comments values('"+ commentid  + "', '" + req.body.noteid + "', '" + req.session.sessId + "', '" + req.body.comment + "', FROM_UNIXTIME("+  utils.getCurrentTime() +"), FROM_UNIXTIME("+ utils.getCurrentTime()+ "))";
			console.log(query2);
			let callback = (err, resp, fieldsAc) => {
					res.redirect("/");
			}
			mysql.insert( query2, callback);
		});
  /*router.post('/', service.create);
  router.put('/:userid', service.update);
  router.delete('/:userid', service.delete);
	*/
  return router;
}
