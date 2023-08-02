const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    admin: {
        type: Boolean,
        default: false,
    },
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
    },
    birth: {
        type: Date,
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