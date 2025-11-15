const express = require("express");
const { generateEmail } = require("../../controllers/ai/emailController");
const router = express.Router();

router.post("/", generateEmail);

module.exports = router;
