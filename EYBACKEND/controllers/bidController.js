const Bid = require("../models/Bid");

exports.getAllBids = async (req, res) => {
    try {
        const bids = await Bid.find().sort({ createdAt: -1 });
        res.status(200).json({ status: "success", data: bids });
    } catch (error) {
        console.error("Error fetching bids:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

exports.createBid = async (req, res) => {
    try {
        const { item, yourBid, leading } = req.body;

        if (!item || !yourBid) {
            return res.status(400).json({ message: "Item and bid amount are required" });
        }

        const newBid = new Bid({ item, yourBid, leading });
        await newBid.save();

        res.status(201).json({ message: "Bid created successfully", bid: newBid });
    } catch (error) {
        console.error("Error creating bid:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteBid = async (req, res) => {
    try {
        const deletedBid = await Bid.findByIdAndDelete(req.params.id);
        if (!deletedBid) return res.status(404).json({ status: "error", message: "Bid not found" });

        res.status(200).json({ status: "success", message: "Bid deleted successfully" });
    } catch (error) {
        console.error("Error deleting bid:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Fetch bid details
exports.getBidDetails = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    res.status(200).json({ status: "success", data: bid });
  } catch (error) {
    console.error("Error fetching bid details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Place a bid
exports.placeBid = async (req, res) => {
  try {
    const { bidAmount } = req.body;
    const bid = await Bid.findById(req.params.id);

    if (!bid) return res.status(404).json({ message: "Bid not found" });

    if (bidAmount <= bid.leading) {
      return res.status(400).json({ message: "Bid amount must be higher than the current leading bid" });
    }

    bid.leading = bidAmount;
    await bid.save();

    res.status(200).json({ message: "Bid placed successfully", bid });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
