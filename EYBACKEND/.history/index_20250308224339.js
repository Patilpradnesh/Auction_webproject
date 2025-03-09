require("dotenv").config(); // ✅ Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// ✅ Import Mongoose model
const User = require("./model/User");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Check if MONGO_URI is loaded correctly
if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined! Check your .env file.");
    process.exit(1);
}

// ✅ Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors());
app.use(express.json()); // ✅ Middleware to parse JSON data

// ✅ Home Route
app.get("/", (req, res) => {
    res.send("<h1>MongoDB Atlas Connected Successfully!</h1>");
});

// ✅ GET all users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json({ status: "200", data: users });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// ✅ POST - Register User
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
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// ✅ POST - User login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

// ✅ DELETE User by ID
app.delete("/deleteuser/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});




// ✅ API Route: Fetch Active Bids
app.get("/api/bids", async (req, res) => {
  try {
    const bids = await Bid.find().sort({ createdAt: -1 }); // Latest bids first
    res.json(bids);
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ API Route: Create a New Bid
app.post("/api/bids", async (req, res) => {
  try {
    const { item, yourBid, leading } = req.body;

    if (!item || !yourBid) {
      return res.status(400).json({ message: "Item and bid amount are required" });
    }

    const newBid = new Bid({ item, yourBid, leading });
    await newBid.save();

    res.status(201).json({ message: "Bid created successfully", bid: newBid });
  } catch (error) {
    console.error("Error creating bid:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
