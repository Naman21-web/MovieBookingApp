const SeatService = require("../service/seat.service");
const { STATUS } = require("../utils/constants");
const { errorResponseBody, successResponseBody } = require("../utils/responseBody");

const createSeats = async(req,res) => {
    try{
        const response = await SeatService.createSeats(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Seats created successfully";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error creating Seats";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).errorResponseBody;
    }
};

const getSeats = async (req,res) => {
    try{
        const response = await SeatService.getSeats(req.params.theatreId);
        successResponseBody.data = response;
        successResponseBody.message = "Seats fetched successfully";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error fetching Seats";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).errorResponseBody;
    }
}

const updateSeat = async (req,res) => {
    try{
        const response = await SeatService.updateSeat(req.params.seatId,req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Seat updated successfully";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error updating Seat";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).errorResponseBody;
    }
};

const deleteSeat = async (req,res) => {
    try{
        const response = await SeatService.deleteSeat(req.params.seatId);
        successResponseBody.data = response;
        successResponseBody.message = "Seat deleted successfully";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error updating Seat";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).errorResponseBody;
    }
};

module.exports = {
    createSeats,
    getSeats,
    updateSeat,
    deleteSeat
}