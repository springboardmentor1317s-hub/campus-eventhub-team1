const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDb = require('./db/db');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const activityLogRoutes = require('./routes/activityLogRoutes');
const userRoutes = require('./routes/userRoutes');
const systemHealthRoutes = require('./routes/systemHealthRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// Stripe webhook needs raw body
app.use('/api/registrations/stripe-webhook', express.raw({type: 'application/json'}), require('./controllers/registrationController').handleStripeWebhook);

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
app.use('/api/logs', activityLogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/system', systemHealthRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/tickets', ticketRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the CampusEventHub API');
});

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;

