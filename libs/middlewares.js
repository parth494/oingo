let log = require("./mylogger").logger("MIDDLEWARES");
let service = {};
service.cors = {
    check: (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "x-access-token, x-user-agent, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    },
}
service.error = {
    Error40X: (err, req, res, next) => {
        let response = err;
        if ((err || {}).code == 'LIMIT_UNEXPECTED_FILE') {
            response = [{
                title: "ERROR",
                message: err.code,
                code: "ERRORUPLOAD"
            }];
        }
        if (!Array.isArray(response) && !!response.message) {
            response = [{
                "title": "ERROR",
                "message": response.message,
                "code": "ECONNREFUSED",
            }]
        } else if (!Array.isArray(response)) {
            response = [{
                "title": "ERROR",
                "message": "Internal Error",
                "code": "ECONNREFUSED",
            }]
        }
        let responseObject = {
            result: "failure",
            response: response
        };
        res.json(responseObject);
    },
    Error404: (req, res, next) => {
        let responseObject = {
            result: "failure",
            response: [{
                "title": "ERROR",
                "message": "This api doesnt exist.",
                "code": "404ERROR"
            }]
        }
        log.error("This API does not Exist : " + req.method + " " + req.url);
        res.json(responseObject);
    }
};
service.log = {
    request: (req, res, next) => {
        log.info(req.session, {
            "URL": req.url,
            "METHOD": req.method,
            "PARAMS": req.params,
            "QUERY": req.query,
            "BODY": req.body,
            "HEADERS": req.headers
        }, "");
        var PURPLE = '\033[01;35m';
        log.info(PURPLE + "Method : " + req.method + " :: Url : " + req.url.split("?")[0] + "\033[00m");
        next();
    },
}
module.exports = service;
