const Show = require("../models/show.model");

const createShow = async (data) => {
    try{
        const response = await Show.create(data);
        return response;
    }
    catch(error){
        if(error.name === "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: 422
            }
        }
        throw error;
    }
};

module.exports = {
    createShow
}