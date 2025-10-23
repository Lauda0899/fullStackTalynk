const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./authRoutes');
const cvRoutes = require('./cvRoutes');
const jobRoutes = require('./jobRoutes');
const applicationRoutes = require('./applicationRoutes');
const interviewRoutes = require('./interviewRoutes');

// Use routes
router.use('/auth', authRoutes);
router.use('/cvs', cvRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/interviews', interviewRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API en ligne' });
});

module.exports = router;