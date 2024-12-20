import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios";
import { useState } from "react";

const RegisterPage = () => {
    const [loading, setLoading] = useState(false); // Loading state
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true); // Start loading
        try {
            const response = await axiosInstance.post("/auth/register", data);
            alert("Registration successful!");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "Registration failed!");
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded shadow-md w-96"
                noValidate
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                {/* Username Field */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium">Username</label>
                    <input
                        id="username"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message: "Username must be at least 3 characters long",
                            },
                        })}
                        className="w-full px-3 py-2 border rounded"
                        disabled={loading}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                    )}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
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
                        className="w-full px-3 py-2 border rounded"
                        disabled={loading}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
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
                        className="w-full px-3 py-2 border rounded"
                        disabled={loading}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                {/* Footer Links */}
                <div className="mt-4 text-center">
                    <a href="/login" className="text-sm text-blue-500 hover:underline">
                        Already have an account? Login
                    </a>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
