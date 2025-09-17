import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Role-based dashboards
userRouter.get(
    "/student/dashboard",
    protect,
    authorize("student"),
    (req, res) => {
        res.json({ message: "Welcome to Student Dashboard", user: req.user });
    }
);

userRouter.get(
    "/collegeadmin/dashboard",
    protect,
    authorize("college_admin"),
    (req, res) => {
        res.json({ message: "Welcome to College Admin Dashboard", user: req.user });
    }
);

userRouter.get(
    "/superadmin/dashboard",
    protect,
    authorize("super_admin"),
    (req, res) => {
        res.json({ message: "Welcome to Super Admin Dashboard", user: req.user });
    }
);

export default userRouter;
