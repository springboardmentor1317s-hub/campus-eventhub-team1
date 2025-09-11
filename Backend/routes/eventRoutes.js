import express from "express";
import { createEvent, getEvents } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEvent); // only logged-in users, admins can create
router.get("/", getEvents); // anyone can view events

export default router;
