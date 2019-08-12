let express = require('express')
let router = express.Router()
let mysql = require("./../../libs/mysql")
var session;
//let service = require("./../../services/user").router;
module.exports = (express) => {
	let router = express.Router();
	//USER CRUD


	router.get('/', (req, res, next)=>{
			console.log(req.query);
			if(!!req.session.sessId){
					res.locals.userid = req.session.sessId;
					res.locals.username = req.session.username;
					mysql.read("SELECT n.allowcomment, n.created_at, n.latitude, n.longitude, n.noteid, n.title, n.description, u.name from users u, notes n where n.noteid like " + mysql.escape(req.query.noteid) + " and n.userid=u.userid " , function (error, results, fields) {
						console.log(error);
						res.locals.note = results[0];
						console.log(results[0]);
						res.locals.note.created_at = new Date(res.locals.note.created_at);
						let q = "SELECT c.description, u.name from comments c, users u where u.userid = c.userid AND noteid='" + req.query.noteid + "' order by c.created_at DESC";
						console.log(q);
						mysql.read(q,
								function (error1, results1, fields1) {
									console.log(results1);
									if(!!results1)
										res.locals.comments = results1;
									else
										res.locals.comments = [];

									let q2 = "SELECT noteid,GROUP_CONCAT(tags.tagname) as hashtags FROM note_tag, tags where tags.tagid = note_tag.tagid AND noteid='" + req.query.noteid + "' GROUP BY noteid"
									console.log(q2);
									mysql.read(q2,
											function (error2, results2, fields2) {
												console.log(results2);
												if(!!results2)
													res.locals.hashtags = results2[0].hashtags;
												else
													res.locals.hashtags = [];

												//res.locals.hashtags = results2[0].;
												res.render("note");
									});
									//res.render("note");
						});
					})
		} else{
				res.render("login");
		}
		});
  /*router.post('/', service.create);
  router.put('/:userid', service.update);
  router.delete('/:userid', service.delete);
	*/
  return router;
}
