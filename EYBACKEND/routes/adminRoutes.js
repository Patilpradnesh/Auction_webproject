const express = require("express");
const { verifyAuth, isAdmin } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController"); 
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Apply auth verify first, then check admin for ALL admin routes
router.use(verifyAuth, isAdmin);

// Get all users (admin only)
router.get("/users", adminController.getAllUsers);

// Delete a user (admin only)
router.delete("/users/:id", adminController.deleteUser);

// Get all bids (admin only)
router.get("/bids", adminController.getAllBids);

// Clear all bids (admin only)
router.delete("/bids/clear-all", adminController.clearAllBids);

// Delete a bid (admin only)
router.delete("/bids/:id", adminController.deleteBid);

// Create/Upload new bid (admin only) - Handles image file upload
router.post("/bids", upload.single("image"), adminController.uploadBid);

router.put("/bids/:id", adminController.editBid); 

router.get("/analytics", adminController.getAnalytics);

router.get("/search/users", adminController.searchUsers);

router.get("/search/bids", adminController.searchBids);

router.get("/dashboard", (req, res) => {
  res.status(200).json({ status: "success", message: "Welcome to the admin dashboard" });
});

module.exports = router;
