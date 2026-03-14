const Show = require("../models/show.model");
const { STATUS } = require("../utils/constants");

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

const getShows = async (data) => {
    try{
        let filter = {};
        if(data.theatreId){
            filter.theatreId = data.theatreId;
        }
        if(data.movieId){
            filter.movieId = data.movieId;
        }
        const response = await Show.find(filter);
        if(!response){
            throw {
                err: "No shows found",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    }
    catch(error){
        throw error;
    }
};

const deleteShow = async (data) => {
    try{
        const response = await Show.findByIdAndDelete(data);
        if(!response){
            throw {
                err: "No shows found",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    }
    catch(error){
        throw error;
    }
};

const updateShow = async (showId,data) => {
    try{
        const response = await Show.findByIdAndUpdate(showId,data,{returnDocument: 'after',runValidators:true});
        if(!response){
            throw {
                err: "No shows found",
                code: STATUS.NOT_FOUND
            }
        }
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
    createShow,
    getShows,
    deleteShow,
    updateShow
}