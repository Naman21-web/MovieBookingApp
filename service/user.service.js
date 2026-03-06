const User = require("../models/user.model");

const createUser = async(data) => {
    try{
        const response = await User.create(data);
        return response;
    }
    catch(error){
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