const userService = require("../service/user.service");
const { errorResponseBody, successResponseBody } = require("../utils/responseBody");
const {STATUS} = require("../utils/constants");

const updateUser = async (req,res) => {
    try{
        const response = await userService.updateUserRoleOrStatus(req.body,req.params.userId);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.message = "User details updated successfully";
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            if(error.message) errorResponseBody.message = error.message;
            else errorResponseBody.message = "Cannot update details for user profile"; 
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to reset password for user profile";
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

module.exports = {
    updateUser
} 