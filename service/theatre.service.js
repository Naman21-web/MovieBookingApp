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
            message: "Error getting theatre"
        }
    }
};

const updateTheatre = async (id,updateData) => {
    try{
        const theatre = await Theatre.findByIdAndUpdate(id, updateData, {returnDocument: 'after'});
        //New: true option returns the updated document instead of the original document
        if(!theatre) {
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
            message: `Error updating theatre with id ${id}` 
        }
    }
};

const fetchTheatres = async (filter) => {
    try{
        let query = {};
        if(filter.name){
           query.name = { $regex: filter.name, $options: 'i' }; // Case-insensitive search 
        }
        const theatres = await Theatre.find(query);
        if(theatres.length === 0) {
            return {
                err: 'No theatres found',
                code: 404,
                message: `No theatres found matching the criteria` 
            }
        }
        return theatres;
    }
    catch(error){
        return {
            err: error.message,
            code: 500,
            message: `Error fetching theatres` 
        }
    }
};


module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatreById,
    updateTheatre,
    fetchTheatres
}
