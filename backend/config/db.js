import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,
            { dbName: "CampusEventHub", }
        );
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed");
        process.exit(1);
    }
};

export default connectDB;