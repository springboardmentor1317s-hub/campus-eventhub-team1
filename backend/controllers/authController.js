import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ....Register User....
export const registerUser = async (req, res) => {
    try {
        const { name, email, college, password, confirmPassword, role } = req.body;

        // Validate all required fields
        if (!name || !email || !college || !password || !confirmPassword || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Password match check
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" })
        }

        // Ensure only one super admin
        if (role === "super_admin") {
            const superAdminExists = await User.findOne({ role: "super_admin" });
            if (superAdminExists) {
                return res.status(400).json({ message: "Super Admin already exists" });
            }
        }

        // Ensure only one college admin per college
        if (role === "college_admin") {
            const collegeAdminExists = await User.findOne({ role: "college_admin", college });
            if (collegeAdminExists) {
                return res.status(400).json({ message: `College Admin already exists for ${college}` });
            }
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = await User.create({
            name,
            email,
            college,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ message: "User registered successfully", user })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// ....Login....
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check email and password
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};