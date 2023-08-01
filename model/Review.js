const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    rate: {

    },
    user: {

    },
    contents: {

    },
    review_img: {

    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Review", ReviewSchema);