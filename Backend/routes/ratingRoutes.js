import express from "express";
import {
  getRatings,
  createRating,
  deleteRating,
  getRatingStats,
} from "../controllers/ratingController.js";

const router = express.Router();

router.get("/", getRatings);
router.post("/", createRating);
router.delete("/:id", deleteRating);
router.get("/stats", getRatingStats);

export default router;
