const BookingService = require('../service/booking.service'); 
const {successResponseBody, errorResponseBody} = require('../utils/responseBody');
const {STATUS} =  require("../utils/constants");

const createBooking = async (req,res) => {
    try{
        const userId = req.user;
        const response = await BookingService.createBooking({...req.body,userId});
        successResponseBody.data = response;
        successResponseBody.message = "Booking created successfully";
        res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to create booking";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const updateBooking = async (req,res) => {
    try{
        const response = await BookingService.updateBooking(req.body,req.params.bookingId);
        successResponseBody.data = response;
        successResponseBody.message = "Booking updated successfully";
        res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to create booking";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getBookings = async (req,res) => {
    try{
        const response = await BookingService.getBookings({userId:req.user});
        successResponseBody.data = response;
        successResponseBody.message = "Bookings for user fetched successfully";
        res.status(STATUS.OK).json(successResponseBody);

    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to create booking";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getAllBookings = async (req,res) => {
    try{
        const response = await BookingService.getAllBookings();
        successResponseBody.data = response;
        successResponseBody.message = "All Bookings for fetched successfully";
        res.status(STATUS.OK).json(successResponseBody);

    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to create booking";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};


module.exports = {
    createBooking,
    updateBooking,
    getBookings,
    getAllBookings
}