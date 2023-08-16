const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    popup: {
        type: Schema.Types.ObjectId,
        ref: 'Popup',
    },
}, {
    versionKey: false,
});

module.exports = mongoose.model("Map", MapSchema);