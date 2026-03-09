const Theatre = require('../models/theatre.model');
const TheatreService = require('../service/theatre.service');
const {successResponseBody, errorResponseBody} = require('../utils/responseBody');
const {STATUS} =  require("../utils/constants");
/*
    Controller for theatre resource, it receives the request and sends response to the client.
    It calls the service layer to process the request and send the response back to the client.
    same as movie.controller.js
    {
        name: "PVR Cinemas",
        description: "PVR Cinemas is a leading multiplex chain in India, known for its state-of-the-art facilities and exceptional movie-watching experience.",
        city: "Mumbai",
        pinCode: 400001,
        address: "123 Main Street, Mumbai, Maharashtra, India"
    }
*/

const createTheatre = async (req, res) => {
    try{
        const response = await TheatreService.createTheatre(req.body);
        
        successResponseBody.data = response;
        successResponseBody.message = "Theatre created successfully";
        res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to create theatre";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody); 
    }
};

const deleteTheatre = async (req,res) => {
    try{
        const id = req.params.theatreId;
        const response = await TheatreService.deleteTheatre(id);
        
        successResponseBody.data = response;
        successResponseBody.message = 'Theatre deleted successfully';
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to delete theatre";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);     }
}

const getTheatre = async (req,res) => {
    try{
        const id = req.params.theatreId;
        const response = await TheatreService.getTheatreById(id);
        successResponseBody.data = response;
        successResponseBody.message = "Theatre retrieved successfully";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to get theatre";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateTheatre = async (req, res) => {
    try{
        const id = req.params.theatreId;
        const updateData = req.body;
        const response = await TheatreService.updateTheatre(id, updateData);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Theatre updated successfully";
        res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to update theatre";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTheatres = async (req,res) => {
    try{
        const response = await TheatreService.fetchTheatres(req.query);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Theatres retrieved successfully";
        res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to retrieve theatres";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const updateMoviesTheatre = async (req,res) => {
    try{
        const {movieIds,insert} = req.body;
        const {theatreId} = req.params;
        const response = await TheatreService.updateMoviesTheatre(theatreId,movieIds,insert);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Movies in Theatre updated successfully";
        res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
      errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to retrieve theatres";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);  
    }
};

const getMoviesTheatre = async (req,res) => {
    try{
        const {theatreId} = req.params;
        const response = await TheatreService.getMoviesTheatre(theatreId);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Movies in Theatre fetched successfully";
        res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
      errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to retrieve theatres";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);  
    }
};

const checkMovieTheatre = async (req,res) => {
    try{
        const {theatreId,movieId} = req.params;
        const response = await TheatreService.checkMovieTheatre(theatreId,movieId);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Movie in Theatre fetched successfully";
        res.status(STATUS.OK).json(successResponseBody);        
    }
    catch(error){
      errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to retrieve movie from theatre";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);  
    }
}

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    updateTheatre,
    getTheatres,
    updateMoviesTheatre,
    getMoviesTheatre,
    checkMovieTheatre
}