const Movie = require('../models/movie.model');

const createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
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

module.exports = {
    createMovie,
    deleteMovie,
    getMovieById,
    updateMovie
}