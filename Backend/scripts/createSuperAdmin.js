const mongoose = require('mongoose');
const User = require('../models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectToDb = async () => {
  try {
    // Use DB_CONNECT (same as db.js) or fallback to MONGO_URI
    const mongoUri = process.env.DB_CONNECT || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campus-eventhub';
    console.log('Connecting to MongoDB...');
    console.log('Using connection string:', mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure MongoDB is running: net start MongoDB (Windows)');
    console.error('2. Check your DB_CONNECT in .env file');
    console.error('3. Try using 127.0.0.1 instead of localhost');
    console.error('4. Verify MongoDB is listening on port 27017');
    process.exit(1);
  }
};

const createSuperAdmin = async () => {
  try {
    await connectToDb();

    // Super Admin credentials
    const superAdminData = {
      name: 'Super Admin',
      email: 'superadmin@campuseventhub.com',
      password: 'SuperAdmin@2025',
      college: 'System Administrator',
      role: 'super_admin',
      approval_status: 'approved',
      isActive: true
    };

    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ email: superAdminData.email });
    
    if (existingSuperAdmin) {
      console.log('Super Admin already exists!');
      console.log('Email:', superAdminData.email);
      console.log('Password: (unchanged)');
    } else {
      // Create super admin
      const superAdmin = await User.create(superAdminData);
      console.log('✅ Super Admin created successfully!');
      console.log('📧 Email:', superAdminData.email);
      console.log('🔑 Password:', superAdminData.password);
      console.log('\n⚠️  IMPORTANT: Please change the password after first login!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating super admin:', error);
    process.exit(1);
  }
};

createSuperAdmin();

