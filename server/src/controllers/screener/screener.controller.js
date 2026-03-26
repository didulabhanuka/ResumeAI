const ScreenResult = require('../../models/screener/ScreenResult');
const { screenResume } = require('../../services/claude/claude.service');
const { extractText } = require('../../services/pdf/pdfParser.service');

// POST /api/screener/screen
const screen = async (req, res, next) => {
  try {
    const { jobDescription } = req.body;
    let resumeText = req.body.resumeText;

    // If a PDF was uploaded, extract text from it instead
    if (req.file) {
      resumeText = await extractText(req.file.buffer);
    }

    // Validate we have both pieces
    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Job description is required.',
      });
    }

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Resume text or PDF is required.',
      });
    }

    // Send to Claude
    const result = await screenResume(jobDescription, resumeText);

    // Save to DB
    const screenResult = await ScreenResult.create({
      userId: req.user._id,
      jobDescription,
      resumeText,
      jobTitle: result.jobTitle || 'Untitled Position',
      companyName: result.companyName || 'Unknown Company',
      matchScore: result.matchScore,
      summary: result.summary,
      strengths: result.strengths,
      gaps: result.gaps,
      redFlags: result.redFlags,
      recommendation: result.recommendation,
    });

    res.status(201).json({
      status: 'success',
      data: screenResult,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { screen };