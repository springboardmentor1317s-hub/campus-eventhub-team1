import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/authRoutes.js';

const app = express();

dotenv.config();

// Middleware to parse JSON
app.use(express.json())

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});

// Test route
app.get('/', (req, res) => {
    console.log('This is home route');
    res.send('This is the response')
})

app.use("/user", userRouter);