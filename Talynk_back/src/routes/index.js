const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./authRoutes');
const cvRoutes = require('./cvRoutes');
const jobRoutes = require('./jobRoutes');
const applicationRoutes = require('./applicationRoutes');
const interviewRoutes = require('./interviewRoutes');
const aiWriterRoutes = require('./aiWriterRoutes');

// Use routes
router.use('/auth', authRoutes);
router.use('/cvs', cvRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/interviews', interviewRoutes);
router.use('writer',aiWriterRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API en ligne' });
});

module.exports = router;