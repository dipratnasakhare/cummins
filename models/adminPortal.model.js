// models/adminPortalModel.js
const mongoose = require("mongoose");

const adminPortalSchema = mongoose.Schema(
  {
    title: { type: String, required: true },          // Job Title
    company: { type: String, required: true },        // Company Name
    description: { type: String, required: true },    // Job Description
    location: { type: String, required: true },       // Location (Remote / On-site / City)
    salary: { type: String },                         // Optional Salary info

    jobType: { 
      type: String, 
      enum: ["Full-time", "Part-time", "Internship", "Contract"], 
      default: "Full-time" 
    },                                                // Type of job

    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true                                  // Reference to Admin who created the job
    },

    applicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Candidate reference
        status: { 
          type: String, 
          enum: ["Applied", "Reviewed", "Interview", "Hired", "Rejected"], 
          default: "Applied" 
        },
        appliedAt: { type: Date, default: Date.now }   // When user applied
      }
    ],

    isActive: { type: Boolean, default: true },       // Job active/inactive
  },
  { timestamps: true }
);

const AdminPortal = mongoose.model("AdminPortal", adminPortalSchema);
module.exports = AdminPortal;
