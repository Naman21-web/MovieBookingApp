const Movie = require('../models/movie.model');

const createMovie = async (req, res) => {
    try {
        const {name, description, casts, trailerUrl, language, releaseDate, director} = req.body;

        if(!name || !description || !casts || !trailerUrl || !language || !releaseDate || !director){
            return {
                err: 'Missing required fields',
                code: 400,
                message: `All fields are required` 
            }
        }
        const movie = new Movie({
            name, description, casts, trailerUrl, language, releaseDate, director
        });
        await movie.save();
        return movie;
    } catch (error) {
        return {
                err: error.message,
                code: 500,
                message: `Error creating movie` 
            }
    }
};

const deleteMovie = async (id) => {
    try {
        const movie = await Movie.findByIdAndDelete(id);
        if(!movie) {
            return {
                err: 'Movie not found',
                code: 404,
                message: `No movie found with id ${id}`
            }
        }
        return movie;
    } catch (error) {
        return {
                err: error.message,
                code: 500,
                message: `Error deleting movie with id ${id}`
            }
    }
};

const getMovieById = async (id) => {
    try {
        const movie = await Movie.findById(id);
        if(!movie) {
            return {
                err: 'Movie not found',
                code: 404,
                message: `No movie found with id ${id}` 
            }
        }
        return movie;
    } catch (error) {
        return {
                err: error.message,
                code: 500,
                message: `Error retrieving movie with id ${id}` 
            }
    }   
};

module.exports = {
    createMovie,
    deleteMovie,
    getMovieById
}