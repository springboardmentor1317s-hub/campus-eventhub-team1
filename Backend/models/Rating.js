const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    event: { type: String, required: true },
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    attendees: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rating', ratingSchema);
