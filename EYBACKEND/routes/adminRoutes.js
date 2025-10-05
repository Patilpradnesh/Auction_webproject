const express = require("express");
const { isAdmin } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController"); // Ensure this path is correct

const router = express.Router();

// Get all users (admin only)
router.get("/users", isAdmin, adminController.getAllUsers);

// Delete a user (admin only)
router.delete("/users/:id", isAdmin, adminController.deleteUser);

// Get all bids (admin only)
router.get("/bids", isAdmin, adminController.getAllBids);

// Clear all bids (admin only) - MUST come BEFORE /bids/:id route
router.delete("/bids/clear-all", isAdmin, adminController.clearAllBids);

// Delete a bid (admin only)
router.delete("/bids/:id", isAdmin, adminController.deleteBid);

// Create/Upload new bid (admin only)
router.post("/bids", isAdmin, adminController.uploadBid);

// Edit existing bid (admin only)
router.put("/bids/:id", isAdmin, adminController.editBid); // Temporarily removed auth for testing

// Admin dashboard
router.get("/dashboard", isAdmin, (req, res) => {
  res.status(200).json({ status: "success", message: "Welcome to the admin dashboard" });
});

module.exports = router;
