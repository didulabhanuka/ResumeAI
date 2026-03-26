const mongoose = require('mongoose');

const screenResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobTitle: {
      type: String,
      trim: true,
      default: 'Untitled Position',
    },
    companyName: {
      type: String,
      trim: true,
      default: 'Unknown Company',
    },
    jobDescription: {
      type: String,
      required: [true, 'Job description is required'],
    },
    resumeText: {
      type: String,
      required: [true, 'Resume text is required'],
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    summary: {
      type: String,
      required: true,
    },
    strengths: {
      type: [String],
      default: [],
    },
    gaps: {
      type: [String],
      default: [],
    },
    redFlags: {
      type: [String],
      default: [],
    },
    recommendation: {
      type: String,
      enum: ['STRONG_YES', 'INTERVIEW', 'MAYBE', 'REJECT'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast user history lookups
screenResultSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('ScreenResult', screenResultSchema);