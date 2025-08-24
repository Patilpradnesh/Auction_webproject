const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    item: { type: String, required: true },
    yourBid: { type: Number, required: true },
    leading: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Bid", bidSchema);
