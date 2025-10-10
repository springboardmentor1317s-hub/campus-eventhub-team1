const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, notificationController.getUserNotifications);
router.post('/:notificationId/read', protect, notificationController.markAsRead);

module.exports = router;
