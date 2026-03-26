const express = require('express');
const router = express.Router();
const { generate, download } = require('../controllers/coverLetter/coverLetter.controller');
const { verifyToken } = require('../middleware/auth/auth.middleware');
const upload = require('../middleware/upload/upload.middleware');

// POST /api/cover-letter/generate
router.post('/generate', verifyToken, upload.single('resume'), generate);

// GET /api/cover-letter/:id/download
router.get('/:id/download', verifyToken, download);

module.exports = router;