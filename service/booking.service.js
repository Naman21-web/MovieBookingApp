const Booking = require('../models/booking.model');
const Show = require("../models/show.model");
const ShowSeatService = require("../service/showSeat.service");
const mongoose = require("mongoose");
const { STATUS } = require("../utils/constants");

const createBooking = async (data) => {
    try{
        const show = await Show.findOne({
            movieId:data.movieId,
            theatreId:data.theatreId,
            timing:data.timing
        }); 
        if(!show){
            throw {
                err: "No show found",
                code: STATUS.NOT_FOUND
            }
        }
        const validSeats = await ShowSeat.find({
            showId,
            seatNumber: { $in: seatNumbers }
        });

        if (validSeats.length !== seatNumbers.length) {
            throw {
                err: "Invalid seat selected",
                code: STATUS.NOT_FOUND
            }
        }
        data.totalCost =  data.noOfSeats*show.price; 
        const bookingId = new mongoose.Types.ObjectId();    
        const modifiedSeats =  await ShowSeatService.lockShowSeats(show._id, data.seatNumbers, bookingId);
        const booking = new Booking({_id:bookingId,...data});
        // show.noOfSeats -= data.noOfSeats; 
        await show.save();
        await booking.save();
        return booking; 
    }
    catch(error){
        console.log(error);
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
};

const getBookings = async (data) => {
    try{
        const response = await Booking.find(data);
        return response;
    }
    catch(error){
        throw error;
    }
}

const getAllBookings = async () => {
    try{
        const response = await Booking.find();
        return response;
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    createBooking,
    updateBooking,
    getBookings,
    getAllBookings
}