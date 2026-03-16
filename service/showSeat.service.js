const mongoose = require("mongoose");
const ShowSeat = require("../models/showSeat.model");
const SeatService = require("../service/seat.service");
const { STATUS } = require("../utils/constants");

const createShowSeats = async (data) => {
    try{
        let newSeats = [];
        const theatreId = data.theatreId;
        const showId = data._id;
        const seats = await SeatService.getSeats(theatreId);
        for(seat of seats){
            newSeats.push({
                showId,
                seatId:seat._id,
                seatNumber:seat.seatNumber,
                row:seat.row 
            });
        }
        await ShowSeat.insertMany(newSeats);
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

const getShowSeats = async (showId) => {
    try{
        const seats = await ShowSeat.find({showId},{createdAt:0,updatedAt:0});
        return seats;
    }
    catch(error){
        throw err;
    }
};

const lockShowSeats = async (showId, seatNumbers, bookingId) => {
    const session = await mongoose.startSession();
    try{
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        const seats = await ShowSeat.find({
        showId,
        seatNumber: { $in: seatNumbers }
        });

        console.log(seats,showId);
        session.startTransaction();
        const result = await ShowSeat.updateMany(
            {
                showId,
                seatNumber: { $in: seatNumbers },
                status: "AVAILABLE"
            },
            {
                $set: {
                    status: "LOCKED",
                    lockedBy: bookingId,
                    lockedAt: new Date(),
                    expiresAt
                }
            },
            {
                session
            }
        );
        if(result.modifiedCount != seatNumbers.length){
            throw {
                err: "Some seats are already booked",
                code: STATUS.BAD_REQUEST
            }
        }
        await session.commitTransaction();
        session.endSession();
        return result.modifiedCount;
    }
    catch(error){
        console.log(error); 
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}; 

module.exports = {
    createShowSeats,
    getShowSeats,
    lockShowSeats
}