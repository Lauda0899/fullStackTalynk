const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');
const { authMiddleware } = require('../middleware/auth');

// Toutes les routes CV nécessitent une authentification
router.use(authMiddleware);

// Routes CV
router.post('/', cvController.createCV);
router.get('/', cvController.getUserCVs);
router.get('/:id', cvController.getCVById);
router.put('/:id', cvController.updateCV);
router.delete('/:id', cvController.deleteCV);

module.exports = router;