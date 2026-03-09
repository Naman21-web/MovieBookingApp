const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
const { STATUS } = require("../utils/constants")

const createTheatre = async (data) => {
    try{
        const theatre = new Theatre(data);
        await theatre.save();
        return theatre;
    }
    catch(error){
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {
                err: err,
                code: STATUS.UNPROCESSABLE,
                message: "Validation error while creating theatre"
            }
        }
        throw {
            err: error.message,
            code: STATUS.INTERNAL_SERVER_ERROR,
            message: "Error creating theatre"
        }
    }
};

const deleteTheatre = async(id) => {
    try{
        const theatre = await Theatre.findByIdAndDelete(id);
        if(!theatre){
            throw {
                err: 'Theatre not found',
                code: STATUS.NOT_FOUND,
                message: `No theatre found with id ${id}` 
            }
        }
        return theatre;
    }
    catch(error){
        throw {
            err: error.message,
            code: STATUS.INTERNAL_SERVER_ERROR,
            message: "Error deleting Theatre"
        }
    }
}

const getTheatreById = async (id) => {
    try{
        const theatre = await Theatre.findById(id);
        if(!theatre){
            throw {
                err: 'Theatre not found',
                code: STATUS.NOT_FOUND,
                message: `No theatre found with id ${id}` 
            }
        }
        return theatre;
    }
    catch(error){
        throw {
            err: error.message,
            code: STATUS.INTERNAL_SERVER_ERROR,
            message: "Error getting theatre"
        }
    }
};

const updateTheatre = async (id,updateData) => {
    try{
        const theatre = await Theatre.findByIdAndUpdate(id, updateData, {returnDocument: 'after',runValidators:  true});
        //New: true option returns the updated document instead of the original document
        if(!theatre) {
            throw {
                err: 'Theatre not found',
                code: STATUS.NOT_FOUND,
                message: `No theatre found with id ${id}` 
            }
        }
        return theatre;
    }
    catch(error){
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {
                err: err,
                code: STATUS.UNPROCESSABLE,
                message: "Validation error while updating theatre"
            }
        }
        throw {
            err: error.message,
            code: STATUS.INTERNAL_SERVER_ERROR,
            message: `Error updating theatre with id ${id}` 
        }
    }
};

const fetchTheatres = async (data) => {
    try{
        let query = {};
        let pagination = {};
        if(data && data.city){
            query.city = data.city;
        }
        if(data && data.pincode){
            query.pincode = data.pincode;
        }
        if(data && data.name){
            query.name = data.name;
        }
        if(data && data.movieId){
            let movie = await Movie.findById(data.movieId); 
            query.movies = {$all: movie};
        }
        //Pagination Query
        if(data && data.limit){
            pagination.limit = data.limit;
        }
        if(data && data.skip){
            pagination.skip = data.skip;
        }
        const theatres = await Theatre.find(query,{},pagination);
        if(theatres.length === 0) {
            throw {
                err: 'No theatres found',
                code: STATUS.NOT_FOUND,
                message: `No theatres found matching the criteria` 
            }
        }
        return theatres;
    }
    catch(error){
        throw {
            err: error.message,
            code: STATUS.INTERNAL_SERVER_ERROR,
            message: `Error fetching theatres` 
        }
    }
};

const updateMoviesTheatre = async (theatreId,movieIds,insert) => {
    try{
        const theatreExists = await Theatre.findById(theatreId);
        if (!theatreExists) {
            throw {
                err: 'No theatres found',
                code: STATUS.NOT_FOUND,
                message: `No theatres found matching the criteria` 
            }
        }
        insert = Boolean(JSON.parse(insert));

        const updateAction = insert
    ? { $addToSet: { movies: { $each: movieIds } } }
    : { $pull: { movies: { $in: movieIds } } };

        const theatre = await Theatre.findByIdAndUpdate(
            theatreId,
            updateAction,
            { returnDocument: 'after' , runValidators: true }
        ).populate('movies');
        return theatre;
    }
    catch(error){
        throw {
            err: error.message,
            code: STATUS.INTERNAL_SERVER_ERROR,
            message: `Error updating movies in theatre` 
        }
    }
}

const getMoviesTheatre = async (theatreId,movieId) => {
    try{
        const movies = await Theatre.findById(theatreId,{movies:1,_id:0}).populate("movies");
        if (!movies) {
            throw {
                err: 'No Movies found',
                code: STATUS.NOT_FOUND,
                message: `No movies found matching the theatre` 
            }
        }
        return movies;
    }
    catch(error){
        throw {
            err: error.message,
            code: STATUS.INTERNAL_SERVER_ERROR,
            message: `Error fetching movies in theatre` 
        }
    }
}

const checkMovieTheatre = async (theatreId,movieId) => {
    try{
        const movies = await Theatre.find({_id:theatreId,movies: movieId}).populate("movies");
        if (!movies) {
            throw {
                err: 'No Movie found',
                code: STATUS.NOT_FOUND,
                message: `No movie found matching the theatre` 
            }
        }
        return movies;
    }
    catch(error){
        throw {
            err: error.message,
            code: STATUS.INTERNAL_SERVER_ERROR,
            message: `Error updating movies in theatre` 
        }
    }
}


module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatreById,
    updateTheatre,
    fetchTheatres,
    updateMoviesTheatre,
    getMoviesTheatre,
    checkMovieTheatre
}
