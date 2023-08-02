const mongoose = require("mongoose");

const PopupSchema = new mongoose.Schema({
    title: {
        type: String,
        default: '',
    },
    tag: {
        type: String,
        default: '',
    },
    popup_imgs: [{
        type: String,
    }],
    goods: [{
        type: Schema.Types.ObjectId,
        ref: 'Goods',
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    contents: {
        type: String,
        default: '',
    },
    // 인스타그램
    map: {
        type: Schema.Types.ObjectId,
        ref: 'Map',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Popup", PopupSchema);