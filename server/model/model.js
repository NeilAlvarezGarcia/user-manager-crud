const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        gender: String,
        status: {
            type: String,
            default: "Inactive",
        },
    }, 
    { 
        timestamps: true, 
        versionKey: false 
    }
);

const userDB = mongoose.model('userdb', schema);

module.exports = userDB;