let express = require('express')
let router = express.Router()
let mysql = require("./../../libs/mysql")
let utils = require("./../../libs/utils").utils;

var session;
//let service = require("./../../services/user").router;
module.exports = (express) => {
	let router = express.Router();
	router.get('/', (req, res, next)=>{
			if(!!req.session.sessId && !!req.query.filterid)
			{
					let filterid = req.query.filterid;
					let query = "delete from filters where filterid like " + mysql.escape(req.query.filterid);
					console.log(query);
					mysql.read( query, function (error, results, fields) {
							console.log(error);
							res.redirect('/');
					});
			} else if(!!req.session.sessId){
					res.locals.userid = req.session.sessId;
					res.locals.username = req.session.username;
					let query = "select * from filters, schedules where userid = '" + req.session.sessId + "' AND filters.scheduleid = schedules.scheduleid";
					mysql.read( query, function (error, results, fields) {
							res.locals.filters = results;
							res.render('myfilters');
					});
			} else {
				res.render("login");
			}

	})
  /*router.post('/', service.create);
  router.put('/:userid', service.update);
  router.delete('/:userid', service.delete);
	*/
  return router;
}
