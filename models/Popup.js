const mongoose = require("mongoose");

const PopupSchema = new mongoose.Schema({
 
    tags: [{
        type: String,
        default: '',
    }],
    corporation: {
        type: String,
    },
    corporation_contact: {
        type: String,
    },
    location:{
        type: String,

    },
    reservation:{
        type: String,
    },
    free:{
        type: Boolean,
    },
    term: {
        // 2023-08-03 ~ 2023-08-05
        type: String,
    },
    business_hours: {
        // 9:00 ~ 18:00
        type: String,  
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
        //비고
        type: String,
        default: '',
    },
    map: {
        type: Schema.Types.ObjectId,
        ref: 'Map',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Popup", PopupSchema);