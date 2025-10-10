const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

<<<<<<< Updated upstream
// Get notifications for current user
router.get('/', protect, notificationController.getUserNotifications);

// Mark a notification as read
router.patch('/:id/read', protect, notificationController.markAsRead);
=======
router.get('/', protect, notificationController.getUserNotifications);
router.post('/:notificationId/read', protect, notificationController.markAsRead);
>>>>>>> Stashed changes

module.exports = router;
