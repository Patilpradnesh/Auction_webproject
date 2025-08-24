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
