require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");


const User = require("./model/user");
const Bid = require("./model/Bid");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


if (!MONGO_URI) {
    console.error("MONGO_URI is missing! Check your .env file.");
    process.exit(1);
}

// Connect to MongoDB Atlas
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.error(" MongoDB Connection Error:", err));

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("<h1>MongoDB Atlas Connected Successfully!</h1>");
});



// USER AUTHENTICATION API


//  GET all users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: "success", data: users });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

//  POST - Register User
app.post(
    "/register",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", errors: errors.array() });
        }

        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ status: "error", message: "User already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ status: "success", message: "User registered successfully" });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }
);

//  POST - User Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: "error", message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ status: "error", message: "Invalid email or password" });
        }

        return res.status(200).json({ status: "success", message: "Login successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", message: "Server error" });
    }
});

//  DELETE - Delete User
app.delete("/deleteuser/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ status: "error", message: "User not found" });

        res.status(200).json({ status: "success", message: "User deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

//  BIDDING SYSTEM API


// GET - Fetch All Active Bids
app.get("/bids", async (req, res) => {
    try {
        const bids = await Bid.find().sort({ createdAt: -1 });
        res.status(200).json({ status: "success", data: bids });
    } catch (error) {
        console.error("Error fetching bids:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

//  POST - Create a New Bid with End Time
app.post("/addbids", async (req, res) => {
    try {
        const { item, yourBid, leading, duration } = req.body;

        if (!item || !yourBid || !duration) {
            return res.status(400).json({ status: "error", message: "Item, bid amount, and duration are required" });
        }

        const endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + duration); // Set bid expiration time

        const newBid = new Bid({ item, yourBid, leading, endTime });
        await newBid.save();

        res.status(201).json({ status: "success", message: "Bid created successfully", bid: newBid });
    } catch (error) {
        console.error("Error creating bid:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});



//  DELETE - Remove a Bid
app.delete("delbids/:id", async (req, res) => {
    try {
        const deletedBid = await Bid.findByIdAndDelete(req.params.id);
        if (!deletedBid) return res.status(404).json({ status: "error", message: "Bid not found" });

        res.status(200).json({ status: "success", message: "Bid deleted successfully" });
    } catch (error) {
        console.error("Error deleting bid:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

app.post("/place-bid", async (req, res) => {
    const { bidId, newBid } = req.body;
    
    try {
      const bid = await Bid.findById(bidId);
      
      if (!bid) return res.status(404).json({ success: false, message: "Bid not found" });
  
      if (parseFloat(newBid) <= parseFloat(bid.yourBid)) {
        return res.status(400).json({ success: false, message: "Bid must be higher" });
      }
  
      bid.yourBid = newBid;
      bid.leading = true;
      await bid.save();
  
      return res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  

//  Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
