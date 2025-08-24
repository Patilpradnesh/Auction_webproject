const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Define all functions properly
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: "success", data: users });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: "error", 
            message: "Validation failed",
            errors: errors.array() 
        });
    }

    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                status: "error", 
                message: "User already exists with this email...................." 
            });
        }

        // Hash password with stronger salt rounds
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create new user - using 'name' field instead of 'username'
        const newUser = new User({ 
            name: username, // Frontend sends 'username', we store as 'name'
            email, 
            password: hashedPassword 
        });
        
        await newUser.save();

        console.log("User registered successfully:", { username, email });

        res.status(201).json({ 
            status: "success", 
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
            
        });
    } catch (err) {
        console.error("Registration error:", err);
        
        // Handle specific MongoDB errors
        if (err.code === 11000) {
            return res.status(400).json({ 
                status: "error", 
                message: "Email already exists" 
            });
        }
        
        res.status(500).json({ 
            status: "error", 
            message: "Internal Server Error during registration" 
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.role === "admin" },
            process.env.JWT_SECRET || "fallback_secret_key",
            { expiresIn: "1h" }
        );

        res.status(200).json({ 
            token, 
            role: user.role,
            name: user.name,
            isAdmin: user.role === "admin" 
        });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ status: "error", message: "User not found" });

        res.status(200).json({ status: "success", message: "User deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// Correctly export all functions
module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    deleteUser,
};
