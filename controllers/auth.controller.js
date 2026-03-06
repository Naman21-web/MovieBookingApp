const userService = require('../service/user.service');
const {successResponseBody, errorResponseBody} = require('../utils/responseBody');


const signup = async (req,res) => {
    try{
       const response = await userService.createUser(req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "User Profile created successfully";
        res.status(201).json(successResponseBody); 
    }
    catch(error){
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to create user profile";
        res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    signup
}