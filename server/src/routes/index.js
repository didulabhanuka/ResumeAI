const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));

// TODO: router.use('/screener', require('./screener.routes'));
// TODO: router.use('/cover-letter', require('./coverLetter.routes'));
// TODO: router.use('/history', require('./history.routes'));

module.exports = router;