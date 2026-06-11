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
    console.log("🔍 getAllBids called");
    console.log("Request headers:", req.headers.authorization);
    const bids = await Bid.find();
    console.log("✅ Found bids:", bids.length);
    res.status(200).json(bids);
  } catch (error) {
    console.error("❌ Error in getAllBids:", error);
    res.status(500).json({ message: "Error fetching bids: " + error.message });
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
    const { title, description, category, startingPrice, currentPrice, minimumIncrement, startTime, endTime } = req.body;
    
    // Check if an image was uploaded via multer
    let images = [];
    if (req.file) {
      // Build the public URL for the uploaded file
      const protocol = req.protocol;
      const host = req.get("host");
      const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
      images.push(imageUrl);
    } else if (req.body.images && req.body.images.length > 0) {
      // Fallback if they somehow sent a direct URL
      images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    } else if (req.body.imageUrl) {
      images.push(req.body.imageUrl);
    }

    // Fix: Auth middleware attaches user object to req.user, not req.userId
    const seller = req.user?.id; 
    
    if (!seller) {
      return res.status(401).json({ message: "Seller authentication failed. ID missing." });
    }

    const newBid = new Bid({ 
      title, 
      description, 
      category, 
      startingPrice: Number(startingPrice), 
      currentPrice: currentPrice ? Number(currentPrice) : Number(startingPrice), 
      minimumIncrement: minimumIncrement ? Number(minimumIncrement) : 1,
      images,
      startTime, 
      endTime, 
      seller 
    });
    
    await newBid.save();
    console.log("✅ Bid saved successfully");
    
    res.status(201).json({ message: "Bid uploaded successfully", bid: newBid });
  } catch (error) {
    console.error("❌ Error in uploadBid:", error);
    res.status(500).json({ message: "Error uploading bid: " + error.message });
  }
};

// Edit existing bid
exports.editBid = async (req, res) => {
  try {
    const { title, description, category, startingPrice, currentPrice, startTime, endTime, status } = req.body;
    const updatedBid = await Bid.findByIdAndUpdate(
      req.params.id,
      { title, description, category, startingPrice, currentPrice, startTime, endTime, status },
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

// Clear all bids - Clean slate for new format only
exports.clearAllBids = async (req, res) => {
  try {
    console.log('Clear all bids function called');
    const result = await Bid.deleteMany({});
    console.log('Delete result:', result);
    res.status(200).json({ 
      message: `Successfully deleted ${result.deletedCount} bids. Ready for new format data!`,
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    console.error('Error in clearAllBids:', error);
    res.status(500).json({ message: "Error clearing bids: " + error.message });
  }
};

exports.getAnalytics = async (req,res)=>{
  try {
    const totalUsers = await User.countDocuments();
    const totalBids =  await Bid.countDocuments();
    const bidsByCategory = await Bid.aggregate([
      {$group:{_id:"$category",count:{$sum:1}}}

    ]);

    const recentUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    const recentBids = await Bid.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.status(200).json({
      totalUsers,
      totalBids,
      bidsByCategory,
      recentUsers,
      recentBids
    });

  } catch (error) {
    res.status(500).json({message:"Error fetching analytics"});
  }

};

exports.searchUsers =async (req,res)=>{
  const{q}=req.query;

  try {
    const users =await User.find({
      $or:[
        {name:{$regex:q, $options:"i"}},
        {email:{$regex:q,$options:"i"}}
      ]
    });
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({message:"Error Searching users"});
  }
}

exports.searchBids =async (req,res)=>{
  const {q} =req.query;
  try {
    const bids =await Bid.find({
      $or:[
        {title:{$regex:q,$options:"i"}},
        {title:{$regex:q,$options:"i"}}
      ]
    });
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({message:"Error Searching bids"});
  }
}