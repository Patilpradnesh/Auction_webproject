require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const bidRoutes = require("./routes/bidRoutes");
const adminRoutes = require("./routes/adminRoutes");

const http = require("http");
const { initializeSocket } = require("./socket/socketSetup");
const { connectRedis } = require("./redis/redisClient");

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing! Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error (Please whitelist your IP in Atlas):", err.message);
  });

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://auction-webproject-3.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Auction Platform</h1>");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", userRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start Server and Redis
server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  try {
    await connectRedis();
  } catch (redisError) {
    console.error("Failed to connect to Redis on startup:", redisError.message);
  }
});

// trigger restart
