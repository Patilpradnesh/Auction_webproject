const User = require("../models/User");
const Bid = require("../models/Bid");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

// Get all bids
exports.getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find();
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bids" });
  }
};

// Delete a bid
exports.deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete(req.params.id);
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    res.status(200).json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bid" });
  }
};

// Upload new bid
exports.uploadBid = async (req, res) => {
  try {
    const { item, startingBid, startTime, endTime } = req.body;
    const newBid = new Bid({ item, startingBid, startTime, endTime });
    await newBid.save();
    res.status(201).json({ message: "Bid uploaded successfully", bid: newBid });
  } catch (error) {
    res.status(500).json({ message: "Error uploading bid" });
  }
};

// Edit existing bid
exports.editBid = async (req, res) => {
  try {
    const { item, startingBid, startTime, endTime } = req.body;
    const updatedBid = await Bid.findByIdAndUpdate(
      req.params.id,
      { item, startingBid, startTime, endTime },
      { new: true }
    );
    if (!updatedBid) return res.status(404).json({ message: "Bid not found" });
    res.status(200).json({ message: "Bid updated successfully", bid: updatedBid });
  } catch (error) {
    res.status(500).json({ message: "Error editing bid" });
  }
};

// Fetch detailed user activity
exports.getUserActivity = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("bids");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user activity" });
  }
};

const categorizeBids = (bids) => {
  if (!Array.isArray(bids)) {
    console.error("Invalid bids data:", bids);
    return { ongoing: [], upcoming: [], past: [] };
  }
  const now = new Date();
  const ongoing = bids.filter((bid) => new Date(bid.startTime) <= now && new Date(bid.endTime) >= now);
  const upcoming = bids.filter((bid) => new Date(bid.startTime) > now);
  const past = bids.filter((bid) => new Date(bid.endTime) < now);

  return { ongoing, upcoming, past };
};

exports.categorizeBids = async (req, res) => {
  try {
    const bids = await Bid.find(); // Fetch bids from the database
    const { ongoing, upcoming, past } = categorizeBids(bids);
    res.status(200).json({ ongoing, upcoming, past });
  } catch (error) {
    res.status(500).json({ message: "Error categorizing bids" });
  }
};
