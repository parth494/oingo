let express = require('express')
let router = express.Router()
let mysql = require("./../../libs/mysql")
let utils = require("./../../libs/utils").utils;
var session;
//let service = require("./../../services/user").router;
module.exports = (express) => {
	let router = express.Router();
	//USER CRUD
	router.post('/', (req, res, next)=>{
				res.locals.userid = req.session.sessId;
				res.locals.username = req.session.username;
				mysql.read("SELECT userid, name from users where email like '" + req.body.email + "' and password like md5('" + req.body.password + "')" , function (error, results, fields) {
				if (!results || results.length == 0) res.redirect("/");
				else{
					let checkTime = (i) => {
						if (i < 10) {
							i = "0" + i;
						}
						return i;
					}

					let startTime = () => {
							var today = new Date();
							var h = today.getHours();
							var m = today.getMinutes();
							var s = today.getSeconds();
							// add a zero in front of numbers<10
							h = checkTime(h);
							m = checkTime(m);
							s = checkTime(s);
							return h + ":" + m + ":" + s;
					}
					 let f =  (date) => {
							var d = new Date(date),
									month = '' + (d.getMonth() + 1),
									day = '' + d.getDate(),
									year = d.getFullYear();

							if (month.length < 2) month = '0' + month;
							if (day.length < 2) day = '0' + day;

							return [year, month, day].join('-');
						}
						var sess = req.session;
						sess.sessId = results[0].userid;
						sess.username = results[0].name;
						sess.current_date = f(new Date());
						sess.current_time = startTime();
						res.redirect("/");
				}
			})
		});
  /*router.post('/', service.create);
  router.put('/:userid', service.update);
  router.delete('/:userid', service.delete);
	*/
  return router;
}
