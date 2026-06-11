const Bid = require("../models/Bid");
const { placeBidWithLock } = require("../redis/bidLock");
const { getIo } = require("../socket/socketSetup");

// ─── Get all auctions (public) ───────────────────────────────
exports.getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find()
      .sort({ createdAt: -1 })
      .select("title description category currentPrice startingPrice startTime endTime status images minimumIncrement");

    res.status(200).json({ status: "success", data: bids });
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// ─── Get single auction by ID (public) ───────────────────────
exports.getBidDetails = async (req, res) => {
  try {
    const auction = await Bid.findById(req.params.id)
      .populate("seller", "name email")
      .populate("bids.bidder", "name");

    if (!auction) {
      return res.status(404).json({ status: "error", message: "Auction not found" });
    }

    res.status(200).json({ status: "success", data: auction });
  } catch (error) {
    console.error("Error fetching auction details:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// ─── Place a bid on an auction (protected) ───────────────────
exports.placeBid = async (req, res) => {
  try {
    const { bidAmount } = req.body;
    const bidderId = req.user.id;
    const auctionId = req.params.id;

    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      return res.status(400).json({ status: "error", message: "Invalid bid amount" });
    }

    // 1. Fetch auction basics from MongoDB
    const auction = await Bid.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ status: "error", message: "Auction not found" });
    }

    const now = new Date();
    if (now < auction.startTime) {
      return res.status(400).json({ status: "error", message: "Auction has not started yet." });
    }
    if (now > auction.endTime) {
      return res.status(400).json({ status: "error", message: "Auction has already ended." });
    }

    if (String(auction.seller) === String(bidderId)) {
      return res.status(403).json({ status: "error", message: "You cannot bid on your own auction" });
    }

    // 2. ATTEMPT TO PLACE BID VIA REDIS LOCK
    // This is race-condition safe. If 100 people bid at the exact same millisecond, 
    // only one gets the lock, the rest wait or fail.
    const lockResult = await placeBidWithLock(
      auctionId.toString(),
      bidderId.toString(),
      bidAmount,
      auction.minimumIncrement || 1
    );

    // Handle Lock Rejections
    if (!lockResult.success) {
      if (lockResult.reason === "LOCK_CONTENTION") {
        return res.status(429).json({ status: "error", message: "High traffic. Please try bidding again." });
      }
      if (lockResult.reason === "AUCTION_ENDED") {
        return res.status(400).json({ status: "error", message: "Auction has ended." });
      }
      if (lockResult.reason === "BID_TOO_LOW") {
        return res.status(400).json({ 
          status: "error", 
          message: `Bid too low. Minimum required is $${lockResult.minRequired}` 
        });
      }
    }

    // 3. IF REDIS SUCCEEDS, SYNC WITH MONGODB
    // We update Mongo safely knowing Redis already verified and acquired the lock
    auction.currentPrice = lockResult.newPrice;
    auction.endTime = new Date(lockResult.endTime); // Might have been extended by anti-snipe
    auction.currentWinner = bidderId;
    auction.bids.push({
      bidder: bidderId,
      amount: lockResult.newPrice,
      timestamp: new Date(),
    });

    await auction.save();

    // 4. BROADCAST TO ALL CONNECTED CLIENTS VIA SOCKET.IO
    try {
      const io = getIo();
      io.to(`auction:${auctionId}`).emit("bidUpdated", {
        auctionId: auctionId,
        newPrice: lockResult.newPrice,
        endTime: lockResult.endTime,
        totalBids: auction.bids.length,
        currentWinner: bidderId, // Pass the winner ID to the frontend
        extended: lockResult.extended // Tell frontend if anti-snipe was triggered
      });
    } catch (socketErr) {
      console.warn("Socket.io broadcast failed, but bid was placed:", socketErr.message);
    }

    // 5. RESPOND TO THE USER WHO BID
    res.status(200).json({
      status: "success",
      message: "Bid placed successfully",
      data: {
        auctionId: auction._id,
        newPrice: auction.currentPrice,
        endTime: auction.endTime,
        totalBids: auction.bids.length,
      },
    });

  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// ─── Delete auction (admin only) ─────────────────────────────
exports.deleteBid = async (req, res) => {
  try {
    const deleted = await Bid.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: "error", message: "Auction not found" });
    }
    res.status(200).json({ status: "success", message: "Auction deleted successfully" });
  } catch (error) {
    console.error("Error deleting auction:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
