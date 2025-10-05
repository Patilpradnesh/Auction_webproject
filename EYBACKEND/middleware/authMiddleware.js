const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAdmin = async (req, res, next) => {
    console.log("🔍 isAdmin middleware called");
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token received:", token ? "YES" : "NO");
    
    if (!token) {
        console.log("❌ No token provided");
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token decoded:", decoded.id);
        req.userId = decoded.id;

        const user = await User.findById(req.userId);
        console.log("User found:", user ? `${user.email} (${user.role})` : "NOT FOUND");
        
        if (user && user.role === "admin") {
            console.log("✅ Admin access granted");
            return next();
        }
        console.log("❌ Access denied - not admin");
        return res.status(403).json({ status: "error", message: "Access denied" });
    } catch (error) {
        console.error("❌ Auth error:", error.message);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
