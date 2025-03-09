const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  item: String,
  yourBid: String,
  leading: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bid", bidSchema);
