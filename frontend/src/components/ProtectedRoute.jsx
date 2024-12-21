import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext for authentication state

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth(); // Get the token from AuthContext

    // Render children if the user is authenticated, otherwise redirect to login
    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
