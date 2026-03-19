const { STATUS, USER_ROLE, BOOKING_STATUS } = require("../utils/constants");
const ObjectId = require("mongoose").Types.ObjectId;
const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
const UserService = require("../service/user.service");
const { errorResponseBody } = require("../utils/responseBody");

const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}

const validateBookingCreateRequest = async (req,res,next) => {

    //validate the request body
    if(!req.body || Object.keys(req.body).length === 0){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //validate the theatreId
    if(!req.body.theatreId){
        badRequestResponse.err = "The theatreId of booking is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!ObjectId.isValid(req.body.theatreId)){
        badRequestResponse.err = "Invalid theatreId format for booking in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);        
    }

    const theatre = await Theatre.findById(req.body.theatreId);
    if (!theatre) {
        badRequestResponse.err = 'Invalid theatreId for booking in the request sent';
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);               
    }

    //validate the movieId 
    if(!req.body.movieId){
        badRequestResponse.err = "The movieId of booking is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!ObjectId.isValid(req.body.movieId)){
        badRequestResponse.err = "Invalid movieId format for booking in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);        
    }

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
        badRequestResponse.err = 'Invalid movieId for booking in the request sent';
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);               
    }

    if (!theatre.movies.includes(req.body.movieId)) {
        badRequestResponse.err = 'No movie found matching the theatre';
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);               
    }

    //validate the timing
    if(!req.body.timing){
        badRequestResponse.err = "The timing of booking is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //validate the noOfSeats
    if(!req.body.noOfSeats){
        badRequestResponse.err = "The noOfSeats of booking is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!req.body.seatNumbers || !Array.isArray(req.body.seatNumbers) || req.body.seatNumbers.length === 0){
        badRequestResponse.err = "The seatNumbers of booking is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }    

    //validate the totalCost
    if(!req.body.totalCost){
        badRequestResponse.err = "The totalCost of booking is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //validate the totalCost
    if(!req.body.idempotencyKey){
        badRequestResponse.err = "The idempotencyKey of booking is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //If all validations pass, call the next middleware or controller
    next();
};

const canChangeStatus = async (req,res,next) => {
    const user = await UserService.getUserById(req.user);
    if(user.userRole === USER_ROLE.customer && req.body.status && req.body.status !== BOOKING_STATUS.cancelled){
        badRequestResponse.err = "You are not allowed to change booking status";
        return res.status(STATUS.UNAUTHORISED).json(badRequestResponse);
    }
    next();
};

module.exports = {
    validateBookingCreateRequest,
    canChangeStatus
} 
