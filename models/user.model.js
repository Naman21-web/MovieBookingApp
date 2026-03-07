const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {USER_ROLE,USER_STATUS} = require('../utils/constants');

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
        enum: {
            values: [USER_ROLE.customer,USER_ROLE.admin,USER_ROLE.client],
            message: "Invalid User Role given"
        },            
        default: USER_ROLE.customer
    } ,
    userStatus: {
        type: String,
        required: true,
        enum: {
            values: [USER_STATUS.pending,USER_STATUS.approved,USER_STATUS.rejected],
            message: "Invalid User Status given"
        },
        default: USER_STATUS.approved
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

userSchema.methods.isValidPassword = async function(plainPassword) {
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword,currentUser.password);
    return compare;
}

const User = mongoose.model('User',userSchema);

module.exports = User; 