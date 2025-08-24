const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Assume `req.userId` is set after authentication

        const user = await User.findById(req.userId);
        if (user && user.role === "admin") {
            return next();
        }
        return res.status(403).json({ status: "error", message: "Access denied" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
