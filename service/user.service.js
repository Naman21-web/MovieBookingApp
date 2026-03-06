const User = require("../models/user.model");

const createUser = async(data) => {
    try{
        const response = await User.create(data);
        return response;
    }
    catch(error){
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {
                err: err,
                code: 422
            };
        }
        return {
            err: error.message,
            code: 500,
            message: `Error Creating User` 
        }
    }
};

module.exports = {
    createUser
}