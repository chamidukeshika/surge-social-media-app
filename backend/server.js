import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/database.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'; // Import CORS middleware

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// CORS setup to allow requests from the frontend (adjust as necessary for production)
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials (cookies, authentication headers, etc.)
};
app.use(cors(corsOptions)); // Use CORS middleware

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes for authentication
app.use('/api/auth', authRoutes);

// Function to start the server after connecting to the database
const startServer = async () => {
    try {
        // Try connecting to the database first
        await connectDB();
        console.log('Database connected successfully.');

        // Start the server only if the DB connection is successful
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}.`);
        });
    } catch (error) {
        // If something goes wrong during the DB connection, log a detailed message
        console.error('Error: Unable to connect to the database.');
        console.error(`Details: ${error.message}`);
        process.exit(1); // Exit the app after logging the error
    }
};

// Check if necessary environment variables are set
if (!process.env.PORT || !process.env.MONGO_URI) {
    console.error('Error: Missing required environment variables (PORT, MONGO_URI).');
    process.exit(1); // Exit the application if critical variables are missing
} else {
    // Start the server if everything is set up correctly
    startServer();
}
