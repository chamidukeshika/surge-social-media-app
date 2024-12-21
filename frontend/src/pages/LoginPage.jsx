import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import './LoginPage.css';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    const onSubmit = async (data) => {
        if (!recaptchaValue) {
            toast.error("Please complete the reCAPTCHA verification.");
            return;
        }

        setLoading(true);
        try {
            const { emailOrUsername, password } = data;
            const response = await axiosInstance.post("/auth/login", { emailOrUsername, password, recaptchaToken: recaptchaValue });

            toast.success("Login successful!");

            // Redirect to dashboard or home page after successful login
            setTimeout(() => {
                navigate("/dashboard");  // Redirect to the dashboard page (or any page you prefer)
            }, 2000); // Delay to allow the success toast to show
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Login failed! Please try again.");
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
        <div className="login-page">
            <form onSubmit={handleSubmit(onSubmit)} className="form-card" noValidate>
                <h2 className="form-header">Login</h2>

                {/* Username or Email Field */}
                <div className="form-group">
                    <label htmlFor="emailOrUsername" className="form-label">Email or Username</label>
                    <input
                        id="emailOrUsername"
                        type="text"
                        {...register("emailOrUsername", {
                            required: "Email or Username is required",
                        })}
                        className="form-input"
                        disabled={loading}
                    />
                    {errors.emailOrUsername && (
                        <p className="error-text">{errors.emailOrUsername.message}</p>
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
                        })}
                        className="form-input"
                        disabled={loading}
                    />
                    {errors.password && (
                        <p className="error-text">{errors.password.message}</p>
                    )}
                </div>

                {/* reCAPTCHA Widget */}
                <div className="recaptcha-container">
                    <ReCAPTCHA
                        sitekey="6Lfqo6EqAAAAAN6duo0Ax1-cGoqqSP8cmAOF5WqQ"
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
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Footer Links */}
                <div className="footer">
                    Don't have an account? <a href="/register" className="footer-link">Register</a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
