const express = require("express");
const { generateMotivationLetter } = require("../../controllers/ai/motivationLetterController");
const router = express.Router();

router.post("/", generateMotivationLetter);

module.exports = router;
