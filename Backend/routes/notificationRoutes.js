const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

// Get notifications for current user
router.get('/', protect, notificationController.getUserNotifications);

// Mark a notification as read
router.patch('/:id/read', protect, notificationController.markAsRead);

module.exports = router;
