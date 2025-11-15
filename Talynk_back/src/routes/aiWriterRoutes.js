
const express = require("express");
const router = express.Router();
const writerController = require("../controllers/aiWriterController");


router.get("/writer", writerController.getWriterPage);

module.exports = router;
