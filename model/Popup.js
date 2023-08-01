const mongoose = require("mongoose");

const PopupSchema = new mongoose.Schema({
    corperation: {

    },
    title: {

    },
    contents: {

    },
    tag: {

    },
    popup_img: [{

    }],
    review: [{

    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model("Popup", PopupSchema);