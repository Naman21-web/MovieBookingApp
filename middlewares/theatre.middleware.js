const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}

const validateTheatreCreateRequest = async (req,res,next) => {
    if(!req.body || Object.keys(req.body).length == 0){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(400).json(badRequestResponse);
    }

    //validate the theatre name
    if(!req.body.name){
        badRequestResponse.err = "The name of theatre is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //validate the theatre city
    if(!req.body.city){
        badRequestResponse.err = "The city of theatre is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //validate the theatre pinCode
    if(!req.body.pinCode){
        badRequestResponse.err = "The pinCode of theatre is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    //If all validations pass, call the next middleware or controller
    next();
}

module.exports = {
    validateTheatreCreateRequest
}