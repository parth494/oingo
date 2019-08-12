module.exports = (express) => {
	let versionRouter = express.Router();
	let mysql = require("./../libs/mysql")
	//let userRoutes = require('./v1/userroute.js')(express);
	//versionRouter.use('/user', userRoutes);
	versionRouter.get('/home', function(req, res) {
			res.redirect("/");
	});
	versionRouter.get('/home-map', function(req, res) {
			if(!!req.session.sessId){
					res.locals.userid = req.session.sessId;
					res.locals.username = req.session.username;

					let query_for_home = "select distinct nex.noteid, nex.title, nex.description from " +
					"(select distinct f.userid, f.visibility, f.tagid from users u, states s, filters f, schedules sc where u.userid ='" +
					req.session.sessId + "' AND ((u.current_state is NOT NULL AND u.current_state = s.stateid AND s.stateid = f.stateid) OR (u.current_state IS NULL)) and f.userid = u.userid AND ((f.scheduleid is NOT NULL AND f.scheduleid = sc.scheduleid AND validSchedule(sc.type, sc.startdate, sc.enddate, sc.starttime, sc.endtime, sc.frequency, sc.day, " + req.session.current_date + "," + req.session.current_time +
					") = 1) OR (f.scheduleid is NULL)) AND" +
			  	"calculateDistance(u.latitude, u.longitude, f.latitude, f.longitude) <= f.radius) as fil, (select distinct n.noteid, n.title, n.description, n.visibility, nt.tagid, n.userid from users u, notes n, note_tag nt, schedules sc where n.noteid = nt.noteid AND u.userid = '" + req.session.sessId +
					"' AND n.scheduleid = sc.scheduleid AND validSchedule(sc.type, sc.startdate, sc.enddate, sc.starttime, sc.endtime, sc.frequency, sc.day, " + req.session.current_date + "," + req.session.current_time +
					") = 1 AND calculateDistance(u.latitude, u.longitude, n.latitude, n.longitude) <= n.radius) as nex where ((fil.tagid IS NOT NULL AND nex.tagid IS NOT NULL AND fil.tagid = nex.tagid) OR (fil.tagid IS NULL)) AND ((fil.visibility = 'all' and nex.visibility = 'all') OR" +
					"(((fil.visibility = 'friends' or fil.visibility = 'all') and (nex.visibility = 'all' or nex.visibility = 'friends')) and nex.userid in (select f1.user2 from friends f1, friends f2 where f1.user1 = fil.userid and f2.user2 = f1.user1 and f2.user1 = f1.user2)) OR " +
					" (fil.visibility = 'me' and nex.userid = fil.userid))";
					console.log(query_for_home);

					//SELECT noteid, title, description, latitude, longitude from notes
					mysql.read(query_for_home , function (error, results, fields) {
								var sess = req.session;
								res.locals.notes = results;
								res.render('home-map');
					})
			}
			else{
					res.render("login");
			}
	});
	versionRouter.get('/', function(req, res) {
			if(!!req.session.sessId){
					res.locals.userid = req.session.sessId;
					res.locals.username = req.session.username;
					let query_for_home = "select distinct nex.noteid, nex.title, nex.description from " +
					"(select distinct f.userid, f.visibility, f.tagid from users u, states s, filters f, schedules sc where u.userid ='" +
					req.session.sessId + "' AND ((u.current_state is NOT NULL AND u.current_state = s.stateid AND s.stateid = f.stateid) OR (u.current_state IS NULL)) and f.userid = u.userid AND ((f.scheduleid is NOT NULL AND f.scheduleid = sc.scheduleid AND validSchedule(sc.type, sc.startdate, sc.enddate, sc.starttime, sc.endtime, sc.frequency, sc.day, '" + req.session.current_date + "','" + req.session.current_time +
					"') = 1) OR (f.scheduleid is NULL)) AND" +
			  	" calculateDistance(u.latitude, u.longitude, f.latitude, f.longitude) <= f.radius) as fil, (select distinct n.noteid, n.title, n.description, n.visibility, nt.tagid, n.userid from users u, notes n, note_tag nt, schedules sc where n.noteid = nt.noteid AND u.userid = '" + req.session.sessId +
					"' AND n.scheduleid = sc.scheduleid AND validSchedule(sc.type, sc.startdate, sc.enddate, sc.starttime, sc.endtime, sc.frequency, sc.day, '" + req.session.current_date + "','" + req.session.current_time +
					"') = 1 AND calculateDistance(u.latitude, u.longitude, n.latitude, n.longitude) <= n.radius) as nex where ((fil.tagid IS NOT NULL AND nex.tagid IS NOT NULL AND fil.tagid = nex.tagid) OR (fil.tagid IS NULL)) AND ((fil.visibility = 'all' and nex.visibility = 'all') OR" +
					"(((fil.visibility = 'friends' or fil.visibility = 'all') and (nex.visibility = 'all' or nex.visibility = 'friends')) and nex.userid in (select f1.user2 from friends f1, friends f2 where f1.user1 = fil.userid and f2.user2 = f1.user1 and f2.user1 = f1.user2)) OR " +
					" (fil.visibility = 'me' and nex.userid = fil.userid))";
					console.log(query_for_home);
					mysql.read(query_for_home , function (error, results, fields) {
								console.log(results);
								var sess = req.session;
								res.locals.notes = results;
								res.render('home');
					})
			}
			else{
					res.render("login");
			}
	});
	versionRouter.get('/logout', function(req, res) {
			req.session.sessId = null;
			req.session.username = null;
			res.redirect("/");
	});
	let loginRoutes = require('./v1/loginroute.js')(express);
	versionRouter.use('/login', loginRoutes);
	let registerRoutes = require('./v1/registerroute.js')(express);
	versionRouter.use('/register', registerRoutes);
	let noteRoutes = require('./v1/noteroute.js')(express);
	versionRouter.use('/note', noteRoutes);
	let notereadRoutes = require('./v1/notereadroute.js')(express);
	versionRouter.use('/noteread', notereadRoutes);
	let friendsRoutes = require('./v1/friendsroute.js')(express);
	versionRouter.use('/friends', friendsRoutes);
	let filtersRoutes = require('./v1/filterroute.js')(express);
	versionRouter.use('/filters', filtersRoutes);
	let myfiltersRoutes = require('./v1/myfilterroute.js')(express);
	versionRouter.use('/myfilters', myfiltersRoutes);
	let commentRoutes = require('./v1/commentroute.js')(express);
	versionRouter.use('/comment', commentRoutes);
	let paramaterRoutes = require('./v1/parameterroute.js')(express);
	versionRouter.use('/parameters', paramaterRoutes);
	/*let gameRoutes = require('./v1/gameroute.js')(express);
	versionRouter.use('/game', gameRoutes);
	let tournamentRoutes = require('./v1/tournamentroute.js')(express);
	versionRouter.use('/tournament', tournamentRoutes);*/
	return versionRouter;
}
