const app = require('./app');
require('dotenv').config();


const registrationRoutes = require('./routes/registrationRoutes');
app.use('/api/registrations', registrationRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});