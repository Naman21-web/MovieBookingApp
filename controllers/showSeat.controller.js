const ShowSeatService = require("../service/showSeat.service");
const { STATUS } = require("../utils/constants");
const { errorResponseBody, successResponseBody } = require("../utils/responseBody");

const getShowSeats = async (req,res) => {
    try{
        const response = await ShowSeatService.getShowSeats(req.params.showId);
        successResponseBody.data = response;
        successResponseBody.message = "Shows fetched successfully";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error fetching show";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

module.exports = {
    getShowSeats
}