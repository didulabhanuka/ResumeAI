const CoverLetter = require('../../models/coverLetter/CoverLetter');
const { streamCoverLetter } = require('../../services/claude/claude.service');
const { extractText } = require('../../services/pdf/pdfParser.service');

// POST /api/cover-letter/generate
const generate = async (req, res, next) => {
  try {
    const { jobDescription, settings } = req.body;
    let resumeText = req.body.resumeText;

    // If PDF uploaded extract text from it
    if (req.file) {
      resumeText = await extractText(req.file.buffer);
    }

    // Validate inputs
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

    // Parse settings with defaults
    const parsedSettings = {
      tone: settings?.tone || 'professional',
      length: settings?.length || 'medium',
      focus: settings?.focus || 'technical-skills',
      customNote: settings?.customNote || '',
    };

    // Set SSE headers — keeps connection open for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    let fullText = '';

    // Stream chunks to client as they arrive
    await streamCoverLetter(
      jobDescription,
      resumeText,
      parsedSettings,
      (chunk) => {
        fullText += chunk;
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      }
    );

    // Signal to frontend that stream is complete
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();

    // Save complete letter to DB after streaming ends
    await CoverLetter.create({
      userId: req.user._id,
      jobDescription,
      resumeText,
      generatedLetter: fullText,
      tone: parsedSettings.tone,
      length: parsedSettings.length,
      focus: parsedSettings.focus,
      customNote: parsedSettings.customNote,
      wordCount: fullText.split(' ').length,
    });
  } catch (err) {
    // If headers already sent we can't use res.json — send SSE error instead
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    } else {
      next(err);
    }
  }
};

// GET /api/cover-letter/:id/download
const download = async (req, res, next) => {
  try {
    const letter = await CoverLetter.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!letter) {
      return res.status(404).json({
        status: 'error',
        message: 'Cover letter not found.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: letter,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { generate, download };