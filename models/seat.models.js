const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    seatNo:{
        type: String,
        required: true
    },
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});