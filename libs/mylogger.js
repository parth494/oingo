let utils = require("./utils").utils;
let ss = "";
let _LOGDIR = ((process.env || {}).LOGS || null) || (process.cwd() + '/../logs');
const benchTime = 1476210600000;
let fs = require("fs");
let logger = (name) => {
    name = name || "Oingo";
    let commonFunc = (_session, obj, msg) => {
        _session = _session || {};
        if (!!_session.isDebug) {
            debugTool(_session.ca_id, msg, obj, (err) => {
                //done
                if (err) {}
            })
        }
        let formatObj = (element) => {
            if (element === null || typeof element === "undefined") {
                element = null;
            } else if (typeof element === "object" && !Array.isArray(element)) {
                if (!!Object.keys(element).length) {
                    element = utils.stringifyMe(element);
                } else {
                    element = null;
                }
            } else if (typeof element == "string" && !element.length) {
                element = null;
            } else {
                element = utils.stringifyMe(element);
            }
            return element;
        }
        obj = formatObj(obj);
        msg = formatObj(msg);
        _session = formatObj(_session);
        date = utils.getCurrentDate();
        let str = "Name : " + name + " \nTime : " + date;
        if (!!_session) {
            str = str + " \nSession : " + _session;
        }
        if (!!obj) {
            str = str + " \nMsgObj : " + obj;
        }
        if (!!msg) {
            str = str + " \nMessage : " + msg;
        }
        str = str + "\n\n\n";
        let dir = _LOGDIR;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return str;
    }
    let appendInFile = (fn, msg) => {
        fs.appendFile(_LOGDIR + '/' + fn, msg, function(err) {
            //console.log(msg);
            if (err) {
                console.error("DEBUG ERROR", err);
            }
        });
    };
    let infoLogs = (...args) => {
        var _session = null;
        var obj = null;
        var msg = null;
        if (args.length === 1) {
            msg = args[0];
        } else {
            _session = args[0];
            obj = args[1];
            msg = args[2];
        }
        if (msg !== "REQUEST-SESSION-LOG") {
            _session = {}
        }
        console.log("Info Logs: " + msg);
        let str = commonFunc(_session, obj, msg);
        let now = utils.getCurrentDate();
        let fileNumber = now.getHours();
        let filename = "info_" + now.getFullYear() + "_" + (now.getMonth() + 1) + "_" + now.getDate() + "_" + fileNumber + ".log";
        appendInFile(filename, str);
    }
    let errorLogs = (...args) => {
          var _session = null;
          var obj = null;
          var msg = null;
          if (args.length === 1) {
              msg = args[0];
          } else {
              _session = args[0];
              obj = args[1];
              msg = args[2];
          }
          if (msg !== "REQUEST-SESSION-LOG") {
              _session = {}
          }
          infoLogs(_session, obj, msg);
          if (!!msg) {
              console.error("Error Logs: Message : " + msg);
          }
          if (typeof obj === 'object' && typeof obj === 'undefined' && obj !== null && !!Object.keys(obj).length) {
              console.error("Error Logs: " + JSON.stringify(obj));
          }
          let str = commonFunc(_session, obj, msg);
          let now = utils.getCurrentDate();
          let fileNumber = 0; // by THE DAY
          let filename = "error_" + now.getFullYear() + "_" + (now.getMonth() + 1) + "_" + now.getDate() + "_" + fileNumber + ".log";
          appendInFile(filename, str);
    }
    let debugLogs = (...args) => {
        var _session = null;
        var obj = null;
        var msg = null;
        if (args.length === 1) {
            msg = args[0];
        } else {
            _session = args[0];
            obj = args[1];
            msg = args[2];
        }
        if (msg !== "REQUEST-SESSION-LOG") {
            _session = {}
        }
        console.log("Debug Logs: " + msg);
        let str = commonFunc(_session, obj, msg);
        let now = utils.getCurrentDate();
        let fileNumber = now.getHours();
        let filename = "debug_" + now.getFullYear() + "_" + (now.getMonth() + 1) + "_" + now.getDate() + "_" + fileNumber + ".log";
        appendInFile(filename, str);
    };
    let fileLogs = (_session, filename, obj, msg) => {
        if (msg !== "REQUEST-SESSION-LOG") {
            _session = {}
        };
        console.log("File Logs:  " + filename + " " + msg);
        //let str = commonFunc(_session, obj, msg);
        let str = "\n" + msg.toString();
        let now = utils.getCurrentDate();
        let fileNumber = now.getHours();
        filename = "File-" + filename + "-" + now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "-" + fileNumber + ".log";
        appendInFile(filename, str);
    };
    return {
        info: infoLogs,
        error: errorLogs,
        debug: debugLogs,
        file: fileLogs
    };
}
let createprintabletext = (message, data, callback) => {
    try {
        let str = "<div style='border:1px-solid; background:#dbdfe2; padding:10px' ><div style='background: #124973; color:#f7f9fb; padding:10px; text-align:center'><B>" + message + "</B></div><div>" + JSON.stringify(data, undefined, 2) + "</div></div><br/>";
        callback(null, str);
    } catch (e) {
        callback(e);
    }
}
let debugTool = (sessionid, message, Obj, callback) => {
    let redis = require("./redis")();
    try {
        let cacheReadCallback = (err, value) => {

                if (err) {
                    callback(err);
                } else if (!!value) {

                    let createprintabletextcallback = (error, textdata) => {
                        if (error) {
                            callback(error);
                        } else if (!!textdata) {
                            console.log("-----------------debug tool----------------")
                            redis.setex("DEBUG_" + sessionid, 3, value + textdata);

                        } else {
                            callback({
                                "message": "Error",
                                "code": "ERROR"
                            });
                        }

                    }
                    createprintabletext(message, Obj, createprintabletextcallback);
                } else {
                    let createprintabletextcallback = (err, textdata) => {
                        if (err) {
                            callback(err);
                        } else if (!!textdata) {
                            console.log("-----------------debug tool----------------")
                            redis.setex("DEBUG_" + sessionid, 3, textdata);
                        } else {
                            callback({
                                "message": "Error",
                                "code": "ERROR"
                            });
                        }

                    }
                    createprintabletext(message, Obj, createprintabletextcallback);
                }
            }
            //cacheReadCallback();
        redis.get("DEBUG_" + sessionid, cacheReadCallback);
    } catch (e) {
        callback(e);
    }
}

module.exports.logger = logger;
