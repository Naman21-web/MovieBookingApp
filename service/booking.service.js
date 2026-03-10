const Booking = require('../models/booking.model');
const Theatre = require('../models/theatre.model');
const { STATUS } = require("../utils/constants");

const createBooking = async (data) => {
    try{
        const movie = await Theatre.find({_id:data.theatreId,movies: data.movieId});
        if (movie.length == 0) {
            throw {
                err: 'No Movie found',
                code: STATUS.NOT_FOUND,
                message: `No movie found matching the theatre` 
            }
        }        
        const booking = new Booking(data);
        await booking.save();
        return booking; 
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
        throw error;
    }
};

module.exports = {
    createBooking
}