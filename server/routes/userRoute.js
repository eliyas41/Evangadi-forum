const express = require("express");
const router = express.Router();

// Authentication middleware
const authMiddleware = require("../middleware/authMiddlewares");

// User controller
const {
  register,
  login,
  checkUser,
  getUserById,
} = require("../controller/userController");

// Register route
router.post("/register", register);

// Login user
router.post("/login", login);

// Check user for authentication
router.get("/check", authMiddleware, checkUser);

// Get user by ID
router.get("/:id", authMiddleware, getUserById);

module.exports = router;
