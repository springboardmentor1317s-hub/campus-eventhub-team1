const app = require('./app');
require('dotenv').config();

// ✅ Import routes
const registrationRoutes = require('./routes/registrationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');   // <-- Add this
const ratingRoutes = require('./routes/ratingRoutes');       // <-- Add this

// ✅ Mount routes
app.use('/api/registrations', registrationRoutes);
app.use('/api/feedback', feedbackRoutes);  // <-- Mount feedback API
app.use('/api/ratings', ratingRoutes);     // <-- Mount ratings API

const PORT = process.env.PORT || 4000; // ⚠️ Use 4000 for your backend API

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

