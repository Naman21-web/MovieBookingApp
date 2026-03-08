const userService = require("../service/user.service");
const jwt =  require('jsonwebtoken');
const { USER_ROLE } = require("../utils/constants");

const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}

const validateSignUpRequest = async (req,res,next) => {
    if(!req.body){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.name){
        badRequestResponse.err = "The name param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.email){
        badRequestResponse.err = "The email param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.password){
        badRequestResponse.err = "The password param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }
    next();
}

const validateLoginRequest = async (req,res,next) => {
    if(!req.body){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.email){
        badRequestResponse.err = "The email param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.password){
        badRequestResponse.err = "The password param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }
    next();
}

const validateResetPasswordRequest = async (req,res,next) => {
    if(!req.body){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.email){
        badRequestResponse.err = "The email param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.password){
        badRequestResponse.err = "The password param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.password){
        badRequestResponse.err = "The password param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }
    if(!req.body.newPassword){
        badRequestResponse.err = "The new password param is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }
    next();
}

const isAuthenticated = async (req,res,next) => {
    try{
        const token = req.headers["x-access-token"];
        if(!token){
            badRequestResponse.err = "No token provided";
            return res.status(403).json(badRequestResponse); 
        }
        const response = jwt.verify(token,process.env.JWT_KEY);
        if(!response){
            badRequestResponse.err = "Invalid token";
            return res.status(403).json(badRequestResponse); 
        }
        const user = await userService.getUserById(response.id);
        req.user = user._id;
        next();
    }
    catch(error){
        if(error.name == "JsonWebTokenError"){
            badRequestResponse.err = error.message;
            return res.status(401).json(badRequestResponse);
        }
        if(error.code == 404){
            badRequestResponse.err = "Invalid token provided";
            badRequestResponse.message = "Please provide valid token details";
            return res.status(error.code).json(badRequestResponse);
        }
        badRequestResponse.err = error;
        badRequestResponse.message = "Something went wrong, cant verify token"
        return res.status(500).json(badRequestResponse)
    }
};

const isAdmin = async (req,res,next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.admin){
        badRequestResponse.err = "User is not authorised to perform this action";
        return res.status(401).json(badRequestResponse);
    }
    next();
};

const isClient = async (req,res,next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.client){
        badRequestResponse.err = "User is not authorised to perform this action";
        return res.status(401).json(badRequestResponse);
    }
    next();
};

const isAdminOrClient = async (req,res,next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.client && user.userRole != USER_ROLE.admin){
        badRequestResponse.err = "User is not authorised to perform this action";
        return res.status(401).json(badRequestResponse);
    }
    next();
};

module.exports = {
    validateSignUpRequest,
    validateLoginRequest,
    validateResetPasswordRequest,
    isAuthenticated,
    isAdmin,
    isClient
}