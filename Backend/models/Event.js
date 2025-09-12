import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    college_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["sports", "hackathon", "cultural", "workshop"], required: true },
    location: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
