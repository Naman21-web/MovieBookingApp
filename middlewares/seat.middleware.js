const { STATUS } = require("../utils/constants");
const ObjectId = require("mongoose").Types.ObjectId;
const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');

const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}

const validateCreateSeatRequest = async (req,res,next) => {
    //validate request body
    if(!req.body || Object.keys(req.body).length === 0){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //validate the show theatreId
    if(!req.body.theatreId){
        badRequestResponse.err = "The theatreId is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!ObjectId.isValid(req.body.theatreId)){
        badRequestResponse.err = "Invalid theatreId format for seat in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);        
    }

    const theatre = await Theatre.findById(req.body.theatreId);
    if (!theatre) {
        badRequestResponse.err = 'Invalid theatreId for seat in the request sent';
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);    
    }

    //validate the show movieId
    if(!req.body.totalRows){
        badRequestResponse.err = "The totalRows is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //validate the show timing
    if(!req.body.seatsPerRow){
        badRequestResponse.err = "The row is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //If all validations pass, call the next middleware or controller
    next();
};

module.exports = {
    validateCreateSeatRequest
}