const userService = require('../service/user.service');
const {successResponseBody, errorResponseBody} = require('../utils/responseBody');


const signup = async (req,res) => {
    try{
       const response = await userService.createUser(req.body);
       console.log(response);
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
        if(error.err){
           errorResponseBody.err = error.err;
            errorResponseBody.message = "Validation Failed, cannot create user profile"; 
            res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        errorResponseBody.message = "Failed to create user profile";
        res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    signup
}