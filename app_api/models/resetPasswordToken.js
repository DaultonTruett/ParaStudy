const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetTokenSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: "users",
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900 // seconds
    },
});


const Token = mongoose.model("resetPasswordToken", resetTokenSchema);
module.exports = Token;