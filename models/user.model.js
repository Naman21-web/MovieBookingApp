const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
,"Please fill a valid email"],
        lowercase: true,
        trim: true            
    },
    password: {
        type:String,
        required: true,
        minLength: 6
    },
    userRole: {
        type: String,
        required: true,
        default: "CUSTOMER"
    } ,
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
    }
},{timestamps: true});

userSchema.pre('save', async function() {
    //trigger to encrypt the plain password before saving password
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    } catch (error) {
        throw error; // Let Mongoose handle the error
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User; 