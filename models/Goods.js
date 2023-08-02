const mongoose = require("mongoose");

const GoodsSchema = new mongoose.Schema({
    goods_name: {
        type: String,
    },
    goods_imgs: [{
        type: String,
    }],
    popup: {
        type: Schema.Types.ObjectId,
        ref: 'Popup',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Goods", GoodsSchema);