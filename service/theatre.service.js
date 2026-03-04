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

const fetchTheatres = async (data) => {
    try{
        let query = {};
        let pagination = {};
        // if(filter.name){
        //    query.name = { $regex: filter.name, $options: 'i' }; // Case-insensitive search 
        // }
        if(data && data.city){
            query.city = city;
        }
        if(data && data.pincode){
            query.pincode = city;
        }
        if(data && data.name){
            query.name = name;
        }
        if(data && data.limit){
            pagination.limit = data.limit;
        }
        if(data && data.skip){
            pagination.skip = data.skip;
        }
        const theatres = await Theatre.find(query,{},pagination);
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

const updateMoviesTheatre = async (theatreId,movieIds,insert) => {
    try{
        const theatreExists = await Theatre.findById(theatreId);
        if (!theatreExists) {
            return {
                err: 'No theatres found',
                code: 404,
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
        return {
            err: error.message,
            code: 500,
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
    updateMoviesTheatre
}
