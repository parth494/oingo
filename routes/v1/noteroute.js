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
			let scheduleid = utils.getUniqueId();
			let noteid = utils.getUniqueId();
			let query = "INSERT INTO schedules values('"+ scheduleid + "', '"+ req.body.type + "', " + req.body.frequency + ", '" + req.body.repeat + "', '"+  req.body.fromtime +"', '"+ req.body.totime + "', '" + req.body.fromdate + "', '" +
			req.body.todate + "', FROM_UNIXTIME("+ utils.getCurrentTime() +"), FROM_UNIXTIME("+ utils.getCurrentTime()+ "))";
			let query2 = "INSERT INTO notes values('"+ noteid  + "', '" + req.session.sessId + "', '" + req.body.title + "', '" + req.body.description + "', " + req.body.latitude + ", " + req.body.longitude + ", " + req.body.radius
			+ ", '" + scheduleid + "', '" + req.body.visibility + "', " + req.body.allowcomment + ", FROM_UNIXTIME("+  utils.getCurrentTime() +"), FROM_UNIXTIME("+ utils.getCurrentTime()+ "))";
			console.log(query);
			console.log(query2);
			//PUT TAGS TOO
			let _index = 0;
			let tags = req.body.tags;
			let loopArray = (tags) => {
					let proceed = () => {
							_index++;
							if(_index < tags.length){
									loopArray(tags)
							} else {
									res.redirect("/");
							}
					}
					let callback = (err, resp, fieldsAc) => {
							proceed();
					}
					let queryNote = "insert into note_tag values('" + noteid + "','" + tags[_index] +"')";
					console.log(queryNote);
					mysql.insert( queryNote, callback);
			}
			mysql.insert( query, function (error, results, fields) {
						mysql.insert(query2, function(error2, results2, fields2){
								loopArray(tags);
						})
			});
		});
  /*router.post('/', service.create);
  router.put('/:userid', service.update);
  router.delete('/:userid', service.delete);
	*/
  return router;
}
