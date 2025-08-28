const asyncHandler = require("express-async-handler");

const Job = require("../models/adminPortal.model");

// @desc    Create new job (Admin only)
// @route   POST /api/jobs
// @access  Private/Admin

const createJob = asyncHandler(async (req, res) => {
  const { title, company, description, location, salary, jobType } = req.body;

  console.log(req.body);

  if (!title || !company || !description || !location) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const job = await Job.create({
    title,
    company,
    description,
    location,
    salary,
    jobType,
    createdBy: '68b05481de173a2fc8add16b'
    // req.user._id,
  });

  res.status(201).json(job);
});

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ isActive: true }).populate("createdBy", "rollNumber");
  res.json(jobs);
});

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("createdBy", "rollNumber");
  if (job) {
    res.json(job);
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

// @desc    Apply to job
// @route   POST /api/jobs/:id/apply
// @access  Private/User
const applyJob = asyncHandler(async (req, res) => {
  const { userId, jobId } = req.body;

  if (!userId || !jobId) {
    res.status(400);
    throw new Error("userId and jobId are required");
  }

  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // Check if user already applied
  const alreadyApplied = job.applicants.find(
    (app) => app.user.toString() === userId
  );

  if (alreadyApplied) {
    res.status(400);
    throw new Error("You have already applied for this job");
  }

  // Add applicant
  job.applicants.push({ user: userId });
  await job.save();

  res.status(200).json({
    message: "Application submitted successfully",
    jobId: job._id,
    userId,
  });
  
});


// @desc    Update job (Admin only)
// @route   PUT /api/jobs/:id
// @access  Private/Admin
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error("Not authorized to update this job");
  }

  const { title, company, description, location, salary, jobType, isActive } = req.body;

  job.title = title || job.title;
  job.company = company || job.company;
  job.description = description || job.description;
  job.location = location || job.location;
  job.salary = salary || job.salary;
  job.jobType = jobType || job.jobType;
  job.isActive = isActive ?? job.isActive;

  const updatedJob = await job.save();
  res.json(updatedJob);
});

// @desc    Delete job (Admin only)
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.createdBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error("Not authorized to delete this job");
  }

  await job.deleteOne();
  res.json({ message: "Job removed successfully" });
});

module.exports = {
  createJob,
  getJobs,
  getJobById,
  applyJob,
  updateJob,
  deleteJob,
};
