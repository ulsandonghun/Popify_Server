const mongoose = require("mongoose");

const GoodsSchema = new mongoose.Schema({
    brand_name: {

    },
    goods_name: {

    },
    goods_img: {

    },
    popup: {
        // id로 끌어옴
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Goods", GoodsSchema);