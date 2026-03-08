const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}

const validateUpdateUserRequest = async (req,res,next) => {
    if(!req.body || Object.keys(req.body).length == 0){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(400).json(badRequestResponse);
    }

    //validate the user Role,status. Anyone of both should be present
    if(!req.body.userStatus && !req.body.userRole){
        badRequestResponse.err = "The userRole or userStatus is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }
    next();
}

module.exports = {
    validateUpdateUserRequest
}