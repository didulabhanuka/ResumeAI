const express = require('express');
const router = express.Router();
const { screen } = require('../controllers/screener/screener.controller');
const { verifyToken } = require('../middleware/auth/auth.middleware');
const upload = require('../middleware/upload/upload.middleware');

// POST /api/screener/screen
// Accepts either JSON body with resumeText OR multipart with resume PDF
router.post('/screen', verifyToken, upload.single('resume'), screen);

module.exports = router;