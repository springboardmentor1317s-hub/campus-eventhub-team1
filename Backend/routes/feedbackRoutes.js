const express = require("express");
const {
  getAllFeedback,
  createFeedback,
  updateFeedbackStatus,
  deleteFeedback,
  bulkDeleteFeedback,
  getFeedbackStats,
} = require("../controllers/feedbackController");

const router = express.Router();

router.get("/", getAllFeedback);
router.post("/", createFeedback);
router.patch("/:id/status", updateFeedbackStatus);
router.delete("/:id", deleteFeedback);
router.post("/bulk-delete", bulkDeleteFeedback);
router.get("/stats", getFeedbackStats);

module.exports = router;
