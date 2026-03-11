const Booking = require('../models/booking.model');
const { STATUS } = require("../utils/constants");

const createBooking = async (data) => {
    try{
                
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

const updateBooking = async (data,bookingId) => {
    try{
        const response = await Booking.findByIdAndUpdate(bookingId,data,{new:true,runValidators:true});
        if(!response){
            throw {
                err: "No booking found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    }
    catch(error){
        if(error.name = 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err: err,
                code: STATUS.UNPROCESSABLE
            };
        }
        throw error;
    }
}

module.exports = {
    createBooking,
    updateBooking
}