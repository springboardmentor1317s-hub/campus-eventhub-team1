const Feedback = require("../models/feedback");

// ✅ Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedback);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ message: "Server error while fetching feedback" });
  }
};

// ✅ Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const { user, email, message, category } = req.body;
    if (!user || !email || !message)
      return res.status(400).json({ message: "User, email and message are required" });

    const newFeedback = new Feedback({ user, email, message, category });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
  } catch (err) {
    console.error("Error creating feedback:", err);
    res.status(500).json({ message: "Server error while creating feedback" });
  }
};

// ✅ Update feedback status
exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["unread", "pending", "resolved"].includes(status))
      return res.status(400).json({ message: "Invalid status value" });

    const updated = await Feedback.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error while updating status" });
  }
};

// ✅ Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    console.error("Error deleting feedback:", err);
    res.status(500).json({ message: "Server error while deleting feedback" });
  }
};

// ✅ Bulk delete
exports.bulkDeleteFeedback = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({ message: "Array of feedback IDs required" });

    const result = await Feedback.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Bulk delete successful", deletedCount: result.deletedCount });
  } catch (err) {
    console.error("Error bulk deleting feedback:", err);
    res.status(500).json({ message: "Server error while bulk deleting feedback" });
  }
};

// ✅ Stats
exports.getFeedbackStats = async (req, res) => {
  try {
    const total = await Feedback.countDocuments();
    const unread = await Feedback.countDocuments({ status: "unread" });
    const pending = await Feedback.countDocuments({ status: "pending" });
    const resolved = await Feedback.countDocuments({ status: "resolved" });
    res.status(200).json({ total, unread, pending, resolved });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
};
