const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    category: { type: String, default: 'General' },
    status: {
      type: String,
      enum: ['unread', 'pending', 'resolved'],
      default: 'unread',
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
