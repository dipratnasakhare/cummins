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
  const keyword = req.query.search
    ? {
        $or: [{ rollNumber: { $regex: req.query.search, $options: "i" } }],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, loginUser, allUsers };
