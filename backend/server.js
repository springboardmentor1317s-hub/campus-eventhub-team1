import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

connectDB.then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`))
})

app.get('/', (req, res) => {
    console.log('This is home route');
    res.send('This is the response')
})