const User = require("../models/user.model");
const {USER_ROLE,USER_STATUS} = require('../utils/constants');

const createUser = async(data) => {
    try{
        if(data.userRole || data.userRole == USER_ROLE.customer){
            if(data.userStatus && data.userStatus != USER_STATUS.approved){
                throw {
                    err: "We cannot set any other status for User",
                    code: 400
                }
            }
        }
        if(data.userRole && data.userRole != USER_ROLE.customer){
            data.userStatus = USER_STATUS.pending;
        }
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
        throw error;
    }
};

const loginUser = async (data) => {
    try{
        const email = data.email;
        const user = await User.findOne({email});
        if(!user){
            throw {
                err: 'No User found',
                code: 404,
                message: `No user found matching the details` 
            }
        }
        const isValidPassword = await user.isValidPassword(data.password);
        if(!isValidPassword){
            throw {
                err: "Invalid user details",
                code: 401,
                message: `No user found matching the details` 
            }
        }
        return user;
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
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try{
        const response = await User.findOne({
            email
        });
        if(!response){
            throw {
                err: "Invalid user details",
                code: 404
            }
        }
    }
    catch(error){
        throw error;
    }
}

const getUserById = async (id) => {
    try{
        const user = await User.findById(id);
        if(!user){
            throw {
                err: "No user found",
                code: 404
            }
        }
        return user;
    }
    catch(error){
        throw error;
    }
}

const resetPassword = async (data) => {
    try{
        const loginData = {
            email: data.email,
            password: data.password,
        }
        const user = await loginUser(loginData);
        if(!user){
            throw {
                err: "Invalid user details",
                code: 403
            }
        }
        user.password = data.newPassword;
        await user.save();
        return user;
    }
    catch(error){
        if(error.code) error.code = 403;
        throw error;
    }
};

const updateUserRoleOrStatus = async (data,userId) => {
    try{
        let updateQuery = {};
        if(data.userRole) updateQuery.userRole = data.userRole;
        if(data.userStatus) updateQuery.userStatus = data.userStatus;
        let response = await User.findOneAndUpdate(
            {
                _id:userId
            },
            updateQuery, {
                returnDocument: "after",
                runValidators: true, 
                projection: {password: 0}
            }
        );
        if(!response) throw {
            err: "No user found for the given id",
            code: 404
        };
        return response;
    }
    catch(error){
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {
                err: err,
                code: 422,
                message: "Validation error while updating theatre"
            }
        }
        throw error;
    }
}

module.exports = {
    createUser,
    loginUser,
    getUserByEmail,
    getUserById,
    resetPassword,
    updateUserRoleOrStatus
}