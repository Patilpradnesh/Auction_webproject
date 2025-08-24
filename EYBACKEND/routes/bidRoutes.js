const express = require("express");
const bidController = require("../controllers/bidController");

const router = express.Router();

// Get all bids
router.get("/get", bidController.getAllBids);

// Create a new bid
router.post("/", bidController.createBid);

// Delete a bid by ID
router.delete("/:id", bidController.deleteBid);

module.exports = router;
