const User = require("../models/User.model");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  const { createdBy } = req.body;

  if (!createdBy) {
    res.status(400).json({ message: "createdBy field is required" });
    return;
  }

  const user = await User.findById(createdBy);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (!user.isAdmin) {
    res.status(403).json({ message: "Access denied. Only admins can create jobs." });
    return;
  }

  // ✅ User exists and is admin
  next();
});

module.exports = { protect };
