const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

// Routes publiques (avec auth optionnelle)
router.get('/', optionalAuth, jobController.getAllJobs);
router.get('/:id', optionalAuth, jobController.getJobById);

// Routes protégées (nécessitent authentification - pour admin/RH)
router.post('/', authMiddleware, jobController.createJob);
router.put('/:id', authMiddleware, jobController.updateJob);
router.delete('/:id', authMiddleware, jobController.deleteJob);

module.exports = router;