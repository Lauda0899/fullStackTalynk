const express = require("express");
const { generateCoverLetter } = require("../../controllers/ai/coverLetterController");
const router = express.Router();

router.post("/", generateCoverLetter);

module.exports = router;
