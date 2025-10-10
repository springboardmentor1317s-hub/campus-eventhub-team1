const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['registration_update', 'system'],
    default: 'registration_update'
  },
  message: {
    type: String,
    required: true
  },
  reference: {
    // Optional reference to related document (e.g., registration or event)
    refModel: String,
    refId: mongoose.Schema.Types.ObjectId
  },
  read: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
