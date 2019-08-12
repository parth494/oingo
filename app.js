let log = require("./libs/mylogger.js").logger("APP");
let utils = require("./libs/utils").utils;
let middlewares = require("./libs/middlewares");
const rs = require("./libs/responsestrings").responsestrings;
const bulletin = require("./libs/responsestrings").bulletin;
let express = require('express');
let cluster = require('cluster');
let timeout = require('connect-timeout')
let messagePassingApi = {};
let sqlinjection = require('sql-injection');
messagePassingApi.activeWorkerList = [];
messagePassingApi.refreshActiveWorkerList = () => {
    let newWorkers = Object.keys(cluster.workers);
    for (let i = newWorkers.length - 1; i >= 0; i--) {
        if (messagePassingApi.activeWorkerList.indexOf(newWorkers[i]) === -1) {
            cluster.workers[newWorkers[i]].on('message', messagePassingApi.onMessageHandler);
        }
    }
    messagePassingApi.activeWorkerList = newWorkers;
};
messagePassingApi.onMessageHandler = (msg) => {
    let newKeys = Object.keys(cluster.workers);
    for (let j = newKeys.length - 1; j >= 0; j--) {
        cluster.workers[newKeys[j]].send(msg);
    }
};
if (cluster.isMaster) {
    let numCPUs = require('os').cpus().length;
    numCPUs = numCPUs > 8 ? 8 : numCPUs;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('death', (worker) => {
        cluster.fork();
        messagePassingApi.refreshActiveWorkerList();
    });
    cluster.on('disconnect', (worker) => {
        cluster.fork();
        messagePassingApi.refreshActiveWorkerList();
    });
    messagePassingApi.refreshActiveWorkerList();
} else {
    let config = require('./configs/config.js')
    var mysql = require('./libs/mysql');
    var user = config.mysql.username;
    var password = config.mysql.password;
    var host = config.mysql.host;
    var database = config.mysql.database;
    mysql.constructor({
      host     : host,
      user     : user,
      password : password,
      database : database
    });
    let app = express();
    // set the view engine to ejs
    app.use(middlewares.cors.check);
    app.use(timeout('10s'));
    app.use(require('body-parser').json());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/views'));
    app.use(utils.unsetNull);
    app.use(middlewares.log.request);
    var session = require('express-session');
    var MySQLStore = require('express-mysql-session')(session);
    var options = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'parth',
        database: 'project'
    };
    var sessionStore = new MySQLStore(options);
    app.use(session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));
    //app.use(sqlinjection);
    let versionV1Routes = require('./routes/v1.js')(express);
    app.use('/', versionV1Routes);
    app.use(middlewares.error.Error404);
    app.use(middlewares.error.Error40X);
    app.listen(3000);
    log.info("Started \033[01;32m :: TAPCUBE :: 3000 \033[00m");
};
