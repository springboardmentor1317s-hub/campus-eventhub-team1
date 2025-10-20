import Rating from "../models/Rating.js";

export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createRating = async (req, res) => {
  try {
    const newRating = await Rating.create(req.body);
    res.status(201).json(newRating);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRating = async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);
    res.json({ message: "Rating deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRatingStats = async (req, res) => {
  try {
    const total = await Rating.countDocuments();
    const ratings = await Rating.find();
    const avg =
      ratings.length > 0
        ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)
        : 0;
    res.json({ total, avg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
