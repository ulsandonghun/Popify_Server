const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema({
    popup_name: {

    },
    latitude: {

    },
    longitude: {

    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Map", MapSchema);