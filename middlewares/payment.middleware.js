const { STATUS } = require("../utils/constants");
const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}
const ObjectId = require("mongoose").Types.ObjectId;

const validateCreatePaymentRequest = async (req,res,next) => {
    //validate request body
    if(!req.body || Object.keys(req.body).length === 0){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //validate the show theatreId
    if(!req.body.bookingId){
        badRequestResponse.err = "The bookingId is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!ObjectId.isValid(req.body.bookingId)){
        badRequestResponse.err = "Invalid bookingId format for show in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);        
    }

    //validate the show movieId
    if(!req.body.amount){
        badRequestResponse.err = "The amount is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //If all validations pass, call the next middleware or controller
    next();
};

module.exports = {
    validateCreatePaymentRequest
}