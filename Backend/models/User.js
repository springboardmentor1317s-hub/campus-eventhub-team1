import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    college: { type: String, required: true },
    role: { type: String, enum: ["student", "college_admin", "super_admin"], default: "student" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
