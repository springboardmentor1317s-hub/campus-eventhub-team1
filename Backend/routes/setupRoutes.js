const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Setup route - Create Super Admin (ONE TIME USE - Remove in production)
router.post('/create-super-admin', async (req, res) => {
  try {
    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ role: 'super_admin' });
    
    if (existingSuperAdmin) {
      return res.status(400).json({ 
        success: false,
        error: 'Super Admin already exists!',
        message: 'A super admin account has already been created.'
      });
    }

    // Create super admin
    const superAdmin = await User.create({
      name: 'Super Admin',
      email: 'superadmin@campuseventhub.com',
      password: 'SuperAdmin@2025', // Will be hashed automatically by User model
      college: 'System Administrator',
      role: 'super_admin',
      approval_status: 'approved',
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Super Admin created successfully!',
      data: {
        email: 'superadmin@campuseventhub.com',
        password: 'SuperAdmin@2025',
        note: 'Please change the password after first login!'
      }
    });

  } catch (error) {
    console.error('Create super admin error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create super admin',
      details: error.message 
    });
  }
});

module.exports = router;

