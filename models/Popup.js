const mongoose = require("mongoose");

const PopupSchema = new mongoose.Schema({

    corporation: {
        type: String,
    },
    term: {
        // 2023-08-03 ~ 2023-08-05
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
    map: {
        type: Schema.Types.ObjectId,
        ref: 'Map',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Popup", PopupSchema);