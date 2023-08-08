const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    popup: {
        type: Schema.Types.ObjectId,
        ref: 'Popup',
    },
    contents: {
        type: String,
        required: true,
    },
    review_img: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Review", ReviewSchema);