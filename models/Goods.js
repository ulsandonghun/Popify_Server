const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoodsSchema = new mongoose.Schema({
    goods_name: {
        type: String,
    },
    goods_img: {
        type: String,
    },
    price: {
        type: Number,
    },
    popup: {
        type: Schema.Types.ObjectId,
        ref: 'Popup',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Goods", GoodsSchema);