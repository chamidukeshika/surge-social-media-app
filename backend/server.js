import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/database.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);

// Function to start the server after connecting to the database
const startServer = async () => {
    try {
        await connectDB();
        console.log('Database connected successfully.');

        // Start the server only if the DB connection is successful
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}.`);
        });
    } catch (error) {
        console.error('Error: Unable to connect to the database.');
        console.error(`Details: ${error.message}`);
        process.exit(1);
    }
};

// Check if necessary environment variables are set
if (!process.env.PORT || !process.env.MONGO_URI) {
    console.error('Error: Missing required environment variables (PORT, MONGO_URI).');
    process.exit(1);
} else {
    startServer();
}
