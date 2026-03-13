const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");
const User = require("../models/user.model")
const { STATUS, BOOKING_STATUS, PAYMENT_STATUS, USER_ROLE } = require("../utils/constants");

const createPayment = async (data) => {
    try{
        const booking = await Booking.findById(data.bookingId);
        if(!booking){
            throw {
                err: "No booking found",
                code: STATUS.NOT_FOUND 
            }
        }
        if(booking.status === BOOKING_STATUS.successful){
            throw {
                err: "Booking already done, cannot make a new payment against it",
                code: STATUS.FORBIDDEN
            }
        }
        let bookingTime =  booking.createdAt;
        let currentTime = Date.now();

        let minutes = Math.floor(((currentTime-bookingTime)/1000)/60);
        if(minutes > 5){
            booking.status = BOOKING_STATUS.expired;
            await booking.save();
            throw {
                err: "Payment took more than 5 minutes to complete",
                data: booking,
                code: STATUS.GONE
            }    
        }
        const payment = await Payment.create({
            booking: data.bookingId,
            amount: data.amount
        });
        if(payment.amount < booking.totalCost){
            payment.status = PAYMENT_STATUS.failed;
        }
        if(!payment || payment.status == PAYMENT_STATUS.failed){
            booking.status = BOOKING_STATUS.cancelled;
            await booking.save();
            await payment.save();
            throw {
                err: "Payment failed due to some reason,booking was not successful,please try again",
                data: booking,
                code: STATUS.PAYMENT_REQUIRED
            }   
        }
        booking.status = BOOKING_STATUS.successful;
        payment.status = PAYMENT_STATUS.success;
        await booking.save();
        await payment.save();
        return booking;
    }
    catch(error){
        if(error.name === "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: 422
            }
        }
        throw error;
    }
};

const getPaymentById = async (id) => {
    try{    
        const payment = await Payment.findById(id).populate("booking");
        if(!payment){
            throw {
                err: "No payment record found",
                code: STATUS.NOT_FOUND
            }
        }
        return payment;
    }
    catch(error){
        throw error;
    }
};

const getAllPayments = async (id) => {
    try{
        const user = await User.findById(id);
        let payments;
        if(user.userRole === USER_ROLE.admin){
            payments = await Payment.find({}).populate("booking");
        }
        else{
            // payments = await Payment.find({}).populate({
            //     path: "booking",
            //     match: {
            //         userId: id
            //     }
            // });
            // payments = payments.filter(p => p.booking);
            const bookings = await Booking.find({ userId: id });
            payments = await Payment.find({
                            booking: { $in: bookings.map(b => b._id) }
                        }).populate("booking");
        }
        if(!payments){
            throw {
                err: "No payment found",
                code: STATUS.NOT_FOUND 
            }
        }
        return payments;
    }
    catch(error){
        throw error;
    }
} 

module.exports = {
    createPayment,
    getPaymentById,
    getAllPayments
}