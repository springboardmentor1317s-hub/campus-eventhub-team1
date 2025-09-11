import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = mongoose.connect(process.env.MONGO_URL,
    { dbName: "CampusEventHub" })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log(error));

export default connectDB;