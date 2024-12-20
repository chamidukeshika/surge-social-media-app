import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

// User Schema with validations
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters'], // Validates minimum length
        maxlength: [30, 'Username must be less than 30 characters'], // Validates maximum length
        trim: true, // Removes any leading/trailing spaces
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true, // Ensures email is stored in lowercase
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'], // Validates email format
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'], // Password length validation
    },
});

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash password if modified

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10); // Hash the password
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err); r
    }
});

// Model export
const User = mongoose.model('User', userSchema);
export default User;
