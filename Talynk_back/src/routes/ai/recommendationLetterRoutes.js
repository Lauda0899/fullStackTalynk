const express = require('express');
const router = express.Router();

// Correct import
const { generateMotivationLetter } = require('../../controllers/ai/motivationLetterController');

router.post('/', generateMotivationLetter);

module.exports = router;
