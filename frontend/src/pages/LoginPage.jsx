import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axiosInstance from "../api/axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const recaptchaRef = useRef(null);

    const onSubmit = async (data) => {
        const recaptchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();

        try {
            const response = await axiosInstance.post("/auth/login", {
                ...data,
                recaptchaToken, // Send token to the backend
            });
            login(response.data.user, response.data.token);
            alert("Login successful!");
        } catch (error) {
            alert(error.response.data.message || "Login failed!");
        }
    };

    return (

        <div className="flex justify-center items-center h-screen bg-gray-100">

            <script src="https://www.google.com/recaptcha/api.js?render=6Lfqo6EqAAAAAN6duo0Ax1-cGoqqSP8cmAOF5WqQ
"></script>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label>Email</label>
                    <input
                        {...register("email", { required: "Email is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.password && (
                        <p className="text-red-500">{errors.password.message}</p>
                    )}
                </div>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey='6Lfqo6EqAAAAAN6duo0Ax1-cGoqqSP8cmAOF5WqQ'
                    size="invisible"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
