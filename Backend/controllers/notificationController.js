const Notification = require('../models/Notification');

// Get notifications for current user
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ user_id: userId })
      .sort({ created_at: -1 })
      .limit(50);

    res.status(200).json({ success: true, data: { notifications } });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to get notifications' });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    if (notification.user_id.toString() !== userId) return res.status(403).json({ error: 'Not authorized' });

    notification.read = true;
    await notification.save();

    res.status(200).json({ success: true, message: 'Marked as read', data: { notification } });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};
