const User = require('../models/User');
const Event = require('../models/Event');


exports.createEvent = async (req, res) => {
  try {
    const { title, description, categories, location, start_date, end_date, price, registration_limit } = req.body;

    let parsedCategories = ['other'];
    if (categories) {
      try {
        parsedCategories = JSON.parse(categories);
        if (!Array.isArray(parsedCategories) || parsedCategories.length === 0) parsedCategories = ['other'];
      } catch (err) {
        parsedCategories = ['other'];
      }
    }

    // Combine college name and location
    const fullLocation = `${req.user.college}, ${location}`;

    const newEvent = new Event({
      title,
      description,
      categories: parsedCategories,
      location: fullLocation, // save combined location
      start_date,
      end_date,
      price: price || 0,
      registration_limit: registration_limit || 0,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
    console.log("Event Created:", newEvent);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
