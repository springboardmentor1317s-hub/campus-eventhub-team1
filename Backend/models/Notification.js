const mongoose = require('mongoose');

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
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

notificationSchema.index({ user_id: 1, read: 1, created_at: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
