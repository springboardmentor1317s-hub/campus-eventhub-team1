const mongoose = require('mongoose');

<<<<<<< Updated upstream
const NotificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, default: 'general' },
  related_event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  is_read: { type: Boolean, default: false }
=======
const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  message: {
    type: String,
    required: [true, 'Notification message is required']
  },
  link: {
    type: String,
    default: ''
  },
  read: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
>>>>>>> Stashed changes
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

<<<<<<< Updated upstream
module.exports = mongoose.model('Notification', NotificationSchema);
=======
notificationSchema.index({ user_id: 1, read: 1, created_at: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
>>>>>>> Stashed changes
