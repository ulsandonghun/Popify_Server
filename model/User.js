const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    birth: {
        type: String,
        default: '',
    },
    phone_number: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);