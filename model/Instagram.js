const mongoose = require("mongoose");

const InstagramSchema = new mongoose.Schema({
   insta_url: {

   },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Instagram", InstagramSchema);