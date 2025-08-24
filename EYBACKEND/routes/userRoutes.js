const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

// Get all users
router.get("/", userController.getAllUsers);

// Register a new user
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  userController.registerUser
);

// Login user
router.post("/login", userController.loginUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
