const Theatre = require('../models/theatre.model');

const createTheatre = async (data) => {
    try{
        const theatre = new Theatre(data);
        await theatre.save();
        return theatre;
    }
    catch(error){
        return {
            err: error.message,
            code: 500,
            message: "Error creating theatre"
        }
    }
};

module.exports = {
    createTheatre
}
