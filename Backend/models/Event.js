const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxLength: [150, 'Title cannot be more than 150 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true
  },
  categories: {
    type: [String], // Multiple categories allowed
    enum: {
      values: ['sports', 'hackathon', 'cultural', 'seminar', 'workshop', 'other'],
      message: '{VALUE} is not a valid category'
    },
    default: ['other']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  start_date: {
    type: Date,
    required: [true, 'Start date is required']
  },
  end_date: {
  type: Date,
  required: [true, 'End date is required'],
    validate: {
        validator: function(value) {
        return !this.start_date || value > this.start_date;
        },
        message: 'End date must be after start date'
            }
    },
  registration_limit: {
    type: Number,
    default: 0 // 0 = unlimited
  },
  registered: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0 // 0 = free event
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    trim: true
  },
});

module.exports = mongoose.model('Event', eventSchema);