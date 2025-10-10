const Notification = require('../models/Notification');

<<<<<<< Updated upstream
// Get current user's notifications
=======
// Get notifications for current user
>>>>>>> Stashed changes
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ user_id: userId })
<<<<<<< Updated upstream
      .sort({ created_at: -1 });
=======
      .sort({ created_at: -1 })
      .limit(50);
>>>>>>> Stashed changes

    res.status(200).json({ success: true, data: { notifications } });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to get notifications' });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    if (notification.user_id.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

    notification.is_read = true;
    await notification.save();

    res.status(200).json({ success: true, message: 'Notification marked as read', data: { notification } });
=======
    const userId = req.user.id;
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    if (notification.user_id.toString() !== userId) return res.status(403).json({ error: 'Not authorized' });

    notification.read = true;
    await notification.save();

    res.status(200).json({ success: true, message: 'Marked as read', data: { notification } });
>>>>>>> Stashed changes
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};
