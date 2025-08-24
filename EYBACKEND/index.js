require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRoutes = require("./routes/userRoutes");
const bidRoutes = require("./routes/bidRoutes");
const adminRoutes = require("./routes/adminRoutes"); 
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing! Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// var corsOption ={
//   origin:[
//     'http://localhost:3000'
//   ],
//   methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
//   credentials:true,
//   optionsSuccessStatus:200
// }

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Auction Platform</h1>");
});

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/admin", adminRoutes);

// Direct registration endpoint for frontend compatibility

// app.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;
  
//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ 
//         status: "error", 
//         message: "User already exists with this email" 
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12);
    
//     // Create new user
//     const newUser = new User({ 
//       name: username, // Frontend sends 'username', we store it as 'name'
//       email, 
//       password: hashedPassword,
//       role: "user" // Default role
//  });
    
//     await newUser.save();

//     res.status(201).json({ 
//       alert: "from index.js file ",
//       status: "success", 
//       message: "User registered successfully",
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role
//       }
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ 
//       status: "error", 
//       message: "Server error during registration" 
//     });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // Ensure the full name is included in the response
//     res.status(200).json({ role: user.role, token, name: user.name });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
