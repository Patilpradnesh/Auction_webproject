const express = require("express");
const { body } = require("express-validator");
const {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  getUserProfile,
  getUserBidHistory,
} = require("../controllers/userController");
const { verifyAuth, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Auth
router.post(
  "/auth/register",
  [
    body("username").trim().notEmpty().withMessage("Username required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 8 }).withMessage("Password min 8 chars"),
  ],
  
  registerUser
);

router.post(
  "/auth/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  loginUser
);

router.post("/auth/logout", logoutUser);

// Current user (token-based)
router.get("/users/me", verifyAuth, getUserProfile);
router.get("/users/me/bids", verifyAuth, getUserBidHistory);

// Admin-only
router.get("/users", verifyAuth, requireAdmin, getAllUsers);
router.delete("/users/:id", verifyAuth, requireAdmin, deleteUser);

module.exports = router;
