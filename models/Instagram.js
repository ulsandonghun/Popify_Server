const mongoose = require("mongoose");

const InstagramSchema = new mongoose.Schema({
   insta_url: {
      type: String,
   },
});

module.exports = mongoose.model("Instagram", InstagramSchema);