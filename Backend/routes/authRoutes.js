const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', protect, authController.getProfile);

// Admin-only route example
router.get('/admin/users', protect, restrictTo('college_admin', 'super_admin'), (req, res) => {
  res.status(200).json({ message: 'Admin access granted' });
});

module.exports = router;