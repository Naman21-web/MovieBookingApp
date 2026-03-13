const PaymentService = require("../service/payment.service");
const { STATUS } = require("../utils/constants");
const { errorResponseBody, successResponseBody } = require("../utils/responseBody");

const createPayment = async (req,res) => {
    try{
        const response = await PaymentService.createPayment(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Payment completed successfully";
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.message;
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
}

module.exports = {
    createPayment,
    getPaymentDetailsById
}