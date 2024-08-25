
const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },

   
    });

const User = model('User', userSchema);

module.exports = User;  

