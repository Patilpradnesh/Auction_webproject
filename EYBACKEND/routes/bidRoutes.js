const express = require("express");
const bidController = require("../controllers/bidController");
const { verifyAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────
// GET /api/bids          → all auctions
router.get("/", bidController.getAllBids);

// GET /api/bids/:id      → single auction detail
router.get("/:id", bidController.getBidDetails);

// ─── Protected Routes (login required) ───────────────────────
// POST /api/bids/:id/place  → place a bid on an auction
router.post("/:id/place", verifyAuth, bidController.placeBid);

// DELETE /api/bids/:id      → delete auction (admin handles via adminRoutes, kept for compat)
router.delete("/:id", verifyAuth, bidController.deleteBid);

module.exports = router;

