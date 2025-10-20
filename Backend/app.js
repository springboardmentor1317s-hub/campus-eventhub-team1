const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDb = require('./db/db');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); // ✅ feedback route

const app = express();

// ✅ Allow frontend (Vite on port 5173)
app.use(
  cors({
    origin: 'http://localhost:5173', // frontend URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect to Database
const startDb = async () => {
  await connectToDb();
};
startDb();

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/feedback', feedbackRoutes); // feedback endpoints

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Welcome to the CampusEventHub API');
});

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;

