const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    //  basic Auction info
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Antiques",
        "Art",
        "Vehicles",
        "Real Estate",
        "Other",
      ],
    },

    // pricing
    startingPrice: { type: Number, required: true, min: 0 },
    currentPrice: { type: Number, required: true, min: 0 },
    minimumIncrement: { type: Number, default: 1, min: 0.01 },

    // timing
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    //status
    status: {
      type: String,
      enum: ["upcoming", "active", "ended", "cancelled"],
      default: "upcoming",
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    currentWinner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    images: [{ type: String }],

    bids: [
      {
        bidder: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        amount: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Bid", bidSchema);
