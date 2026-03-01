const mongoose = require('mongoose');
/*
    Schema defines theatre resource to be stored in the db.
*/
const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    description:{
        type: String,
    },
    city:{
        type: String,
        required: true
    },
    pinCode:{
        type: Number,
        required: true
    },
    address: String,
}, {timestamps: true});

const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;