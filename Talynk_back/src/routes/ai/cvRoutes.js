const express = require("express");
const multer = require('multer');
const { improveCV } = require("../../controllers/ai/cvController");
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post("/", upload.single('file'), improveCV);

module.exports = router;