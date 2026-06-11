const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verify logged-in user from Bearer token or cookie
function verifyAuth(req, res, next) {
  let token = req.cookies?.token;
  if (!token) {
    const auth = req.headers.authorization || "";
    token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  }
  
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role, isAdmin: decoded.role === "admin" };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Ensure user is admin
function requireAdmin(req, res, next) {
  console.log("Checking admin status for user:", req.user);
  if (!req.user?.isAdmin) return res.status(403).json({ message: "Forbidden" });
  next();
}

// Export (keep old exports if any)
module.exports = { ...(module.exports || {}), verifyAuth, requireAdmin, isAdmin: requireAdmin };
