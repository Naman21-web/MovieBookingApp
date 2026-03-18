const ShowService = require("../service/show.service");
const { STATUS } = require("../utils/constants");
const { errorResponseBody, successResponseBody } = require("../utils/responseBody");

const createShow = async(req,res) => {
    try{
        const response = await ShowService.createShow(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Show created successfully";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error creating show";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).errorResponseBody
    }
};

const getShows = async (req,res) => {
    try{
        const response = await ShowService.getShows(req.query);
        successResponseBody.data = response;
        successResponseBody.message = "Shows fetched successfully";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error fetching show";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const deleteShow = async(req,res) => {
    try{
        const response = await ShowService.deleteShow(req.params.showId);
        successResponseBody.data = response;
        successResponseBody.message = "Show deleted successfully";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error deleting show";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).errorResponseBody
    }
};

const updateShow = async(req,res) => {
    try{
        const response = await ShowService.updateShow(req.params.showId,req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Show updated successfully";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = err.message;
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Error updating show";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).errorResponseBody
    }
};

module.exports = {
    createShow,
    getShows,
    deleteShow,
    updateShow
}