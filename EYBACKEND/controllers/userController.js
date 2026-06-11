const User = require("../models/User");
const Bid = require("../models/Bid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Get all users (admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ status: "success", data: users });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: "error", message: "Validation failed", errors: errors.array() });
  }

  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: "error", message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isAdmin: newUser.role === "admin",
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ status: "error", message: "Email already in use" });
    }
    res.status(500).json({
      status: "error",
      message: "Internal Server Error during registration",
    });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: "error", message: "Validation failed", errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "error", message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: "error", message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000 // 1 hour
    });

    res.status(200).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === "admin",
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ status: "success", message: "Logged out successfully" });
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    res.status(200).json({ status: "success", message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// GET /users/me/bids — user’s bid history from Bid model
const getUserBidHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const auctions = await Bid.find({ "bids.bidder": userId })
      .select("title images currentPrice endTime bids")
      .lean();

    const myBids = [];
    for (const a of auctions) {
      for (const b of a.bids || []) {
        if (String(b.bidder) === String(userId)) {
          myBids.push({
            auctionId: a._id,
            title: a.title,
            amount: b.amount,
            createdAt: b.createdAt || b.time,
          });
        }
      }
    }

    res.status(200).json({
      status: "success",
      data: {
        count: myBids.length,
        bids: myBids.sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt)),
      },
    });
  } catch (err) {
    console.error("Bid history error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// GET /users/me — profile from token
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    res.status(200).json({ status: "success", data: user });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  getUserBidHistory,
  getUserProfile,
};
