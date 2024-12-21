import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser } from '../controllers/authController.js';
import validateRecaptcha from '../middlewares/validateRecaptcha.js';

const router = express.Router();

// Registration route with validation for username, email, and password
router.post(
    '/register',
    [
        body('username')
            .notEmpty()
            .withMessage('Username is required')
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters')
            .isLength({ max: 30 })
            .withMessage('Username must be at most 30 characters'),
        body('email')
            .isEmail()
            .withMessage('Invalid email address')
            .normalizeEmail(), // Normalize email (e.g., lowercasing)
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),
    ],
    validateRecaptcha, // reCAPTCHA validation
    registerUser // Register user in the database
);

// Login route with validation for email or username and password
router.post(
    '/login',
    [
        body('emailOrUsername')
            .notEmpty()
            .withMessage('Email or Username is required'),
        body('password')
            .notEmpty()
            .withMessage('Password is required'),
    ],
    validateRecaptcha, // reCAPTCHA validation
    loginUser // Login user after validating credentials
);

export default router;
