const bulletin = require("./../libs/bulletin").bulletin;
const rs = require("./../libs/responsestrings").responsestrings;
let log = require("./mylogger.js").logger("MYSQL");
module.exports = (function() {
    var instance;
    var dbObject;
    // If the Node process ends, close the Mongoose connection
    function constructor(options, dbname) {
        var mysql = require('mysql');
        dbObject = mysql.createConnection(options);
        dbObject.connect(function(err) {
            if (!!err) {
                log.error("Could not connect to mysql:" + JSON.stringify(err));
                process.exit(1);
                return null;
            }

        });
    };

    function create(model, table, callback) {
        dbObject.collection(table).insertOne(model, function(err, r) {
            if (!!err) {
                let error = rs.mongoerror;
                error.message = err.message;
                return callback([error]);
            } else {
                return callback(null);
            }
        });
    };

    function read(query, callback) {
        dbObject.query(query, callback);
    };
    function insert(query, callback) {
        dbObject.query(query, callback);
    };
    function escape(query) {
        return dbObject.escape(query);
    };
    function findMany(query, params, table, callback) {
        let dbcall = dbObject.collection(table).find(query);
        if (!!params.sort) {
            dbcall = dbcall.sort(params.sort);
        }
        if (!!params.projection) {
            dbcall = dbcall.project(params.projection);
        }
        if (typeof params.start === "number") {
            params.startkey = params.start;
        }
        if (typeof params.limit === "number") {
            params.pagelimit = params.limit;
        }
        if (typeof params.startkey === "number") {
            dbcall = dbcall.skip(params.startkey);
        }
        if (!!params.pagelimit) {
            dbcall = dbcall.limit(params.pagelimit);
        }
        dbcall.toArray(function(err, r) {
            if (!!err) {
                let error = rs.mongoerror;
                error.message = err.message;
                return callback([error]);
            } else if (typeof params.startkey === "number" && r.length > 0 && r.length === params.pagelimit) {
                return callback(null, r, (r.length + params.startkey).toString());
            } else {
                return callback(null, r, null);
            }
        });
    };

    function remove(model, table, callback) {
        dbObject.collection(table).deleteOne(model, function(err, r) {
            if (!!err) {
                let error = rs.mongoerror;
                error.message = err.message;
                return callback([error]);
            } else {
                return callback(null, r);
            }
        });
    };

    function aggregate(pipeline, table, callback) {
        dbObject.collection(table).aggregate(pipeline, function(err, r) {
            if (!!err) {
                return callback(err);
            } else {
                return callback(null, r);
            }
        });
    };

    function update(original, modify, table, callback) {
        dbObject.collection(table).updateOne(original, {
            $set: modify
        }, function(err, r) {
            if (!!err) {
                return callback(err);
            } else {
                return callback(null, r);
            }
        });
    };

    function updateMany(query, modify, table, callback) {
        // modify object to be set in bridge itself
        dbObject.collection(table).updateMany(query, modify, function(err, r) {
            if (!!err) {
                return callback(err);
            } else {
                return callback(null, r);
            }
        });
    };

    function upsert(original, modify, table, options, callback) {
        dbObject.collection(table).updateOne(original, modify, options,
            function(err, r) {
                if (!!err) {
                    return callback(err);
                } else {
                    return callback(null, r);
                }
            });
    };

    return {
        constructor: function(connectionString) {
            if (!instance) {
                instance = constructor(connectionString);
            }
            return instance;
        },
        insert: function(query, callback) {
            callback = insert(query, callback);
            return callback;
        },
        read: function(query, callback) {
            callback = read(query, callback);
            return callback;
        },
        escape: function(query) {
            return escape(query);
        },
        update: function(original, modify, table, callback) {
            callback = update(original, modify, table, callback);
            return callback;
        },
        updateMany: function(query, modify, table, callback) {
            callback = updateMany(query, modify, table, callback);
            return callback;
        },
        upsert: function(original, modify, table, options, callback) {
            callback = upsert(original, modify, table, options, callback);
            return callback;
        },
        remove: function(model, table, callback) {
            callback = remove(model, table, callback);
            return callback;
        },
        aggregate: function(pipeline, table, callback) {
            callback = aggregate(pipeline, table, callback);
            return callback;
        },
        findMany: function(query, params, table, callback) {
            callback = findMany(query, params, table, callback);
            return callback;
        }
    };
})();
