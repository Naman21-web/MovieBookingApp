const Movie = require('../models/movie.model');
const MovieService = require('../service/movie.service');
const {errorResponseBody, successResponseBody} = require('../utils/responseBody');

/*
    @desc: Create a new movie
    @route: POST /api/v1/movies
    @access: Public
    @params: name, description, casts, trailerUrl, language, releaseDate, director
    @returns: 201 - Created, 400 - Bad Request, 500 - Internal Server Error

    request body example:
    {
    "name": "Inception",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    "casts": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    "trailerUrl": "https://www.youtube.com/watch?v=YoHD9XEInc0",
    "language": "English",
    "releaseDate": "2010-07-16",
    "director": "Christopher Nolan"
    }
*/
const createMovie = async (req, res) => {
    try{
        const response = await MovieService.createMovie(req, res);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Movie created successfully";
        res.status(201).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to create movie";
        res.status(500).json(errorResponseBody); 
    }
}

const deleteMovie = async (req, res) => {
    try{
        const id = req.params.movieId;
        const response = await MovieService.deleteMovie(id);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Movie deleted successfully";
        res.status(200).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to delete movie";
        res.status(500).json(errorResponseBody); 
    }
};

const getMovie = async (req, res) => {
    try{
        const id = req.params.movieId;
        const response = await MovieService.getMovieById(id);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Movie retrieved successfully";
        res.status(200).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to get movie";
        res.status(500).json(errorResponseBody);    
    }
};

const updateMovie = async (req, res) => {
    try{
        const id = req.params.movieId;
        const updateData = req.body;
        const response = await MovieService.updateMovie(id, updateData);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Movie updated successfully";
        res.status(200).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to update movie";
        res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie
};