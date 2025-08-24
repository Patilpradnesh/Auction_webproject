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

// Delete a bid (admin only)
router.delete("/bids/:id", isAdmin, adminController.deleteBid);

// Admin dashboard
router.get("/dashboard", isAdmin, (req, res) => {
  res.status(200).json({ status: "success", message: "Welcome to the admin dashboard" });
});

module.exports = router;
