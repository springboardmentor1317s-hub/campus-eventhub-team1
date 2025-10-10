const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Get user's notifications (default unread only)
router.get('/', authMiddleware.protect, notificationController.getUserNotifications);

// Mark a single notification as read
router.put('/:notificationId/read', authMiddleware.protect, notificationController.markAsRead);

// Mark all as read
router.put('/read/all', authMiddleware.protect, notificationController.markAllAsRead);

module.exports = router;
