const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { authMiddleware } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

// Routes RH (pour voir toutes les candidatures d'un job)
router.get('/job/:jobId', applicationController.getJobApplications);
router.put('/:id/status', applicationController.updateApplicationStatus);

module.exports = router; 
router.post('/', applicationController.applyToJob);
router.get('/', applicationController.getUserApplications);
router.get('/:id', applicationController.getApplicationById);
router.delete('/:id', applicationController.deleteApplication);

// Routes