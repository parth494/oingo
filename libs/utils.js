let utils = {};
let IST = 19800;
utils.getRandomString = (len) => {
    len = len || 25; // default length of string
    len = parseInt(len);
    if (len < 0) {
        len = len * -1;
    };
    var allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let str = "";
    for (var i = 0; i < len; i++)
        str = str + allowed.charAt(Math.floor(Math.random() * allowed.length));
    return str;

}
utils.getObjectValuesInArray = (obj) => {
    let dataArray = new Array;
    for (let o in obj) {
        dataArray.push(obj[o]);
    }
    return dataArray || [];
};
utils.getUniqueId = () => {
    return require('uuid').v1() || null;
};
utils.stringifyMe = (obj) => {
    if (!!obj) {
        if (typeof obj === "object" && obj == null) {
            return "";
        } else if (typeof obj === "object") {
            return JSON.stringify(obj);
        } else if (typeof obj === "function") {
            return "";
        } else if (typeof obj === "number") {
            return obj.toString();
        } else if (typeof obj === "string") {
            return obj;
        } else {
            return obj;
        }
    } else {
        return ""
    }
};
utils.toTitleCase = (word) => {
    return word.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
utils.isNull = (element) => {
    if (typeof element === "undefined") {
        return true;
    } else if (element === null) {
        return true;
    } else if (typeof element === "string" && element.trim() === "") {
        return true;
    } else {
        return false;
    }
};
utils.calculateAge = (dob) => {
    var now = new Date();
    var today = new Date(now.getYear(), now.getMonth(), now.getDate());
    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();
    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";
    yearAge = yearNow - yearDob;
    if (monthNow >= monthDob)
        var monthAge = monthNow - monthDob;
    else {
        yearAge--;
        var monthAge = 12 + monthNow - monthDob;
    }
    if (dateNow >= dateDob)
        var dateAge = dateNow - dateDob;
    else {
        monthAge--;
        var dateAge = 31 + dateNow - dateDob;
        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }
    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };
    if (age.years > 0) {
        return age.years + " Years";
    }
    if (age.months > 0) {
        return age.months + " Months";
    }
    if (age.days > 0) {
        return age.days + " Days";
    }
    return "";
}
utils.getCurrentTime = () => {
    var now = utils.getCurrentDate().getTime();
    return now;
}
utils.getCurrentDate = (...args) => {
    let d = args[0];
    if (!!d) {
        return new Date(d);
    } else {
        return new Date();
    }
}
utils.getTimeFromDate = (...args) => {
    let d = args[0];
    if (!!d) {
        let a = utils.getCurrentDate(d).getHours() < 10 ? "0" + utils.getCurrentDate(d).getHours() : utils.getCurrentDate(d).getHours();
        let b = utils.getCurrentDate(d).getMinutes() < 10 ? "0" + utils.getCurrentDate(d).getMinutes() : utils.getCurrentDate(d).getMinutes();
        return a + ":" + b;
    } else {
        return null;
    }
}
utils.getDateTimeStamp = (...args) => {
    let recDate = args[0];
    let recHour = args[1] || 0;
    let recMin = args[2] || 0;
    let recSec = args[3] || 0;
    let recMSec = args[4] || 0;
    try {
        let year = utils.getCurrentDate(recDate).getFullYear();
        let month = utils.getCurrentDate(recDate).getMonth();
        let date = utils.getCurrentDate(recDate).getDate();
        return new Date(year, month, date, recHour, recMin, recSec, recMSec).getTime();
    } catch (e) {
        utils.catchException(e);
        return null;
    }
};
utils.isToday = (d) => {
    if (!d) {
        return false;
    } else {
        if (utils.getCurrentDate(d).getFullYear() === utils.getCurrentDate().getFullYear() && utils.getCurrentDate(d).getMonth() === utils.getCurrentDate().getMonth() && utils.getCurrentDate(d).getDate() === utils.getCurrentDate().getDate()) {
            return true;
        } else {
            return false;
        }
    }
}
utils.isDaySame = (d1, d2) => {
    if (!d1 || !d2) {
        return false;
    } else {
        if (utils.getCurrentDate(d1).getFullYear() === utils.getCurrentDate(d2).getFullYear() && utils.getCurrentDate(d1).getMonth() === utils.getCurrentDate(d2).getMonth() && utils.getCurrentDate(d1).getDate() === utils.getCurrentDate(d2).getDate()) {
            return true;
        } else {
            return false;
        }
    }
}
utils.getDayOfWeek = (...args) => {
    let recDate = args[0];
    try {

        function DayOfWeek(thisday) {
            let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            return week[thisday];
        }
        let day = DayOfWeek(Number(utils.getCurrentDate(Number(recDate)).getDay()));
        return day;
    } catch (e) {
        utils.catchException(e);
        return null;
    }
}
utils.getTimeDifferenceForDays = (...args) => {
    let days = args[0] || 0;
    try {
        return days * 24 * 60 * 60 * 1000;
    } catch (e) {
        utils.catchException(e);
        return 0;
    }
}
utils.isEmpty = (data) => {
    if (typeof(data) == 'number' || typeof(data) == 'boolean') {
        return false;
    }
    if (typeof(data) == 'undefined' || data === null) {
        return true;
    }
    if (typeof(data.length) != 'undefined') {
        return data.length == 0;
    }
    let count = 0;
    for (let i in data) {
        if (data.hasOwnProperty(i)) {
            count++;
        }
    }
    return count == 0;
}
utils.catchException = (...args) => {
    let err = args[0] || {};
    let log = require("./mylogger").logger("UTILS");
    log.error({}, err, "EXCEPTION");
    console.error(err);
}
utils.inArray = function(needle, haystack, returnposition) {
    if (returnposition) {
        let length = haystack.length;
        for (let i = 0; i < length; i++) {
            if (haystack[i] == needle) return i;
        }
        return -1;
    } else {
        let length = haystack.length;
        for (let i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }
}
utils.getTimeFromTimeSlot = (timeslot) => {
    let t = parseInt(timeslot) || 0;
    let act = t / 2 < 10 ? ("0" + Math.floor(t / 2)) : ("" + Math.floor(t / 2));
    if (parseInt(act) > 12) {
        act = act - 12;
    }
    let mod = t % 2 > 0 ? "30" : "00";
    if (act == "00") {
        act = "12";
    }
    let time = act + ":" + mod;
    return time;
};
utils.getTimeslotFromTime = (time) => {
    time = time.toString() || "00:00";
    let hour = parseInt(time.split(":")[0]);
    let min = parseInt(time.split(":")[1]);
    let t = hour * 2;
    t += min < 30 ? 0 : 1;
    return t;
};
utils.printDebug = (session, callback) => {
    let redis = require("./../../checkapp-database/libs/redis")();
    redis.get("DEBUG_" + session.ca_id, (err, text) => {
        if (err) {
            callback(true);
        } else {
            callback(null, "<HTML>" + text + "</HTML>");
        }
    })
}
Array.prototype.unique = function() {
    let a = this.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};
utils.timeslotToTime = (slot) => {
    let t = parseInt(slot) || 0;
    if (t == 48) {
        return "12:00 am";
    }
    let clock = "am";
    let is30 = "00";
    let hour = "";
    if (t % 2 != 0) {
        is30 = "30";
        t--;
    }
    if (t / 2 >= 12) {
        clock = "pm";
    }
    if (t / 2 > 12) {
        hour = ((t / 2) - 12).toString();
        if ((t / 2) - 12 < 10) {
            hour = "0" + ((t / 2) - 12).toString();
        }
    } else if (t / 2 < 10) {
        hour = "0" + ((t / 2)).toString();
    } else {
        hour = ((t / 2)).toString();
    }
    if (hour == "00") {
        hour = "12"
    }
    return hour + ":" + is30 + " " + clock;

};
utils.formatTimeslots = (slots = {}) => {
    let formattedSlots = (daySlot) => {
        // converts {"10":2,"11":2,"12":2,"13":2,"14":2,"20":2,"21":2,"22":2,"37":34,"38":3,"39":2}
        // to ["05:00 am to 07:00 am", "10:00 am to 11:00 am", "06:30 pm to 07:30 pm"]
        let keys = Object.keys(daySlot);
        let nKeys = [];
        keys.forEach(function(element) {
            nKeys.push(parseInt(element));
        });
        let compare = (a, b) => {
            if (a < b) {
                return -1;
            } else {
                return 1;
            }
        }
        nKeys.sort(compare);

        let formattedSlot = [];
        let arrarr = [];
        let count = 1;
        let getArr = () => {
            let newArr = [nKeys[0]];
            for (let i = 1; i < nKeys.length; i++) {
                if (nKeys[i] === nKeys[i - 1] + 1) {
                    newArr.push(nKeys[i]);
                    count++;
                } else {
                    nKeys.splice(0, i);
                    return newArr;
                }
            }
            nKeys.splice(0, count);
            return newArr;
        }
        while (nKeys.length > 0) {
            arrarr.push(getArr());
        }
        for (let i = 0; i < arrarr.length; i++) {
            if (arrarr[i][0] === 0 && parseInt(arrarr[i][arrarr[i].length - 1]) === 47) {
                formattedSlot.push("Open 24 Hours");
            } else {
                formattedSlot.push(utils.timeslotToTime(arrarr[i][0]) + " to " + utils.timeslotToTime(parseInt(arrarr[i][arrarr[i].length - 1]) + 1));
            }
        }
        return formattedSlot;
    };
    let result = {};
    let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (let i = 0; i < week.length; i++) {
        if (!!slots[week[i]]) {
            let toSet = false;
            if (slots[week[i]]["appointmentoncall"] === true) {
                toSet = true;
                delete slots[week[i]]["appointmentoncall"]
            }
            result[week[i]] = formattedSlots(slots[week[i]]);
            if (!!toSet) {
                result[week[i]].push("Appointments On Call Only");
            }
        } else {
            result[week[i]] = [];
        }
    }
    return result;
};
utils.isUserActive = (patientInfo) => {
    let accounts = patientInfo.accounts || [];
    if (!accounts.length || !patientInfo.isregistered) {
        return false;
    }
    for (let k = 0; k < accounts.length; k++) {
        if (accounts[k].usertype === "PATIENT") {
            if (accounts[k].status != "ACTIVE") {
                return false;
            }
        }
    }
    return true;
}
utils.isStringSet = (str) => {
    return str !== undefined && str !== "" && str !== null;
};
utils.cloneObject = (obj) => {
    if (typeof obj === "object" && obj !== null) {
        return JSON.parse(JSON.stringify(obj));
    } else if (typeof obj === "string") {
        let newSTR = obj.toString();
        return newSTR;
    } else {
        return obj;
    }
}
utils.round = (value, decimals) => {
    if (decimals === null || typeof decimals === "undefined") {
        decimals = 2;
    }
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};
utils.formatTime = (whattime) => {
    if (whattime.toLowerCase() === "00:00 am" || whattime.toLowerCase() === "12:00 am") {
        return "0"
    }
    if (whattime.toLowerCase() === "00:30 am" || whattime.toLowerCase() === "12:30 am") {
        return "1"
    }
    let time = whattime.split(" ")[0];
    let ampm = whattime.split(" ")[1];
    let hour = parseInt(time.split(":")[0]);
    let min = time.split(":")[1];
    let minadd = min === "00" ? 0 : 1;
    if (ampm.toLowerCase() === "pm" && hour !== 12) {
        hour = hour + 12;
    }
    return ((hour * 2) + minadd).toString();
};
utils.standardizeDate = (d) => {
    d = d || new Date().getTime();
    return new Date(new Date(d).getFullYear(), new Date(d).getMonth(), new Date(d).getDate()).getTime();
};
utils.accountsMatch = (a = {}, b = {}) => {
    if (a.accountid === b.accountid && a.departmentid === b.departmentid && a.usertype === b.usertype)
        return true;
    return false;
}
utils.unsetNull = (req, res, next) => {
        if (req.query === null || typeof req.query === "undefined") {
            req.query = {};
        }
        let keys = Object.keys(req.query);
        if (keys.length) {
            for (let i = keys.length - 1; i >= 0; i--) {
                req.query[keys[i]] = req.query[keys[i]] === "null" ? null : req.query[keys[i]] || null;
            }
        }
        next();
}
let nearest = {};
nearest.fifteen = (ts) => {
    let mins = new Date(ts).getMinutes();
    let addup = (14 * 60 * 1000) + (59 * 1000);
    ts = ts - ((mins % 15) * 60 * 1000) + addup;
    return ts;
};
nearest.thirty = (ts) => {
    let mins = new Date(ts).getMinutes();
    let addup = (29 * 60 * 1000) + (59 * 1000);
    ts = ts - ((mins % 30) * 60 * 1000) + addup;
    return ts;
};
nearest.hourly = (ts) => {
    ts = new Date(new Date(ts).getFullYear(), new Date(ts).getMonth(), new Date(ts).getDate(), new Date(ts).getHours(), 59, 59);
    return new Date(ts).getTime();
};
nearest.daily = (ts) => {
    ts = new Date(new Date(ts).getFullYear(), new Date(ts).getMonth(), new Date(ts).getDate(), 23, 59, 59);
    return new Date(ts).getTime();
};
nearest.weekly = (ts) => {
    ts = new Date(ts).setSeconds(59);
    ts = new Date(ts).setMinutes(59);
    ts = new Date(ts).setHours(23);
    day = new Date(ts).getDay();
    let addup = (6 - day) * 24 * 60 * 60 * 1000
    ts = ts + addup;
    return new Date(ts).getTime();
};
nearest.monthly = (ts) => {
    ts = new Date(new Date(ts).getFullYear(), new Date(ts).getMonth() + 1, 0, 23, 59, 59);
    return new Date(ts).getTime();
};
nearest.yearly = (ts) => {
    ts = new Date(new Date(ts).getFullYear(), 11, 31, 23, 59, 59);
    return new Date(ts).getTime();
};
nearest.life = (ts) => {
    ts = new Date(2100, 11, 31, 23, 59, 59);
    return ts.getTime();
};
utils.getRoundedUpTime = (timestamp, frequency) => {
    if (!timestamp) {
        return null;
    };
    if (new Date(timestamp) === "Invalid Date") {
        return null;
    }
    let obj = {};
    timestamp = timestamp + ((IST)*1000);
    timestamp = new Date(timestamp).setSeconds(00);
    timestamp = new Date(timestamp).setMilliseconds(00);
    switch (frequency) {
        case "FIFTEEN":
            obj.FIFTEEN = nearest.fifteen(timestamp);
            return obj.FIFTEEN;
            break;
        case "THIRTY":
            obj.THIRTY = nearest.thirty(timestamp);
            return obj.THIRTY;
            break;
        case "HOURLY":
            obj.HOURLY = nearest.hourly(timestamp);
            return obj.HOURLY;
            break;
        case "DAILY":
            obj.DAILY = nearest.daily(timestamp);
            return obj.DAILY;
            break;
        case "WEEKLY":
            obj.WEEKLY = nearest.weekly(timestamp);
            return obj.WEEKLY;
            break;
        case "MONTHLY":
            obj.MONTHLY = nearest.monthly(timestamp);
            return obj.MONTHLY;
            break;
        case "YEARLY":
            obj.YEARLY = nearest.yearly(timestamp);
            return obj.YEARLY;
            break;
        case "LIFE":
            obj.LIFE = nearest.life(timestamp);
            return obj.LIFE;
            break;
        default:
            return null;
            break;
    }
};
module.exports.utils = utils;
