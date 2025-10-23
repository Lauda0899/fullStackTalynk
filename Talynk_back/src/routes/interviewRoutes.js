const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const { authMiddleware } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

// Routes session d'entretien
router.post('/', interviewController.createSession);
router.get('/', interviewController.getUserSessions);
router.get('/stats', interviewController.getUserStats);
router.get('/:id', interviewController.getSessionById);
router.put('/:id', interviewController.updateSession);
router.post('/:id/response', interviewController.addResponse);
router.delete('/:id', interviewController.deleteSession);

module.exports = router;