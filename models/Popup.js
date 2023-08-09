const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PopupSchema = new mongoose.Schema({

    corporation: {
        //기업명(제목)
        type: String,
    },
    term: {
        // 2023-08-03 ~ 2023-08-05
        type: String,
    },
    location:{
        //장소
        type: String,

    },
    reservation:{
        //사전예약 여부
        type: String,
    },
    free:{
        //무료/유료
        type: Boolean,
    },
    business_hours: {
        // 9:00 ~ 18:00
        type: String,  
    },
 
    tags: [{
        type: String,
        default: '',
    }],
    popup_imgs: [{
        type: String,
    }],
    contents: {
        //비고
        type: String,
        default: '',
    },
    goods: [{
        type: Schema.Types.ObjectId,
        ref: 'Goods',
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    placeurl: {
        type: String,
        default: '',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Popup", PopupSchema);