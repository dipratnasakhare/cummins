const User = require("../models/User.model");
const asyncHandler = require("express-async-handler");

const allowAnyoneToCreate = asyncHandler(async (req, res, next) => {
  const { createdBy } = req.body;

  if (createdBy) {
    // If createdBy is provided, check if the user exists
    const user = await User.findById(createdBy);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // Optional: attach user info to request
    req.user = user;
  } else {
    // If no createdBy provided, you can assign a default system user or leave blank
    req.user = null;
  }

  // Anyone can proceed
  next();
});

module.exports = { allowAnyoneToCreate };
