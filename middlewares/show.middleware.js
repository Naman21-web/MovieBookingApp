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

const validateCreateShowRequest = async (req,res,next) => {
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
        badRequestResponse.err = "Invalid theatreId format for show in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);        
    }

    const theatre = await Theatre.findById(req.body.theatreId);
    if (!theatre) {
        badRequestResponse.err = 'Invalid theatreId for show in the request sent';
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);    
    }

    //validate the show movieId
    if(!req.body.movieId){
        badRequestResponse.err = "The movieId is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!ObjectId.isValid(req.body.movieId)){
        badRequestResponse.err = "Invalid movieId format for show in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);        
    }

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
        badRequestResponse.err = 'Invalid movieId for show in the request sent';
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);     
    }

    if (!theatre.movies.includes(req.body.movieId)) {
        badRequestResponse.err = 'No movie found matching the theatre';
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);     
    }

    //validate the show timing
    if(!req.body.timing){
        badRequestResponse.err = "The timing is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //validate the show noOfSeats
    if(!req.body.noOfSeats){
        badRequestResponse.err = "The noOfSeats is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //validate the show price
    if(!req.body.price){
        badRequestResponse.err = "The price is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    //If all validations pass, call the next middleware or controller
    next();
};

module.exports = {
    validateCreateShowRequest
}