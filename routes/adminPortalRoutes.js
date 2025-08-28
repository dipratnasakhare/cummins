const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  applyJob,
  updateJob,
  deleteJob,
} = require("../controllers/adminPortalControllers");

const { protect } = require("../middlewares/authMiddleware");
const { allowAnyoneToCreate } = require("../middlewares/jobMiddleware");


const router = express.Router();

// Public routes
router.get("/", getJobs);
router.get("/:id", getJobById);

// Protected routes
router.post("/post", protect,createJob);  // Admin creates job

router.put("post/:id", protect, updateJob); // Admin updates job
router.delete("post/:id", protect, deleteJob); // Admin deletes job

// User route
router.post("/apply", allowAnyoneToCreate, applyJob); // User applies

module.exports = router;
