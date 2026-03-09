const Movie = require('../models/movie.model');
const { STATUS } = require("../utils/constants");


const createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        return movie;
    } catch (error) {
        throw {
                err: error.message,
                code: STATUS.INTERNAL_SERVER_ERROR,
                message: `Error creating movie` 
            }
    }
};

const deleteMovie = async (id) => {
    try {
        const movie = await Movie.findByIdAndDelete(id);
        if(!movie) {
            throw {
                err: 'Movie not found',
                code: STATUS.NOT_FOUND,
                message: `No movie found with id ${id}`
            }
        }
        return movie;
    } catch (error) {
        throw {
                err: error.message,
                code: STATUS.INTERNAL_SERVER_ERROR,
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

const updateMovie = async (id,updateData) => {
    try{
        const movie = await Movie.findByIdAndUpdate(id, updateData, {new: true});
        //New: true option returns the updated document instead of the original document
        if(!movie) {
            return {
                err: 'Movie not found',
                code: 404,
                message: `No movie found with id ${id}` 
            }
        }
        return movie;
    }
    catch(error){
        return {
            err: error.message,
            code: 500,
            message: `Error updating movie with id ${id}` 
        }
    }
};

const fetchMovies = async (filter) => {
    try{
        let query = {};
        if(filter.name){
           query.name = { $regex: filter.name, $options: 'i' }; // Case-insensitive search 
        }
        const movies = await Movie.find(query);
        if(movies.length === 0) {
            return {
                err: 'No movies found',
                code: 404,
                message: `No movies found matching the criteria` 
            }
        }
        return movies;
    }
    catch(error){
        return {
            err: error.message,
            code: 500,
            message: `Error fetching movies` 
        }
    }
};

module.exports = {
    createMovie,
    deleteMovie,
    getMovieById,
    updateMovie,
    fetchMovies
}