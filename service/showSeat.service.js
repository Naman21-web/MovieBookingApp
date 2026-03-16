const mongoose = require("mongoose");
const showSeat = require("../models/showSeat.model");
const SeatService = require("../service/seat.service");

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
        await showSeat.insertMany(newSeats);
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

module.exports = {
    createShowSeats
}