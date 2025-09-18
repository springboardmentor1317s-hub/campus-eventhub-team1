const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { forgotPassword } = require("../controllers/authController.js");
const { resetPassword } = require("../controllers/authController.js");

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', protect, authController.getProfile);

// Admin-only route example
router.get('/admin/users', protect, restrictTo('college_admin', 'super_admin'), (req, res) => {
  res.status(200).json({ message: 'Admin access granted' });
});

// Forgot Password Route
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password", resetPassword);

module.exports = router;