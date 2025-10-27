const express = require('express');
const router = express.Router();
const { getAnalytics, getDetailedAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

// Get basic analytics data
router.get('/', protect, getAnalytics);

// Get detailed analytics data
router.get('/detailed', protect, getDetailedAnalytics);

module.exports = router;
