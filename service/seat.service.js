const Seat =  require("../models/seat.model");
const { STATUS } = require("../utils/constants");

const createSeats = async (data) => {
    try{
        const totalRows = data.totalRows;
        const seatsPerRow = data.seatsPerRow;
        const theatreId = data.theatreId;
        const seats = [];

        for (let i = 0; i < totalRows; i++) {
            const rowLetter = String.fromCharCode(65 + i); // A,B,C,D...

            for (let j = 1; j <= seatsPerRow; j++) {
                seats.push({
                    theatreId,
                    row: rowLetter,
                    seatNumber: `${rowLetter}${j}`
                });
            }
        }

        const createdSeats = await Seat.insertMany(seats);
        return createdSeats;
    }
    catch(error){
        if(error.name = "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE
            }
        }
        throw error;
    }
};

const getSeats = async (theatreId) => {
    try{
        const seats = await Seat.find({theatreId});
        return seats;
    }
    catch(error){
        throw error;
    }
};

const updateSeat = async (seatId,data) => {
    try{
        const seat = await Seat.findByIdAndUpdate(seatId,data,{new:true,runValidators:true});
        return seat;
    }
    catch(error){
        if(error.name = "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE
            }
        }
        throw error;
    }
};

const deleteSeat = async (seatId) => {
    try{
        const seat = await Seat.findByIdAndDelete(seatId);
        return seat;
    }
    catch(error){
        throw error;
    }
};

module.exports = {
    createSeats,
    getSeats,
    updateSeat,
    deleteSeat
}