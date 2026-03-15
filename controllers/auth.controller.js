const userService = require('../service/user.service');
const {successResponseBody, errorResponseBody} = require('../utils/responseBody');
const jwt =  require('jsonwebtoken');

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
        return res.status(201).json(successResponseBody); 
    }
    catch(error){
        if(error.err){
           errorResponseBody.err = error.err;
            errorResponseBody.message = "Validation Failed, cannot create user profile"; 
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        errorResponseBody.message = "Failed to create user profile";
        return res.status(500).json(errorResponseBody);
    }
}

const signin = async ( req,res) => {
    try{
        const response = await userService.loginUser(req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }

        const token = jwt.sign(
            {id: response.id, email:response.email},process.env.JWT_KEY,
            {expiresIn: '1h'}
        );

        successResponseBody.data = {
            id:response._id,
            email:  response.email,
            role: response.userRole,
            status: response.userStatus,
            token: token
        };
        successResponseBody.message = "User Profile logged in successfully";
        return res.status(200).json(successResponseBody); 
    }
    catch(error){
        if(error.err){
           errorResponseBody.err = error.err;
            if(error.message) errorResponseBody.message = error.message;
            else errorResponseBody.message = "Validation Failed, cannot login to user profile"; 
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to login to user profile";
        return res.status(500).json(errorResponseBody);
    }
};

const resetPassword = async (req,res) => {
    try{
        const response = await userService.resetPassword(req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = response.message;
            return res.status(response.code).json(errorResponseBody);
        }

        // successResponseBody.data = {
        //     email:  response.email,
        //     role: response.userRole,
        //     status: response.userStatus,
        //     token: token
        // };
        successResponseBody.message = "User password reset successfull";
        return res.status(200).json(successResponseBody); 

    }
    catch(error){
        if(error.err){
           errorResponseBody.err = error.err;
            if(error.message) errorResponseBody.message = error.message;
            else errorResponseBody.message = "Validation Failed, cannot reset password for user profile"; 
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error.message;
        errorResponseBody.message = "Failed to reset password for user profile";
        return res.status(500).json(errorResponseBody);
    }
} 

module.exports = {
    signup,
    signin,
    resetPassword
}