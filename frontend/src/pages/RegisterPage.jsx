import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import './RegisterPage.css';

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const navigate = useNavigate();  // Initialize navigate

    const onSubmit = async (data) => {
        if (!recaptchaValue) {
            toast.error("Please complete the reCAPTCHA verification.");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post("/auth/register", { ...data, recaptchaToken: recaptchaValue });
            toast.success("Registration successful!");

            // Redirect to login page after success
            setTimeout(() => {
                navigate("/");  // Redirect to the login page ('/')
            }, 2000);  // Delay to allow the success toast to show

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Registration failed! Please try again.");
            } else {
                toast.error("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRecaptcha = (value) => {
        setRecaptchaValue(value);
    };

    return (
        <div className="register-page">
            <form onSubmit={handleSubmit(onSubmit)} className="form-card" noValidate>
                <h2 className="form-header">Register</h2>

                {/* Username Field */}
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        id="username"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message: "Username must be at least 3 characters long",
                            },
                        })}
                        className="form-input"
                        disabled={loading}
                    />
                    {errors.username && (
                        <p className="error-text">{errors.username.message}</p>
                    )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address",
                            },
                        })}
                        className="form-input"
                        disabled={loading}
                    />
                    {errors.email && (
                        <p className="error-text">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long",
                            },
                        })}
                        className="form-input"
                        disabled={loading}
                    />
                    {errors.password && (
                        <p className="error-text">{errors.password.message}</p>
                    )}
                </div>

                {/* reCAPTCHA Widget */}
                <div className="form-group">
                    <ReCAPTCHA
                        sitekey="6Lfqo6EqAAAAAN6duo0Ax1-cGoqqSP8cmAOF5WqQ" // Replace with your site key
                        onChange={handleRecaptcha}
                    />
                    {errors.recaptcha && (
                        <p className="error-text">{errors.recaptcha.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`submit-btn ${loading ? "loading" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                {/* Footer Links */}
                <div className="footer">
                    Already have an account? <a href="/" className="footer-link"> Login</a>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
