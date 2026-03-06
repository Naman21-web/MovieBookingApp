const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}

const validateAuthRequest = async (req,res,next) => {
    if(!req.body){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.name){
        badRequestResponse.err = "The name param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.email){
        badRequestResponse.err = "The email param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.password){
        badRequestResponse.err = "The password param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }
    next();
}

module.exports = {
    validateAuthRequest
}