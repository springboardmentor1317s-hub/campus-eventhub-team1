const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Update user profile Settings page
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password, college, role } = req.body;

    // If the request contains forbidden fields
    if (password || college || role) {
      return res.status(400).json({
        success: false,
        message: "You cannot update password, college, or role here."
      });
    }

    // Only allow updating name & email
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password -resetToken -resetTokenExpiry -passwordChangedAt");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Server error. Could not update profile." });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, college, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      college,
      role
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    // Log more detailed error information
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        console.error(`${key}:`, error.errors[key].message);
      });
    }
    res.status(500).json({ error: error.message || 'Server error. Please try again later.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists - explicitly select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      college: user.college,
      role: user.role
    };

    res.status(200).json({
      success: true,
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password -resetToken -resetTokenExpiry -passwordChangedAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        users,
        total: users.length
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get user by ID (Admin only) - without password
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select('-password -resetToken -resetTokenExpiry -passwordChangedAt');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token & expiry in DB
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    // Create reset link
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    // Configure mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click below to reset your password (valid for 15 minutes):</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
      `,
    });

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.password = newPassword;

    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    const jwtToken = generateToken(user._id);

    res.status(200).json({
      message: "Password reset successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Server error" });

  }
};