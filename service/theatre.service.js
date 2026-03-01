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

module.exports = {
    createTheatre
}
