const rs = {};
rs.exceptions = {
    "title": "ERROR",
    "message": "Caught an Exception !!!",
    "code": "EXCEPTION"
};
rs.error404 = {
    "title": "ERROR",
    "message": "This api doesnt exist.",
    "code": "404ERROR"
};
rs.UNKNOWN_ERR = {
    "title": "ERROR",
    "message": "Unknown Error",
    "code": "UNKNOWN_ERR"
};
rs.createsuccessful = {
    "title": "SUCCESS",
    "message": "Model created successfully.",
    "code": "CREATESUCCESS"
};
rs.deletesuccessful = {
    "title": "ERROR",
    "message": "Model deleted successfully.",
    "code": "DELETESUCCESS"
};
rs.readsuccessful = {
    "title": "SUCCESS",
    "message": "Model Read Successfully",
    "code": "READSUCCESS"
};
rs.updatesuccessful = {
    "title": "SUCCESS",
    "message": "Model Updated Successfully",
    "code": "UPDATESUCCESS"
};
rs.invalidrequest = {
    "title": "ERROR",
    "message": "Invalid Request",
    "code": "VALIDATIONERROR"
};

module.exports.responsestrings = rs;
