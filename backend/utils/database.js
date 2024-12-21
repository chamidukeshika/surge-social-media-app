import mongoose from 'mongoose';

let isConnected = false; // Track connection status

// Database connection handler using Singleton pattern
const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return; // Skip the connection if already established
    }

    try {
        await mongoose.connect(process.env.MONGO_URI); // Deprecated options removed

        isConnected = true; // Set the connection status to true
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure code
    }
};

export default connectDB;
