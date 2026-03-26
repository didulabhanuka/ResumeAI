const mongoose = require('mongoose');

const coverLetterSchema = new mongoose.Schema(
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
    generatedLetter: {
      type: String,
      required: [true, 'Generated letter is required'],
    },
    tone: {
      type: String,
      enum: ['professional', 'enthusiastic', 'concise', 'storytelling'],
      default: 'professional',
    },
    length: {
      type: String,
      enum: ['short', 'medium', 'long'],
      default: 'medium',
    },
    focus: {
      type: String,
      enum: ['technical-skills', 'leadership', 'culture-fit', 'career-change'],
      default: 'technical-skills',
    },
    customNote: {
      type: String,
      default: '',
    },
    wordCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast user history lookups
coverLetterSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('CoverLetter', coverLetterSchema);