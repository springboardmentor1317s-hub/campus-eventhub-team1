import Event from "../models/Event.js";

// @desc Create a new event (College Admin only)
export const createEvent = async (req, res) => {
  try {
    const { title, description, category, location, start_date, end_date } = req.body;

    if (req.user.role !== "college_admin" && req.user.role !== "super_admin") {
      return res.status(403).json({ message: "Access denied. Only admins can create events." });
    }

    const event = await Event.create({
      college_id: req.user.id,
      title,
      description,
      category,
      location,
      start_date,
      end_date
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all events (Students & Admins)
export const getEvents = async (req, res) => {
  try {
    const { category, college } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (college) filter.college_id = college;

    const events = await Event.find(filter).populate("college_id", "name college role");

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
