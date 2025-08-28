const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const generateToken = require("../configs/generateToken");

// Register User (user or admin)
const registerUser = asyncHandler(async (req, res) => {
  const { rollNumber, password, isAdmin } = req.body;

  if (!rollNumber || !password) {
    res.status(400);
    throw new Error("Please Enter all required fields");
  }

  const userExists = await User.findOne({ rollNumber });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ rollNumber, password, isAdmin: !!isAdmin });
  if (user) {
    res.status(201).json({
      _id: user._id,
      rollNumber: user.rollNumber,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the User");
  }
});

// Login (works for both user & admin)
const loginUser = asyncHandler(async (req, res) => {
  const { rollNumber, password } = req.body;

  const user = await User.findOne({ rollNumber });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      rollNumber: user.rollNumber,
      isAdmin: user.isAdmin, // 👈 use this to check admin in frontend
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid rollNumber or Password");
  }
});

// Search Users
const allUsers = asyncHandler(async (req, res) => {
   try {
    // Fetch all users
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

module.exports = { registerUser, loginUser, allUsers };
