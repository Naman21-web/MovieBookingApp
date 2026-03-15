const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    seatNumber:{
        type: String,
        required: true
    },
    row:{
        type:String,
        required: true
    },
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const seat = mongoose.model("Seat", seatSchema);
module.exports = seat;