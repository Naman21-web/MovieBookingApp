const userService = require("../service/user.service");
const jwt =  require('jsonwebtoken');
const { USER_ROLE, STATUS } = require("../utils/constants");
const Theatre = require("../models/theatre.model");

const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}

const validateSignUpRequest = async (req,res,next) => {
    if(!req.body){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!req.body.name){
        badRequestResponse.err = "The name param is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!req.body.email){
        badRequestResponse.err = "The email param is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!req.body.password){
        badRequestResponse.err = "The password param is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }
    next();
}

const validateLoginRequest = async (req,res,next) => {
    if(!req.body){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!req.body.email){
        badRequestResponse.err = "The email param is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!req.body.password){
        badRequestResponse.err = "The password param is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }
    next();
}

const validateResetPasswordRequest = async (req,res,next) => {
    if(!req.body){
        badRequestResponse.err = "Request body is missing or empty";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!req.body.email){
        badRequestResponse.err = "The email param is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    if(!req.body.password){
        badRequestResponse.err = "The password param is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }
    if(!req.body.password){
        badRequestResponse.err = "The password param is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }
    if(!req.body.newPassword){
        badRequestResponse.err = "The new password param is not present in the request sent";
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }
    next();
}

const isAuthenticated = async (req,res,next) => {
    try{
        const token = req.headers["x-access-token"];
        if(!token){
            badRequestResponse.err = "No token provided";
            return res.status(STATUS.FORBIDDEN).json(badRequestResponse); 
        }
        const response = jwt.verify(token,process.env.JWT_KEY);
        if(!response){
            badRequestResponse.err = "Invalid token";
            return res.status(STATUS.FORBIDDEN).json(badRequestResponse); 
        }
        const user = await userService.getUserById(response.id);
        req.user = user._id;
        next();
    }
    catch(error){
        if(error.name == "JsonWebTokenError"){
            badRequestResponse.err = error.message;
            return res.status(STATUS.UNAUTHORISED).json(badRequestResponse);
        }
        if(error.code == 404){
            badRequestResponse.err = "Invalid token provided";
            badRequestResponse.message = "Please provide valid token details";
            return res.status(error.code).json(badRequestResponse);
        }
        badRequestResponse.err = error;
        badRequestResponse.message = "Something went wrong, cant verify token"
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(badRequestResponse)
    }
};

const isAdmin = async (req,res,next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.admin){
        badRequestResponse.err = "User is not authorised to perform this action";
        return res.status(STATUS.UNAUTHORISED).json(badRequestResponse);
    }
    next();
};

const isClient = async (req,res,next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.client){
        badRequestResponse.err = "User is not authorised to perform this action";
        return res.status(STATUS.UNAUTHORISED).json(badRequestResponse);
    }
    next();
};

const isAdminOrClient = async (req,res,next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.client && user.userRole != USER_ROLE.admin){
        badRequestResponse.err = "User is not authorised to perform this action";
        return res.status(STATUS.UNAUTHORISED).json(badRequestResponse);
    }
    next();
};

const isAdminOrOwner = async (req,res,next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole != USER_ROLE.client && user.userRole != USER_ROLE.admin){
        badRequestResponse.err = "User is not authorised to perform this action";
        return res.status(STATUS.UNAUTHORISED).json(badRequestResponse);
    }
    const theatreId = req.params.theatreId ?? req.body.theatreId;
    const theatre = await Theatre.findById(theatreId);
    if(theatre.owner.toString() != user._id && user.userRole != USER_ROLE.admin){
        badRequestResponse.err = "User is not authorised to perform this action";
        return res.status(STATUS.UNAUTHORISED).json(badRequestResponse);
    }
    next();
};

module.exports = {
    validateSignUpRequest,
    validateLoginRequest,
    validateResetPasswordRequest,
    isAuthenticated,
    isAdmin,
    isClient,
    isAdminOrClient,
    isAdminOrOwner
}