import User from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken.' });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        // Send response
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        console.log("Received login request with emailOrUsername:", emailOrUsername);

        // Check if the input is an email or username and search accordingly
        let user;
        if (emailOrUsername.includes('@')) {
            console.log("Searching by email:", emailOrUsername);
            user = await User.findOne({ email: emailOrUsername });
        } else {
            console.log("Searching by username:", emailOrUsername);
            user = await User.findOne({ username: emailOrUsername });
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid email/username or password" });
        }

        console.log("User found:", user.username);

        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email/username or password" });
        }

        console.log("Password matched for user:", user.username);

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // You can adjust this as per your needs
        });

        return res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

