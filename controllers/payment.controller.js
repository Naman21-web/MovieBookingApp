const PaymentService = require("../service/payment.service");
const EmailService = require("../service/email.service");
const { STATUS } = require("../utils/constants");
const { errorResponseBody, successResponseBody } = require("../utils/responseBody");
const Movie = require("../models/movie.model");
const User = require("../models/user.model");
const Theatre = require("../models/theatre.model");

const createPayment = async (req,res) => {
    try{
        const response = await PaymentService.createPayment(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Payment completed successfully";

        const subject = "Your Booking is sucessful"
        const user = await User.findById(response.userId);
        const recepientEmails = [user.email];
        const movie = await Movie.findById(response.movieId);
        const theatre = await Theatre.findById(response.theatreId);
        const movieName = movie.name;
        const theatreName = theatre.name;
        const content = `Your booking for movie ${movieName} in ${theatreName} for ${response.noOfSeats} on ${response.timing} has been successful. Your booking id is ${response._id}`;
        EmailService.sendMail(subject,recepientEmails,content);
        
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
            if(error.data) errorResponseBody.data = error.data;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error completing payment";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getPaymentDetailsById = async (req,res) => {
    try{
        const response = await PaymentService.getPaymentById(req.params.paymentId);
        console.log("Response: ",response);
        successResponseBody.data = response;
        successResponseBody.message = "Payment details fetched successfully";
        return res.status(STATUS.OK).json(successResponseBody);

    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error fetching payment";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getAllPayments = async (req,res) => {
    try{
        const userId = req.user;
        const response = await PaymentService.getAllPayments(userId);
        successResponseBody.data = response;
        successResponseBody.message = "All Payments fetched successfully";
        res.status(STATUS.OK).json(successResponseBody);

    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to get all payments";
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    createPayment,
    getPaymentDetailsById,
    getAllPayments
}