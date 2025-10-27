const express = require('express');
const {
  getRatings,
  createRating,
  deleteRating,
  getRatingStats,
} = require("../controllers/ratingController.js");

const router = express.Router();

router.get("/", getRatings);
router.post("/", createRating);
router.delete("/:id", deleteRating);
router.get("/stats", getRatingStats);

module.exports = router;
