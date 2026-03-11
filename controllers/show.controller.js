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
}

module.exports = {
    createShow
}