const Theatre = require('../models/theatre.model');

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
            return {
                err: err,
                code: 422,
                message: "Validation error while creating theatre"
            }
        }
        return {
            err: error.message,
            code: 500,
            message: "Error creating theatre"
        }
    }
};

const deleteTheatre = async(id) => {
    try{
        const theatre = await Theatre.findByIdAndDelete(id);
        if(!theatre){
            return {
                err: 'Theatre not found',
                code: 404,
                message: `No theatre found with id ${id}` 
            }
        }
        return theatre;
    }
    catch(error){
        return {
            err: error.message,
            code: 500,
            message: "Error deleting Theatre"
        }
    }
}

const getTheatreById = async (id) => {
    try{
        const theatre = await Theatre.findById(id);
        if(!theatre){
            return {
                err: 'Movie not found',
                code: 404,
                message: `No movie found with id ${id}` 
            }
        }
        return theatre;
    }
    catch(error){
        return {
            err: error.message,
            code: 500,
            message: "Error getting theatre"
        }
    }
};

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatreById
}
