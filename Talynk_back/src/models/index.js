const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 80,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 120,
  },
  password_hash: {
    type: String,
    required: true,
    maxlength: 120,
  },
  first_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Note: username and email indexes are created automatically by unique: true
const User = mongoose.model("User", userSchema);

// CV Schema
const cvSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  language: {
    type: String,
    default: "en",
    maxlength: 10,
  },
  content: {
    type: Object,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
cvSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// Indexes
cvSchema.index({ user_id: 1 });
cvSchema.index({ created_at: -1 });

const CV = mongoose.model("CV", cvSchema);

// Job Schema
const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200,
  },
  company: {
    type: String,
    required: true,
    maxlength: 200,
  },
  location: {
    type: String,
    required: true,
    maxlength: 200,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [
    {
      type: String,
      required: true,
    },
  ],
  salary_min: {
    type: Number,
  },
  salary_max: {
    type: Number,
  },
  job_type: {
    type: String,
    maxlength: 50,
    enum: ["full-time", "part-time", "contract"],
  },
  remote: {
    type: Boolean,
    default: false,
  },
  source_url: {
    type: String,
    maxlength: 500,
  },
  posted_date: {
    type: Date,
    default: Date.now,
  },
  match_score: {
    type: Number,
    default: 0.0,
  },
});

// Indexes
jobSchema.index({ company: 1 });
jobSchema.index({ job_type: 1 });
jobSchema.index({ remote: 1 });
jobSchema.index({ posted_date: -1 });
jobSchema.index({ match_score: -1 });

const Job = mongoose.model("Job", jobSchema);

// Job Application Schema
const jobApplicationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job_id: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  cv_id: {
    type: Schema.Types.ObjectId,
    ref: "CV",
    required: true,
  },
  status: {
    type: String,
    default: "applied",
    maxlength: 50,
    enum: ["applied", "reviewed", "interviewed", "rejected", "accepted"],
  },
  applied_at: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
  },
});

// Indexes
jobApplicationSchema.index({ user_id: 1 });
jobApplicationSchema.index({ job_id: 1 });
jobApplicationSchema.index({ status: 1 });
jobApplicationSchema.index({ applied_at: -1 });

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

// Interview Session Schema
const interviewSessionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job_title: {
    type: String,
    required: true,
    maxlength: 200,
  },
  questions: {
    type: [Object],
    default: [],
  },
  responses: {
    type: [Object],
    default: [],
  },
  analysis: {
    type: Object,
  },
  confidence_score: {
    type: Number,
  },
  speech_score: {
    type: Number,
  },
  expression_score: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
interviewSessionSchema.index({ user_id: 1 });
interviewSessionSchema.index({ created_at: -1 });

const InterviewSession = mongoose.model(
  "InterviewSession",
  interviewSessionSchema
);

// Export models
module.exports = {
  User,
  CV,
  Job,
  JobApplication,
  InterviewSession,
};