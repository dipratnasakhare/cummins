const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

// Register user
router.post("/registerUser", registerUser);

// Normal login Admin login
router.post("/loginUser", loginUser);

// Get all users (protected)
router.get("/", protect, allUsers);

module.exports = router;
