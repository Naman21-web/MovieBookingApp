const mongoose = require("mongoose");
const ShowSeat = require("../models/showSeat.model");
const SeatService = require("../service/seat.service");
const { STATUS } = require("../utils/constants");
const RedisSeats = require("../redis/redis");

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
        const seats = await ShowSeat.find({showId},{createdAt:0,updatedAt:0}).lean();
        const lockedSeats = await RedisSeats.getLockedSeats(showId);

        const lockedSet = new Set(lockedSeats);

        return seats.map(seat => {

            if (seat.status === "BOOKED") {
                return { ...seat, status: "BOOKED" };
            }

            if (lockedSet.has(seat.seatNumber)) {
                return { ...seat, status: "LOCKED" };
            }

            return { ...seat, status: "AVAILABLE" };
        });
        // return seats;
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

const lockShowSeats = async (showId, seatNumbers, bookingId) => {
    // const session = await mongoose.startSession();
    try{
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        const seats = await ShowSeat.find({
            showId,
            seatNumber: { $in: seatNumbers }
        });

        if (seats.length !== seatNumbers.length) {
            throw {
                err: "Invalid seat selection",
                code: STATUS.BAD_REQUEST
            }
        }

        const alreadyBooked = seats.some(seat => seat.status === "BOOKED");

        if (alreadyBooked) {
            throw {
                err: "Some seats are already booked",
                code: STATUS.BAD_REQUEST
            }    
        }



        // console.log(seats,showId);
        // session.startTransaction();
        // const result = await ShowSeat.updateMany(
        //     {
        //         showId,
        //         seatNumber: { $in: seatNumbers },
        //         $or: [
        //                 { status: "AVAILABLE" },
        //                 {
        //                     status: "LOCKED",
        //                     expiresAt: { $lt: new Date() }
        //                 }
        //             ]
        //     },
        //     {
        //         $set: {
        //             status: "LOCKED",
        //             lockedBy: bookingId,
        //             lockedAt: new Date(),
        //             expiresAt
        //         }
        //     },
        //     // {
        //     //     session
        //     // }
        // );
        // if(result.modifiedCount != seatNumbers.length){
        //     await ShowSeat.updateMany(
        //         {
        //             showId,
        //             seatNumber: { $in: seatNumbers },
        //             lockedBy: bookingId 
        //         },
        //         {
        //             $set: { status: "AVAILABLE" },
        //             $unset: {
        //                 lockedBy: "",
        //                 lockedAt: "",
        //                 expiresAt: ""
        //             }
        //         }
        //     );
        //     throw {
        //         err: "Some seats are already booked",
        //         code: STATUS.BAD_REQUEST
        //     }
        // }
        // await session.commitTransaction();
        // session.endSession();
        const lockedSeats = await RedisSeats.lockSeatsRedis(showId,seatNumbers,bookingId);
        return lockedSeats;
    }
    catch(error){
        console.log(error); 
        // await session.abortTransaction();
        // session.endSession();
        throw error;
    }
}; 

module.exports = {
    createShowSeats,
    getShowSeats,
    lockShowSeats
}